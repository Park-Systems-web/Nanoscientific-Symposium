const path = require("path");
const { getCurrentPool } = require("../utils/getCurrentPool");

const adminCtrl = {
  addSession: async (req, res) => {
    const { nation, title, title_en, date, year, language } = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    const langSfx = language === "china" ? "" : "_en";

    try {
      let sql;
      if (nation === "china") {
        sql = `INSERT INTO program_sessions(session_title, session_title_en,date,year) VALUES('${title}','${title_en}','${date.substr(
          0,
          10
        )}',${year && year !== "2022" ? `'${year}'` : null})`;
      } else
        sql = `INSERT INTO program_sessions(session_title,date,year) VALUES('${title}','${date.substr(
          0,
          10
        )}', ${year && year !== "2022" ? `'${year}'` : null})`;

      const result = await connection.query(sql);
      res.status(200).json({
        success: true,
        message: "Success",
      });
      connection.release();
    } catch (err) {
      console.log(err);
    }
  },
  modifySession: async (req, res) => {
    const { nation, title, title_en, date, id, status, language } = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    const langSfx = language === "china" ? "" : "_en";

    try {
      let sql;
      if (nation === "china") {
        sql = `UPDATE program_sessions SET session_title='${title}',session_title_en='${title_en}',date='${date.substr(
          0,
          10
        )}', status=${status} WHERE id=${id}`;
      } else
        sql = `UPDATE program_sessions SET session_title='${title}',date='${date.substr(
          0,
          10
        )}', status=${status} WHERE id=${id}`;

      const result = await connection.query(sql);
      res.status(200).json({
        success: true,
        message: "Success",
      });
      connection.release();
    } catch (err) {
      console.log(err);
    }
  },

  deleteSession: async (req, res) => {
    const nation = req.query.nation;
    const id = req.params.id;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      // delete programs
      sql = `DELETE FROM programs WHERE session=${id}`;
      const programResult = await connection.query(sql);

      // delete session
      sql = `DELETE FROM program_sessions WHERE id=${id}`;
      await connection.query(sql);

      res.status(200).json({
        success: true,
        message: `1개의 세션 삭제, ${programResult[0].affectedRows}개의 프로그램 삭제`,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: err,
      });
    } finally {
      connection.release();
    }
  },

  addProgram: async (req, res) => {
    const {
      nation,
      language,
      session,
      title,
      title_en,
      speakers,
      speakers_en,
      description,
      description_en,
      startTime,
      endTime,
      emphasize,
      year,
    } = req.body;

    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      let sql;
      if (nation === "china") {
        sql = `INSERT INTO programs(
          session,
          start_time,
          end_time,
          title,
          title_en,
          speakers,
          speakers_en,
          description,
          description_en,
          emphasize,
          year
          ) VALUES(
            ${session},
            '${startTime}',
            '${endTime}',
            '${title}',
            '${title_en}',
            '${speakers}',
            '${speakers_en}',
            '${description}',
            '${description_en}',
            ${emphasize},
            ${year && year !== "2022" ? `'${year}'` : null}
          )`;
      } else
        sql =
          sql = `INSERT INTO programs(session,start_time,end_time,title,speakers,description, emphasize,year) VALUES(${session},'${startTime}','${endTime}','${title}','${speakers}','${description}', ${emphasize},
      ${year && year !== "2022" ? `'${year}'` : null})`;

      const sqlResult = await connection.query(sql);
      // console.log(sqlResult[0]);

      try {
        const adjustSql = `UPDATE programs SET next_id=${
          sqlResult[0].insertId
        } WHERE id!=${
          sqlResult[0].insertId
        } AND session=${session} AND next_id IS NULL AND${
          year && year !== "2022" ? ` year="${year}"` : ` year IS NULL`
        };`;
        const adjustSqlResult = await connection.query(adjustSql);
        // console.log(adjustSqlResult);
        res.status(200).json({
          success: true,
          message: "Success",
        });
      } catch (err) {
        res.status(200).json({
          success: false,
          message: "Failed",
          err,
        });
        console.log(err);
      }
      connection.release();
    } catch (err) {
      res.status(200).json({
        success: false,
        message: "Failed",
        err,
      });
      console.log(err);
    }
  },
  modifyProgram: async (req, res) => {
    const {
      id,
      nation,
      title,
      title_en,
      session,
      speakers,
      speakers_en,
      description,
      description_en,
      startTime,
      endTime,
      emphasize,
    } = req.body;

    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      let sql;
      if (nation === "china") {
        sql = `UPDATE programs SET 
      session=${session}, 
      title='${title}',
      title_en='${title_en}',
      speakers='${speakers}',
      speakers_en='${speakers_en}',
      description="${description}",
      description_en="${description_en}",
      start_time='${startTime}',
      end_time='${endTime}',
      emphasize=${emphasize} WHERE id=${id}`;
      } else
        sql = `UPDATE programs SET 
      session=${session}, 
      title='${title}',
      speakers='${speakers}',
      description="${description}",
      start_time='${startTime}',
      end_time='${endTime}',
      emphasize=${emphasize} WHERE id=${id}`;

      await connection.query(sql);
      res.status(200).json({
        success: true,
        message: "Success",
      });
      connection.release();
    } catch (err) {
      console.log(err);
    }
  },

  deleteProgram: async (req, res) => {
    const nation = req.query.nation;
    const id = req.params.id;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      let sql = `SELECT * FROM programs WHERE id=${id}`;

      const selectResult = await connection.query(sql);
      const nextId = selectResult[0][0].next_id;

      sql = `DELETE FROM programs WHERE id=${id}`;
      await connection.query(sql);
      // 딸려있는 agenda 삭제
      sql = `DELETE FROM program_agenda WHERE program_id=${id}`;
      await connection.query(sql);

      sql = `UPDATE programs SET next_id=${nextId} WHERE next_id=${id}`;
      await connection.query(sql);

      res.status(200).json({
        success: true,
        message: `id:${id} 프로그램 삭제`,
      });
    } catch (err) {
      res.status(200).json({
        success: false,
        message: err,
      });
    } finally {
      connection.release();
    }
  },

  // agenda
  addAgenda: async (req, res) => {
    const { nation, program_id, title, speakers, session_id, year } = req.body;

    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      const sql = `INSERT INTO program_agenda(session_id,program_id,title,speakers, year) 
      VALUES(${session_id},${program_id},'${title}','${speakers}', ${
        year && year !== "2022" ? `'${year}'` : null
      })`;

      const sqlResult = await connection.query(sql);

      try {
        const adjustSql = `UPDATE program_agenda SET 
        next_id=${sqlResult[0].insertId} 
        WHERE 
        id!=${sqlResult[0].insertId} 
        AND program_id=${program_id}
        AND ${year && year !== "2022" ? ` year="${year}"` : ` year IS NULL`}
        AND next_id=99999`;
        const adjustSqlResult = await connection.query(adjustSql);
        res.status(200).json({
          success: true,
          message: "Success",
        });
      } catch (err) {
        res.status(200).json({
          success: false,
          message: "Failed",
          err,
        });
        console.log(err);
      }
      connection.release();
    } catch (err) {
      res.status(200).json({
        success: false,
        message: "Failed",
        err,
      });
      console.log(err);
    }
  },
  modifyAgenda: async (req, res) => {
    const { nation, title, id, program_id, speakers, session_id, year } =
      req.body;

    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `UPDATE program_agenda SET session_id=${session_id},program_id=${program_id}, title='${title}',speakers='${speakers}' WHERE id=${id} `;

      await connection.query(sql);
      res.status(200).json({
        success: true,
        message: "Success",
      });
      connection.release();
    } catch (err) {
      res.status(200).json({
        success: false,
        message: "Failed",
        err,
      });
      console.log(err);
    }
  },

  deleteAgenda: async (req, res) => {
    const { nation } = req.query;
    const id = req.params.id;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      let sql = `SELECT * FROM program_agenda WHERE id=${id}`;

      const selectResult = await connection.query(sql);
      const nextId = selectResult[0][0].next_id;

      sql = `DELETE FROM program_agenda WHERE id=${id}`;
      await connection.query(sql);

      sql = `UPDATE program_agenda SET next_id=${nextId} WHERE next_id=${id}`;
      await connection.query(sql);

      res.status(200).json({
        success: true,
        message: `id:${id} 프로그램 삭제`,
      });
    } catch (err) {
      res.status(200).json({
        success: false,
        message: err,
      });
    } finally {
      connection.release();
    }
  },

  reorderAgenda: async (req, res) => {
    const { agendaList, nation } = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      for (const agenda of agendaList) {
        const sql = `UPDATE program_agenda SET next_id=${agenda.next_id} WHERE id=${agenda.id}`;
        await connection.query(sql);
      }
      res.status(200).json({
        success: true,
        agendaList,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        err,
      });
    } finally {
      connection.release();
    }
  },

  getHideProgram: async (req, res) => {
    const { nation, year } = req.query;

    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      const sql = `SELECT * FROM programs WHERE status=0 and${
        year && year !== "2022" ? ` year="${year}"` : ` year IS NULL`
      };`;
      const result = await connection.query(sql);
      res.send(result[0]);
      connection.release();
    } catch (err) {
      console.log(err);
    }
  },

  getHideSession: async (req, res) => {
    const { nation, year } = req.query;

    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      const sql = `SELECT * FROM program_sessions WHERE status=0 and${
        year && year !== "2022" ? ` year="${year}"` : ` year IS NULL`
      };`;
      const result = await connection.query(sql);
      res.send(result[0]);
      connection.release();
    } catch (err) {
      console.log(err);
    }
  },

  showProgram: async (req, res) => {
    const { nation, programs } = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      programs.map(async (program) => {
        const sql = `UPDATE programs SET status=1 WHERE id=${program.id}`;
        await connection.query(sql);
      });
      res.status(200).json({
        success: true,
        message: "Success",
      });
      connection.release();
    } catch (err) {
      console.log(err);
    }
  },

  showSession: async (req, res) => {
    const { nation, sessions } = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      sessions.map(async (session) => {
        const sql = `UPDATE program_sessions SET status=1 WHERE id=${session.id}`;
        await connection.query(sql);
      });
      res.status(200).json({
        success: true,
        message: "Success",
      });
      connection.release();
    } catch (err) {
      console.log(err);
    }
  },

  addSpeaker: async (req, res) => {
    const {
      nation,
      name,
      name_en,
      belong,
      belong_en,
      imagePath,
      keynote,
      description,
      description_en,
      abstractBelong,
      abstractBelong_en,
      abstractDesc,
      abstractDesc_en,
      hasAbstract,
      is_hide,
      year,
    } = req.body;

    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      let sql;
      if (nation === "china") {
        sql = `INSERT INTO speakers
        (
          name,
          name_en,
          belong,
          belong_en,
          image_path,
          status,
          keynote,
          description,
          description_en,
          has_abstract,
      is_hide,
      year
        )
        VALUES(
          '${name}',
          '${name_en}',
          '${belong}',
          '${belong_en}',
          '${imagePath}',
          1,
           ${keynote},
          '${description}',
          '${description_en}',
           ${hasAbstract},
           ${is_hide},
           ${year && year !== "2022" ? `'${year}'` : null}
        )`;
      } else
        sql = `INSERT INTO speakers
      (name,belong,image_path,status,keynote,description,has_abstract,year)
      VALUES('${name}','${belong}','${imagePath}',1, ${keynote},'${description}', ${hasAbstract}, ${
          year && year !== "2022" ? `'${year}'` : null
        })`;
      const data = await connection.query(sql);
      connection.release();
      let sql2;
      if (nation === "china") {
        sql2 = `INSERT INTO speaker_abstract(
          speaker_id,
          belong,
          belong_en,
          description,
          description_en,
          year
        )
        VALUES(
          ${data[0].insertId},
          '${abstractBelong}',
          '${abstractBelong_en}',
          '${abstractDesc}',
          '${abstractDesc_en}',
          ${year && year !== "2022" ? `'${year}'` : null}
        )`;
      } else
        sql2 = `INSERT INTO speaker_abstract(speaker_id,belong,description,year)
          VALUES(${data[0].insertId},'${abstractBelong}','${abstractDesc}',${
          year && year !== "2022" ? `'${year}'` : null
        })`;
      await connection.query(sql2);
      connection.release();

      res.status(200).json({
        success: true,
        message: "Success",
      });
    } catch (err) {
      console.log(err);
    }
  },
  modifySpeaker: async (req, res) => {
    const {
      nation,
      name,
      name_en,
      belong,
      belong_en,
      imagePath,
      id,
      keynote,
      description,
      description_en,
      abstractBelong,
      abstractBelong_en,
      abstractDesc,
      abstractDesc_en,
      hasAbstract,
      is_hide,
      year,
    } = req.body;

    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      if (nation === "china") {
        sql = `UPDATE speakers SET 
      name='${name}',
      name_en='${name_en}',
      belong='${belong}',
      belong_en='${belong_en}',
      image_path='${imagePath}',
      keynote=${keynote},
      description='${description}', 
      description_en='${description_en}', 
      has_abstract=${hasAbstract},
      is_hide=${is_hide},
      year=${year && year !== "2022" ? `'${year}'` : null}
      WHERE id=${id}
      `;
      } else {
        sql = `UPDATE speakers SET 
      name='${name}',
      belong='${belong}',
      image_path='${imagePath}',
      keynote=${keynote},
      description='${description}', 
      has_abstract=${hasAbstract},
      is_hide=${is_hide},
      year=${year && year !== "2022" ? `'${year}'` : null}
      WHERE id=${id}
      `;
      }

      const data = await connection.query(sql);
      connection.release();
      let sql2;
      if (nation === "china") {
        sql2 = `INSERT INTO speaker_abstract (
          speaker_id,
          belong,
          belong_en,
          description,
          description_en,
          year
          ) VALUES (
            ${id},
            '${abstractBelong}',
            '${abstractBelong_en}',
            '${abstractDesc}',
            '${abstractDesc_en}',
            ${year && year !== "2022" ? `'${year}'` : null}
          )
          ON DUPLICATE KEY UPDATE
            belong='${abstractBelong}',
            belong_en='${abstractBelong_en}',
            description='${abstractDesc}',
            description_en='${abstractDesc_en}',
            year=${year && year !== "2022" ? `'${year}'` : null}
          `;
      } else {
        sql2 = `INSERT INTO speaker_abstract (
        speaker_id,
        belong,
        description,
        year
        ) VALUES (
          ${id},
          '${abstractBelong}',
          '${abstractDesc}',
          ${year && year !== "2022" ? `'${year}'` : null}
        )
        ON DUPLICATE KEY UPDATE
          belong='${abstractBelong}',
          description='${abstractDesc}',
          year=${year && year !== "2022" ? `'${year}'` : null}
        `;
      }

      await connection.query(sql2);
      connection.release();

      res.status(200).json({
        success: true,
        message: "Success",
      });
    } catch (err) {
      console.log(err);
    }
  },

  deleteSpeaker: async (req, res) => {
    const nation = req.query.nation;
    const id = req.params.id;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      const sql = `DELETE FROM speakers WHERE id=${id}`;
      await connection.query(sql);
      const sql2 = `DELETE FROM speaker_abstract WHERE speaker_id=${id}`;
      await connection.query(sql2);

      res.status(200).json({
        success: true,
        message: `연사 삭제 완료`,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err,
      });
    } finally {
      connection.release();
    }
  },

  showSpeaker: async (req, res) => {
    const { nation, speakers } = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      speakers.map(async (speaker) => {
        const sql = `UPDATE speakers SET status=1 WHERE id=${speaker.id}`;
        await connection.query(sql);
      });
      res.status(200).json({
        success: true,
        message: "Success",
      });
      connection.release();
    } catch (err) {
      console.log(err);
    }
  },

  getHideSpeaker: async (req, res) => {
    const { nation, year } = req.query;

    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      const sql = `SELECT * FROM speakers WHERE status=0 and${
        year && year !== "2022" ? ` year="${year}"` : ` year IS NULL`
      };`;
      const result = await connection.query(sql);
      res.send(result[0]);
      connection.release();
    } catch (err) {
      console.log(err);
    }
  },

  getUsers: async (req, res) => {
    const { nation, year } = req.query;

    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      let sql = "";
      sql = `SELECT id,email,title,role,last_name,first_name,institute,department,createdAt FROM ${
        year && year !== "2022" ? `user_${year}` : `user`
      }`;

      const result = await connection.query(sql);
      res.send(result[0]);
      connection.release();
    } catch (err) {
      console.log(err);
    }
  },
  // api/admin/users/role
  updateRole: async (req, res) => {
    const { nation, id, role, year } = req.body;

    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `UPDATE ${
        year && year !== "2022" ? `user_${year}` : "user"
      } SET role='${role}' WHERE id=${id}`;
      console.log(sql);
      await connection.query(sql);
      res.status(200).json({
        success: true,
        msg: "변경 성공",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        err,
      });
    } finally {
      connection.release();
    }
  },
};

module.exports = adminCtrl;
