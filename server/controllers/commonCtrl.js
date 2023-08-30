const e = require("express");
const path = require("path");
const { getCurrentPool } = require("../utils/getCurrentPool");

const commonCtrl = {
  getEventLanding: async (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public/common/landing.html"));
  },

  getExhibitParkSystems: async (req, res) => {
    res.sendFile(
      path.join(__dirname, "..", "public/common/exhibitParkSystems.html")
    );
  },

  getNanoScientific: async (req, res) => {
    res.sendFile(
      path.join(__dirname, "..", "public/common/exhibitNanoScientific.html")
    );
  },
  getMaintenance: async (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public/common/maintenance.html"));
  },
  getPrograms: async (req, res) => {
    const { nation, year } = req.query;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `SELECT * FROM programs WHERE status=1 and${
        year && year !== "2022" ? ` year="${year}"` : ` year IS NULL`
      } ORDER BY start_time `;
      const result = await connection.query(sql);
      connection.release();
      res.send(result[0]);
    } catch (err) {
      connection.release();
      console.log(err);
    }
  },
  getAgenda: async (req, res) => {
    const { nation, year } = req.query;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `SELECT * FROM program_agenda where${
        year && year !== "2022" ? ` year="${year}"` : ` year IS NULL`
      } ORDER BY program_id,next_id`;
      const result = await connection.query(sql);
      connection.release();
      res.status(200).json({ success: 1, data: result[0] });
    } catch (err) {
      connection.release();
      res.status(200).json({ success: 0, err });
      console.log(err);
    }
  },
  getSessions: async (req, res) => {
    const { nation, year, language } = req.query;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `SELECT * FROM program_sessions WHERE status=1 and${
        year && year !== "2022" ? ` year="${year}"` : ` year IS NULL`
      } ORDER BY date `;
      const result = await connection.query(sql);
      connection.release();
      res.send(result[0]);
    } catch (err) {
      connection.release();
      console.log(err);
    }
  },
  getSpeakers: async (req, res) => {
    const { nation, year } = req.query;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `
      SELECT * FROM speakers as S${
        year && year !== "2022"
          ? ` WHERE year="${year}"`
          : ` WHERE year IS NULL`
      };
      `;
      const result = await connection.query(sql);
      connection.release();
      res.send(result[0]);
    } catch (err) {
      connection.release();
      console.log(err);
    }
  },
  getSpeakersAbstract: async (req, res) => {
    const { nation, year } = req.query;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `SELECT * FROM speaker_abstract as S WHERE year${
        year && year !== "2022" ? `=${year}` : ` IS NULL`
      };`;
      const result = await connection.query(sql);
      connection.release();
      res.send(result[0]);
    } catch (err) {
      connection.release();
      console.log(err);
    }
  },
  updateSpeakerList: async (req, res) => {
    const { nation, list, abstractlist, year } = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      while (list.length > 0) {
        const {
          id,
          name,
          belong,
          image_path,
          status,
          keynote,
          has_abstract,
          description,
          year,
        } = list.shift();
        const sql = `UPDATE speakers SET
        name='${name}',
        belong='${belong}',
        image_path='${image_path}',
        keynote=${keynote},
        description='${description}', 
        has_abstract=${has_abstract},
        year=${year}
        WHERE id=${id}
        `;
        await connection.query(sql);
        connection.release();
      }

      while (abstractlist.length > 0) {
        const { id, speaker_id, belong, description } = abstractlist.shift();
        const sql = `UPDATE speaker_abstract SET 
        speaker_id='${speaker_id}',
        belong='${belong}',
        description='${description}',
        year='${year && year !== "2022" ? year : null}' WHERE id=${id};`;

        await connection.query(sql);
        connection.release();
      }
      res.status(200).json({
        success: true,
      });
    } catch (err) {
      connection.release();
      console.log(err);
      res.status(400).json({
        success: false,
        err,
      });
    }
  },
  getPosters: async (req, res) => {
    const { nation, year } = req.query;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      const sql = `SELECT * FROM poster where${
        year && year !== "2022" ? ` year="${year}"` : ` year IS NULL`
      }; `;
      const result = await connection.query(sql);
      connection.release();

      res.send(result[0]);
    } catch (err) {
      connection.release();
      console.log(err);
    }
  },
  // poster add
  addPoster: async (req, res) => {
    const {
      nation,
      id,
      title,
      affiliation,
      author,
      previewURL,
      filePath,
      year,
    } = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      let sql = "";
      if (id === undefined) {
        sql = `INSERT INTO poster (title,sub_title,author,image,attachment, year) VALUES 
        ('${title}','${affiliation}','${author}','${previewURL}','${filePath}', ${
          year && year !== "2022" ? `'${year}'` : null
        })`;
      } else {
        sql = `UPDATE poster SET 
        title='${title}',
        sub_title='${affiliation}',
        author='${author}',
        image='${previewURL}',
        attachment='${filePath}'
        WHERE id=${id}
        `;
      }
      const row = await connection.query(sql);
      connection.release();

      res.status(200).json({
        success: true,
      });
    } catch (err) {
      connection.release();
      console.log(err);
      res.status(400).json({
        success: false,
        err,
      });
    }
  },

  deletePoster: async (req, res) => {
    const { nation, id } = req.query;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      const sql = `DELETE FROM poster WHERE id=${id}`;
      await connection.query(sql);
      connection.release();
      res.json({
        success: true,
      });
    } catch (err) {
      connection.release();
      res.status(400).json({
        success: false,
        err,
      });
    }
  },

  updatePosterList: async (req, res) => {
    const { nation, list } = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      while (list.length > 0) {
        const { id, title, sub_title, author, image, attachment } =
          list.shift();
        const sql = `UPDATE poster SET
        title='${title}',
        sub_title='${sub_title}',
        author='${author}',
        image='${image}',
        attachment='${attachment}'
        WHERE id=${id}
        `;
        await connection.query(sql);
        connection.release();
      }
      res.status(200).json({
        success: true,
      });
    } catch (err) {
      connection.release();
      console.log(err);
      res.status(400).json({
        success: false,
        err,
      });
    }
  },

  getKeynoteSpeakers: async (req, res) => {
    const { nation, year } = req.query;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `
      SELECT * FROM speakers${
        year && year !== "2022"
          ? ` WHERE year="${year}"`
          : ` WHERE year IS NULL`
      } and keynote=1;
      `;
      const result = await connection.query(sql);
      connection.release();
      res.send(result[0]);
    } catch (err) {
      connection.release();
      console.log(err);
    }
  },
  getSpeakerDetailById: async (req, res) => {
    const { nation, id } = req.query;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      let sql;
      if (nation === "china") {
        sql = `SELECT 
        S.id, 
        S.name,
        S.name_en,
        S.image_path,
        S.description as title,
        S.description_en as title_en,
        SA.belong,
        SA.belong_en,
        SA.description,
        SA.description_en
      FROM speakers as S 
      INNER JOIN speaker_abstract as SA 
        ON S.id=SA.speaker_id WHERE S.id=${id}
      `;
      } else {
        sql = `
      SELECT 
        S.id, 
        S.name, 
        S.image_path,
        S.description as title,
        SA.belong,
        SA.description
      FROM speakers as S
      INNER JOIN speaker_abstract as SA 
        ON S.id=SA.speaker_id WHERE S.id=${id}
      `;
      }
      const result = await connection.query(sql);
      connection.release();
      if (result[0].length === 0) {
        res.status(200).json({
          success: true,
          result: { ...result[0][0] },
        });
      } else {
        res.status(200).json({
          success: true,
          result: {
            ...result[0][0],
          },
        });
      }
    } catch (err) {
      connection.release();
      console.log(err);
      res.status(200).json({ success: false, err });
    }
  },
  getSponsors: async (req, res) => {
    const { nation } = req.query;
    res.sendFile(path.join(__dirname, "..", `public/${nation}/sponsors.html`));
  },

  getBanner: async (req, res) => {
    const { nation, year, path } = req.query;
    const currentPool = getCurrentPool(nation);
    if (!currentPool) {
      res.status(200).json({
        success: false,
        msg: "no banner",
      });
      return;
    }
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `SELECT banner_path from banner WHERE path='${decodeURIComponent(
        path
      )}' and${year && year !== "2022" ? ` year="${year}"` : ` year IS NULL`}`;
      const row = await connection.query(sql);
      connection.release();
      if (row[0].length === 0) {
        res.status(200).json({
          success: false,
          msg: "no banner",
        });
      } else {
        res.status(200).json({
          success: true,
          result: row[0][0].banner_path,
        });
      }
    } catch (err) {
      connection.release();
      res.status(500).json({
        success: false,
        err,
      });
    }
  },
  setBanner: async (req, res) => {
    const { nation, path, imagePath, year } = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `UPDATE banner SET banner_path='${imagePath}' WHERE path='${decodeURIComponent(
        path
      )}' and${year && year !== "2022" ? ` year="${year}"` : ` year IS NULL`}`;
      await connection.query(sql);
      connection.release();
      res.status(200).json({
        success: true,
      });
    } catch (err) {
      connection.release();
      res.status(500).json({
        success: false,
        err,
      });
    }
  },
  getLandingSectionList: async (req, res) => {
    const { nation, year, language } = req.query;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      let sql;
      if (nation === "china") {
        sql = `
        SELECT
        id,
        ${language === "china" ? "title" : "title_en"} as title,
        landing_section.show
        FROM landing_section${
          year && year !== "2022"
            ? ` WHERE year="${year}"`
            : ` WHERE year IS NULL`
        };
        `;
      } else {
        sql = `
        SELECT * FROM landing_section${
          year && year !== "2022"
            ? ` WHERE year="${year}"`
            : ` WHERE year IS NULL`
        };
        `;
      }
      const row = await connection.query(sql);
      connection.release();
      res.status(200).json({
        success: true,
        result: row[0],
      });
    } catch (err) {
      connection.release();
      res.status(500).json({
        success: false,
        err,
      });
    }
  },

  setLandingSectionList: async (req, res) => {
    const { nation, landingSectionList } = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      for (let landing of landingSectionList) {
        const sql = `
        UPDATE landing_section SET 
        landing_section.show=${landing.show}
        WHERE id=${landing.id}
        `;

        await connection.query(sql);
        connection.release();
      }
      res.status(200).json({
        success: true,
      });
    } catch (err) {
      connection.release();
      console.log(err);
      res.status(500).json({
        success: false,
        err,
      });
    }
  },
  setLandingTitle: async (req, res) => {
    const { nation, title, year, language } = req.body;
    const { id } = req.params;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      let sql;
      if (nation === "china") {
        sql = `
        UPDATE landing_section SET 
        landing_section.${
          language === "china" ? "title" : "title_en"
        }='${title}'
        WHERE section_no=${id} and
        year${year && year != "2022" ? `=${year}` : ` IS NULL`}
        `;
      } else
        sql = `
        UPDATE landing_section SET 
        landing_section.title='${title}'
        WHERE section_no=${id} and
        year${year && year != "2022" ? `=${year}` : ` IS NULL`}
        `;
      await connection.query(sql);
      connection.release();
      res.status(200).json({
        success: true,
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
  getLandingBanner: async (req, res) => {
    const { nation, year, language } = req.query;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    const langSfx = language === "china" ? "" : "_en";

    try {
      let sql;
      if (nation === "china") {
        sql = `SELECT  
        background,
        bg_overlay,
        logo,
        venue${langSfx} as venue,
        date${langSfx} as date,
        show_register,
        \`desc${langSfx}\` as \`desc\`
        from landing_banner
      ${
        year && year !== "2022"
          ? ` WHERE year="${year}"`
          : ` WHERE year IS NULL`
      }`;
      } else {
        sql = `SELECT * from landing_banner
      ${
        year && year !== "2022"
          ? ` WHERE year="${year}"`
          : ` WHERE year IS NULL`
      }`;
      }

      const row = await connection.query(sql);
      connection.release();
      res.status(200).json({
        success: true,
        result: row[0],
      });
    } catch (err) {
      connection.release();
      res.status(500).json({
        success: false,
        err,
      });
    }
  },
  setLandingBanner: async (req, res) => {
    const {
      nation,
      year,
      language,
      date,
      desc,
      venue,
      background, //
    } = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    const langSfx = language === "china" ? "" : "_en";

    try {
      let sql;
      if (nation === "china") {
        sql = `UPDATE landing_banner SET
        date${langSfx}='${date}',
        landing_banner.desc='${desc}',
        venue${langSfx}='${venue}',
        background='${background}'
        WHERE year${year && year !== "2022" ? `=${year}` : " IS NULL"}
        `;
      } else {
        sql = `UPDATE landing_banner SET
        date='${date}',
        landing_banner.desc='${desc}',
        venue='${venue}',
        background='${background}'
        WHERE year${year && year !== "2022" ? `=${year}` : " IS NULL"}
        `;
      }
      await connection.query(sql);
      connection.release();

      res.status(200).json({
        success: true,
      });
    } catch (err) {
      connection.release();
      res.status(500).json({
        success: false,
        err,
      });
    }
  },
  getLandingContent: async (req, res) => {
    const { nation, year, language } = req.query;
    const { id } = req.params;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      let sql;
      if (
        nation === "china" &&
        id !== "4" &&
        id !== "7" &&
        id !== "8" &&
        id !== "6"
      ) {
        sql = `
        SELECT ${
          language === "china" ? "description" : "description_en"
        } as description, id,year FROM landing_section_${id}${
          year && year !== "2022"
            ? ` WHERE year="${year}"`
            : ` WHERE year IS NULL`
        };
        `;
      } else
        sql = `
      SELECT * FROM landing_section_${id}${
          year && year !== "2022"
            ? ` WHERE year="${year}"`
            : ` WHERE year IS NULL`
        };
      `;
      const row = await connection.query(sql);
      connection.release();
      res.status(200).json({
        success: true,
        result: row[0],
      });
    } catch (err) {
      connection.release();
      res.status(500).json({
        success: false,
        err,
      });
    }
  },
  getLanding2Content: async (req, res) => {
    const { nation, language } = req.query;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `
    SELECT ${
      language === "china" ? "description" : "description_en"
    } as description,
    teaser
    FROM landing_section_2 
    WHERE year${year && year != "2022" ? `=${year}` : ` IS NULL`};
    `;
      const row = await connection.query(sql);
      connection.release();
      res.status(200).json({
        success: true,
        result: row[0],
      });
    } catch (err) {
      connection.release();
      res.status(500).json({
        success: false,
        err,
      });
    }
  },
  setLanding2Content: async (req, res) => {
    const { nation, title, description, year, language } = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      let sql;
      if (nation === "china") {
        sql = `UPDATE landing_section_2 SET 
        ${
          language === "china" ? "description" : "description_en"
        }='${description}'
        WHERE year${year && year != "2022" ? `=${year}` : ` IS NULL`}`;
      } else
        sql = `UPDATE landing_section_2 SET 
      description='${description}'
      WHERE year${year && year != "2022" ? `=${year}` : ` IS NULL`}
      `;
      await connection.query(sql);
      connection.release();

      let sql2;
      if (nation === "china") {
        sql2 = `UPDATE landing_section SET 
        ${language === "china" ? "title" : "title_en"}='${title}'
        WHERE section_no=2 and
        year${year && year != "2022" ? `=${year}` : ` IS NULL`}
        `;
      } else {
        sql2 = `UPDATE landing_section SET 
        title='${title}'
        WHERE section_no=2 and
        year${year && year != "2022" ? `=${year}` : ` IS NULL`}
        `;
      }
      await connection.query(sql2);
      connection.release();

      res.status(200).json({
        success: true,
      });
    } catch (err) {
      connection.release();
      console.log(err);
      res.status(500).json({
        success: false,
        err,
      });
    }
  },
  getLanding3Content: async (req, res) => {
    const { nation, language, year } = req.query;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      let sql;
      if (nation === "china") {
        sql = `
    SELECT ${
      language === "china" ? "description" : "description_en"
    } as description
    FROM landing_section_3
    where year${year && year != "2022" ? `=${year}` : ` IS NULL`};
    `;
      } else
        sql = `SELECT description
      FROM landing_section_3
      where year${year && year != "2022" ? `=${year}` : ` IS NULL`};
      `;
      const row = await connection.query(sql);
      connection.release();
      res.status(200).json({
        success: true,
        result: row[0],
      });
    } catch (err) {
      connection.release();
      res.status(500).json({
        success: false,
        err,
      });
    }
  },
  setLanding3Content: async (req, res) => {
    const { nation, title, description, year, language } = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      let sql;
      if (nation === "china") {
        sql = `UPDATE landing_section_3 SET 
        ${
          language === "china" ? "description" : "description_en"
        }='${description}'
        WHERE year${year && year != "2022" ? `=${year}` : ` IS NULL`}
        `;
      } else
        sql = `UPDATE landing_section_3 SET 
      description='${description}'
      WHERE year${year && year != "2022" ? `=${year}` : ` IS NULL`}
      `;
      await connection.query(sql);
      connection.release();
      let sql2;
      if (nation === "china") {
        sql2 = `UPDATE landing_section SET 
        ${language === "china" ? "title" : "title_en"}='${title}'
        WHERE section_no=3 and
        year${year && year != "2022" ? `=${year}` : ` IS NULL`}
      `;
      } else
        sql2 = `UPDATE landing_section SET 
      title='${title}'
      WHERE section_no=3 and
      year${year && year != "2022" ? `=${year}` : ` IS NULL`}
  
      `;
      await connection.query(sql2);
      connection.release();

      res.status(200).json({
        success: true,
      });
    } catch (err) {
      connection.release();
      res.status(500).json({
        success: false,
        err,
      });
    }
  },
  getLanding6Content: async (req, res) => {
    const { nation, language, year } = req.query;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    const langSfx = language === "china" ? "" : "_en";
    try {
      let sql;
      if (nation === "china") {
        sql = `
        SELECT 
        description${langSfx} as description,
        url,
        button_text${langSfx} as button_text
        FROM landing_section_6
        WHERE year${year && year != "2022" ? `=${year}` : ` IS NULL`}
        `;
      } else
        sql = `
    SELECT 
    description,
    url,
    button_text,
    FROM landing_section_6;
    WHERE year${year ? `=${year}` : ` IS NULL`}
    `;
      const row = await connection.query(sql);
      connection.release();
      res.status(200).json({
        success: true,
        result: row[0],
      });
    } catch (err) {
      connection.release();
      res.status(500).json({
        success: false,
        err,
      });
    }
  },
  setLanding6Content: async (req, res) => {
    const { nation, title, description, year, language } = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    const langSfx = language === "china" ? "" : "_en";
    try {
      let sql;
      if (nation === "china") {
        `UPDATE landing_section_6 SET 
    description${langSfx}='${description}'
    WHERE id=1 and year${year ? `=${year}` : " IS NULL"}`;
      } else
        sql = `UPDATE landing_section_6 SET 
      description='${description}'
      WHERE year${year ? `=${year}` : " IS NULL"};
      `;
      await connection.query(sql);
      connection.release();

      res.status(200).json({
        success: true,
      });
    } catch (err) {
      connection.release();
      res.status(500).json({
        success: false,
        err,
      });
    }
  },
  setLanding6Button: async (req, res) => {
    const { nation, url, buttonText, year, language } = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    const langSfx = language === "china" ? "" : "_en";
    try {
      let sql;
      if (nation === "china") {
        sql = `UPDATE landing_section_6 SET 
        url='${url}',
        button_text${langSfx}='${buttonText}'
        WHERE year${year ? `=${year}` : " IS NULL"}`;
      } else
        sql = `UPDATE landing_section_6 SET 
      url='${url}',
      button_text='${buttonText}'
      WHERE year${year ? `=${year}` : " IS NULL"}
      `;
      await connection.query(sql);
      connection.release();

      res.status(200).json({
        success: true,
      });
    } catch (err) {
      connection.release();
      res.status(500).json({
        success: false,
        err,
      });
    }
  },
  setLanding4Content: async (req, res) => {
    const { nation, title, description, year } = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `INSERT INTO landing_section_4 (title,description${
        year ? ",year" : ""
      }) VALUES 
      ('${title}','${description}'${year ? `,${year}` : ""})`;
      await connection.query(sql);
      connection.release();

      res.status(200).json({
        success: true,
      });
    } catch (err) {
      connection.release();
      res.status(500).json({
        success: false,
        err,
      });
    }
  },
  modifyLanding4Content: async (req, res) => {
    const { nation, id, title, description } = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `UPDATE landing_section_4 SET 
      title='${title}',
      description='${description}'
      WHERE id=${id}`;
      await connection.query(sql);
      connection.release();
      res.status(200).json({
        success: true,
      });
    } catch (err) {
      connection.release();
      res.status(500).json({
        success: false,
        err,
      });
    }
  },
  deleteLanding4Content: async (req, res) => {
    const { nation, id } = req.query;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `DELETE FROM landing_section_4 WHERE id=${id}`;
      await connection.query(sql);
      connection.release();
      res.status(200).json({
        success: true,
      });
    } catch (err) {
      connection.release();
      res.status(500).json({
        success: false,
        err,
      });
    }
  },

  addSponsor: async (req, res) => {
    const { nation, name, url, imagePath, height, sectionNo, year } = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `INSERT INTO landing_section_${sectionNo}
      (name, url, image_path, height, year)
      VALUES
      ('${name}','${url}','${imagePath}', ${height ? height : 0}, ${
        year ? year : null
      })
      `;
      const row = await connection.query(sql);
      connection.release();
      res.status(200).json({
        success: true,
      });
    } catch (err) {
      connection.release();
      res.status(500).json({
        success: false,
        err,
      });
    }
  },
  modifySponsor: async (req, res) => {
    const { nation, id, name, url, imagePath, height, sectionNo } = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `UPDATE landing_section_${sectionNo} SET
      name='${name}', url='${url}',
      image_path='${imagePath}',
      height=${height ? height : 0}
      WHERE id=${id}
      `;
      const row = await connection.query(sql);
      connection.release();

      res.status(200).json({
        success: true,
      });
    } catch (err) {
      connection.release();
      res.status(500).json({
        success: false,
        err,
      });
    }
  },
  deleteSponsor: async (req, res) => {
    const { nation, id, sectionNo } = req.query;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `DELETE FROM landing_section_${sectionNo} WHERE id=${id}`;
      const row = await connection.query(sql);
      connection.release();

      res.status(200).json({
        success: true,
      });
    } catch (err) {
      connection.release();
      res.status(500).json({
        success: false,
        err,
      });
    }
  },

  getAbstractDesc: async (req, res) => {
    const { nation, year } = req.query;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `
      SELECT * FROM abstract_submission_desc${
        year && year !== "2022"
          ? ` WHERE year="${year}"`
          : ` WHERE year IS NULL`
      };
      `;
      const row = await connection.query(sql);
      connection.release();
      res.status(200).json({
        success: true,
        result: row[0],
      });
    } catch (err) {
      connection.release();
      res.status(500).json({
        success: false,
        err,
      });
    }
  },
  setAbstractDesc: async (req, res) => {
    const { nation, desc, year, id } = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      let sql;
      console.log(id);
      if (id) {
        sql = `UPDATE abstract_submission_desc as a SET a.desc="${desc}"${
          year && year !== "2022"
            ? ` WHERE year="${year}"`
            : ` WHERE year IS NULL`
        };`;
      } else
        sql = `
      INSERT INTO abstract_submission_desc (${"`desc`"},year) VALUES ('${desc}', '${year}');
      `;
      await connection.query(sql);
      connection.release();
      res.status(200).json({
        success: true,
      });
    } catch (err) {
      connection.release();
      console.log(err);
      res.status(500).json({
        success: false,
        err,
      });
    }
  },

  getEditorContent: async (req, res) => {
    const { nation, tableName, year } = req.query;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `
      SELECT * FROM ${tableName}_content
      ${
        year && year !== "2022" ? ` WHERE year="${year}"` : `WHERE year IS NULL`
      }
      `;
      const row = await connection.query(sql);

      connection.release();
      res.status(200).json({
        success: true,
        result: row[0][0].description,
      });
    } catch (err) {
      connection.release();
      console.log(err);
      res.status(500).json({
        success: false,
        err,
      });
    }
  },
  updateEditorContent: async (req, res) => {
    const { nation, content, tableName, year } = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `
      UPDATE ${tableName}_content SET description='${content}'
      ${
        year && year !== "2022" ? ` WHERE year="${year}"` : `WHERE year IS NULL`
      }
      `;
      await connection.query(sql);
      connection.release();
      res.status(200).json({
        success: true,
      });
    } catch (err) {
      connection.release();
      console.log(err);
      res.status(500).json({
        success: false,
        err,
      });
    }
  },
};

module.exports = commonCtrl;
