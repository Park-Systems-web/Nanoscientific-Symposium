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
    const { nation } = req.query;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `SELECT * FROM programs WHERE status=1 ORDER BY start_time `;
      const result = await connection.query(sql);
      connection.release();
      res.send(result[0]);
    } catch (err) {
      connection.release();
      console.log(err);
    }
  },
  getAgenda: async (req, res) => {
    const { nation } = req.query;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `SELECT * FROM program_agenda ORDER BY program_id,next_id`;
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
    const { nation } = req.query;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `SELECT * FROM program_sessions WHERE status=1 ORDER BY date `;
      const result = await connection.query(sql);
      connection.release();
      res.send(result[0]);
    } catch (err) {
      connection.release();
      console.log(err);
    }
  },
  getSpeakers: async (req, res) => {
    const { nation } = req.query;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    console.log(`${nation} ${currentPool} ${connection}`);
    try {
      const sql = `
      SELECT 
      *
      FROM speakers as S
      `;
      const result = await connection.query(sql);
      connection.release();
      res.send(result[0]);
    } catch (err) {
      connection.release();
      console.log(err);
    }
  },
  getPosters: async (req, res) => {
    const { nation } = req.query;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      const sql = `SELECT * FROM poster`;
      const result = await connection.query(sql);
      connection.release();

      res.send(result[0]);
    } catch (err) {
      connection.release();
      console.log(err);
    }
  },
  getKeynoteSpeakers: async (req, res) => {
    const { nation } = req.query;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `SELECT * FROM speakers WHERE keynote=1`;
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
      const sql = `
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
    const { nation, path } = req.query;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `SELECT banner_path from banner WHERE path='${decodeURIComponent(
        path
      )}'`;
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
    const { nation, path, imagePath } = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `UPDATE banner SET banner_path='${imagePath}' WHERE path='${decodeURIComponent(
        path
      )}'`;
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
    const { nation } = req.query;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `
      SELECT * FROM landing_section;
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
    const { nation, title } = req.body;
    const { id } = req.params;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      const sql = `
        UPDATE landing_section SET 
        landing_section.title='${title}'
        WHERE id=${id}
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
  getLandingContent: async (req, res) => {
    const { nation } = req.query;
    const { id } = req.params;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `
      SELECT * FROM landing_section_${id};
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
    const { nation, title, description } = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `UPDATE landing_section_2 SET 
      description='${description}'
      WHERE id=1`;
      await connection.query(sql);
      connection.release();

      const sql2 = `UPDATE landing_section SET 
      title='${title}'
      WHERE id=2`;
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
  setLanding3Content: async (req, res) => {
    const { nation, title, description } = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `UPDATE landing_section_3 SET 
      description='${description}'
      WHERE id=1`;
      await connection.query(sql);
      connection.release();

      const sql2 = `UPDATE landing_section SET 
      title='${title}'
      WHERE id=3`;
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
  setLanding6Content: async (req, res) => {
    const { nation, title, description } = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `UPDATE landing_section_6 SET 
      description='${description}'
      WHERE id=1`;
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
    const { nation, url, buttonText } = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `UPDATE landing_section_6 SET 
      url='${url}',
      button_text='${buttonText}'
      WHERE id=1`;
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
    const { nation, title, description } = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `INSERT INTO landing_section_4 (title,description) VALUES 
      ('${title}','${description}')`;
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
    const { nation, name, url, imagePath, height } = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `INSERT INTO landing_section_7 
      (name, url, image_path, height)
      VALUES
      ('${name}','${url}','${imagePath}', ${height ? height : 0})
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
    const { nation, id, name, url, imagePath, height } = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `UPDATE landing_section_7 SET
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
    const { nation, id } = req.query;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `DELETE FROM landing_section_7 WHERE id=${id}`;
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
};

module.exports = commonCtrl;
