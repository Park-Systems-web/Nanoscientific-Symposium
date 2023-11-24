const axios = require("axios");
const path = require("path");
const jwt = require("jsonwebtoken");
const { getCurrentPool } = require("../../common/utils/getCurrentPool");

const zoomCtrl = {
  // getWebinarList: async (req, res) => {
  //   const { nation } = req.query;
  //   const currentPool = getCurrentPool(nation);
  //   const connection = await currentPool.getConnection(async (conn) => conn);

  //   const sql = `SELECT webinar_id FROM webinar`;
  //   const row = await connection.query(sql);

  //   const webinarIdList = row[0].map((e) => e.webinar_id);

  //   let result = [];
  //   for (let wi of webinarIdList) {
  //     try {
  //       let response = await axios.get(
  //         `https://api.zoom.us/v2/webinars/${wi}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${res.locals.zoom_token}`,
  //           },
  //         }
  //       );
  //       const {
  //         uuid,
  //         id,
  //         host_id,
  //         created_at,
  //         duration,
  //         join_url,
  //         start_time,
  //         timezone,
  //         topic,
  //         type,
  //       } = response.data;
  //       result.push({
  //         uuid,
  //         id,
  //         host_id,
  //         created_at,
  //         duration,
  //         join_url,
  //         start_time,
  //         timezone,
  //         topic,
  //         type,
  //         connected: true,
  //       });
  //     } catch (err) {
  //       result.push({ id: wi, connected: false });
  //       continue;
  //     }
  //   }
  //   connection.release();

  //   res.status(200).json({
  //     result,
  //     success: true,
  //   });
  // },

  getWebinarList: async (req, res) => {
    const { nation, year } = req.query;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      const sql = `SELECT * FROM webinar where ${
        year && year !== "2022" ? ` year="${year}"` : ` year IS NULL`
      };`;
      const row = await connection.query(sql);

      const webinarList = row[0].filter((w) => !w.is_meeting);
      const meetingList = row[0].filter((w) => w.is_meeting);

      const webinarIdList = webinarList.map((e) => e.webinar_id);

      let result;
      let response = await axios.get(
        `https://api.zoom.us/v2/users/${res.locals.zoom_email}/webinars`,
        {
          headers: {
            Authorization: `Bearer ${res.locals.zoom_token}`,
          },
        }
      );
      result = response.data.webinars;
      while (response.data.next_page_token !== "") {
        response = await axios.get(
          `https://api.zoom.us/v2/users/${res.locals.zoom_email}/webinars?next_page_token=${response.data.next_page_token}`,
          {
            headers: {
              Authorization: `Bearer ${res.locals.zoom_token}`,
            },
          }
        );
        result = [...result, ...response.data.webinars];
      }

      result = result.filter((w) => webinarIdList.indexOf(`${w.id}`) !== -1);
      result = result.map((r, i) => {
        return {
          ...r,
          is_live: row[0][i].is_live,
        };
      });

      //
      for (let m of meetingList) {
        try {
          let response = await axios.get(
            `https://api.zoom.us/v2/meetings/${m.webinar_id}`,
            {
              headers: {
                Authorization: `Bearer ${res.locals.zoom_token}`,
              },
            }
          );
          const {
            uuid,
            id,
            host_id,
            created_at,
            duration,
            join_url,
            start_time,
            timezone,
            topic,
            type,
          } = response.data;
          result.push({
            uuid,
            id,
            host_id,
            created_at,
            duration,
            join_url,
            start_time,
            timezone,
            topic,
            type,
            is_live: m.is_live,
            is_meeting: true,
            connected: true,
          });
          result = result.sort(
            (a, b) => new Date(a.start_time) - new Date(b.start_time)
          );
        } catch (err) {
          result.push({ id: m.id, connected: false });
          continue;
        }
      }

      res.status(200).json({
        success: true,
        result,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        err,
      });
    }
  },

  getWebinar: async (req, res) => {
    const { nation } = req.query;
    const { webinarId } = req.params;
    const currentPool = getCurrentPool(nation);

    try {
      let response = await axios.get(
        `https://api.zoom.us/v2/webinars/${webinarId}`,
        {
          headers: {
            Authorization: `Bearer ${res.locals.zoom_token}`,
          },
        }
      );
      const {
        uuid,
        id,
        host_id,
        created_at,
        duration,
        join_url,
        start_time,
        timezone,
        topic,
        type,
      } = response.data;

      if (response.data.code === 3001) {
        res.status(200).json({
          result: null,
          success: true,
        });
      } else {
        res.status(200).json({
          result: {
            uuid,
            id,
            host_id,
            created_at,
            duration,
            join_url,
            start_time,
            timezone,
            topic,
            type,
          },
          success: true,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({
        err,
        success: false,
      });
    }
  },

  // 웨비나 등록 질문 받아오기.
  getRegistrationQuestions: async (req, res) => {
    try {
      const response = await axios.get(
        `https://api.zoom.us/v2/webinars/${req.params.webinarId}/registrants/questions`,
        {
          headers: {
            Authorization: `Bearer ${res.locals.zoom_token}`,
          },
        }
      );
      res.status(200).json({
        result: response.data,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        err,
      });
    }
  },
  // addRegistrant: async (req, res) => {
  //   const { questions } = req.body;
  //   let newQuestions = {};

  //   Object.entries(questions).forEach(
  //     (question) => (newQuestions[question[0]] = question[1].value)
  //   );
  //   console.log(newQuestions);

  //   try {
  //     const response = await axios.post(
  //       `https://api.zoom.us/v2/webinars/${req.params.webinarId}/registrants`,
  //       newQuestions,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${res.locals.zoom_token}`,
  //         },
  //       }
  //     );
  //     res.status(200).json({
  //       result: response.data,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     res.status(400).json({
  //       err,
  //     });
  //   }
  // },
  addRegistrant: async (req, res) => {
    const { questions, nation } = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    let newQuestions = {};
    Object.entries(questions).forEach(
      (question) => (newQuestions[question[0]] = question[1].value)
    );
    try {
      const response = await axios.post(
        `https://api.zoom.us/v2/webinars/${req.params.webinarId}/registrants`,
        newQuestions,
        {
          headers: {
            Authorization: `Bearer ${res.locals.zoom_token}`,
          },
        }
      );

      const sql = `INSERT INTO registrants (registrant_id,email,webinar_id) VALUES 
      ("${response.data.registrant_id}","${newQuestions.email}","${req.params.webinarId}")
      `;

      await connection.query(sql);
      connection.release();
      res.status(200).json({
        result: response.data,
      });
    } catch (err) {
      console.log(err);
      connection.release();
      res.status(400).json({
        err,
      });
    } finally {
      connection.release();
    }
  },

  getRegistrantLink: async (req, res) => {
    const { webinarId } = req.params;
    const { email, nation } = req.query;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      const sql = `
      SELECT registrant_id FROM registrants
      WHERE email="${email}" AND webinar_id="${webinarId}";
      `;

      const row = await connection.query(sql);
      connection.release();
      if (row[0].length !== 0) {
        let response = await axios.get(
          `https://api.zoom.us/v2/webinars/${webinarId}/registrants/${row[0][0].registrant_id}`,
          {
            headers: {
              Authorization: `Bearer ${res.locals.zoom_token}`,
            },
          }
        );
        res.status(200).json({
          result: response.data.join_url,
          success: true,
        });
      } else {
        connection.release();
        res.status(200).json({
          result: null,
          success: true,
        });
      }
    } catch (err) {
      connection.release();
      res.status(400).json({
        success: false,
      });
    }
  },
  fetchRegistrantId: async (req, res) => {
    const { email, nation } = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    const success = [];
    const failed = [];

    const sql0 = `SELECT webinar_id FROM webinar`;
    const row0 = await connection.query(sql0);

    if (row0.length === 0) {
      res.status(200).json({
        success,
      });
    }

    for (let i = 0; i < row0[0].length; i++) {
      let webinarId = row0[0][i].webinar_id;

      const sql1 = `SELECT registrant_id FROM registrants
      WHERE email="${email}" AND webinar_id="${webinarId}"`;

      const row = await connection.query(sql1);

      connection.release();
      if (row[0].length !== 0) {
        success.push(webinarId);
        connection.release();
        continue;
      }

      try {
        let response = await axios.get(
          `https://api.zoom.us/v2/webinars/${webinarId}/registrants`,
          {
            headers: {
              Authorization: `Bearer ${res.locals.zoom_token}`,
            },
          }
        );
        let filtered = response.data.registrants.filter(
          (e) => e.email === email
        );
        if (filtered.length > 0) {
          const sql2 = `INSERT INTO registrants 
        (registrant_id,email,webinar_id) VALUES 
        ("${filtered[0].id}","${email}","${webinarId}")
        `;
          await connection.query(sql2);
          connection.release();
          success.push(webinarId);
          continue;
        }
        while (response.data.next_page_token !== "") {
          response = await axios.get(
            `https://api.zoom.us/v2/webinars/${webinarId}/registrants?next_page_token=${response.data.next_page_token}`,
            {
              headers: {
                Authorization: `Bearer ${res.locals.zoom_token}`,
              },
            }
          );
          let filtered = response.data.registrants.filter(
            (e) => e.email === email
          );
          if (filtered.length > 0) {
            const sql2 = `INSERT INTO registrants 
        (registrant_id,email,webinar_id) VALUES 
        ("${filtered[0].id}","${email}","${webinarId}")
        `;
            await connection.query(sql2);
            connection.release();
            success.push(webinarId);
            break;
          }
        }
      } catch (err) {
        failed.push(webinarId);
        continue;
      }
    }
    connection.release();
    res.status(200).json({
      success,
      failed,
    });
    // } catch (err) {
    //   console.log(err);
    //   connection.release();
    //   res.status(400).json({
    //     err,
    //   });
    // }
  },
  addWebinar: async (req, res) => {
    const { nation, year } = req.query;
    const { webinarId } = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `INSERT INTO webinar (webinar_id, year) VALUES ("${webinarId}", ${
        year && year !== "2022" ? `"${year}"` : null
      })`;
      await connection.query(sql);
      connection.release();
      res.status(200).json({
        success: true,
      });
    } catch (err) {
      console.log(err);
      connection.release();
      res.status(400).json({
        err,
      });
    }
  },
  removeWebinar: async (req, res) => {
    const { webinarId } = req.params;
    const { nation } = req.query;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      const sql = `DELETE FROM webinar WHERE webinar_id="${webinarId}"`;
      await connection.query(sql);
      connection.release();
      res.status(200).json({
        success: true,
      });
    } catch (err) {
      console.log(err);
      connection.release();
      res.status(400).json({
        err,
      });
    }
    connection.release();
  },
  getMeetingList: async (req, res) => {
    const { nation } = req.query;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    // try {
    const sql = `SELECT meeting_id, is_live FROM discussion_table`;
    const row = await connection.query(sql);

    // const meetingIdList = row[0].map((e) => e.meeting_id);

    let result = [];
    for (let m of row[0]) {
      try {
        let response = await axios.get(
          `https://api.zoom.us/v2/meetings/${m.meeting_id}`,
          {
            headers: {
              Authorization: `Bearer ${res.locals.zoom_token}`,
            },
          }
        );
        const {
          uuid,
          id,
          host_id,
          created_at,
          duration,
          join_url,
          start_time,
          timezone,
          topic,
          type,
        } = response.data;
        result.push({
          uuid,
          id,
          host_id,
          created_at,
          duration,
          join_url,
          start_time,
          timezone,
          topic,
          type,
          is_live: m.is_live,
          connected: true,
        });
      } catch (err) {
        result.push({ id: m.id, connected: false });
        continue;
      }
    }
    connection.release();

    res.status(200).json({
      result,
      success: true,
    });
  },

  setLiveStatus: async (req, res) => {
    const { nation, id, isLive, isMeeting } = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      let sql = "";
      if (isMeeting) {
        sql = `UPDATE discussion_table SET is_live=${isLive} WHERE meeting_id='${id}'`;
      } else {
        sql = `UPDATE webinar SET is_live=${isLive} WHERE webinar_id='${id}'`;
      }
      await connection.query(sql);
      res.status(200).json({
        success: true,
      });
    } catch (err) {
      res.status(400).json({
        err,
      });
    }
  },
};

module.exports = zoomCtrl;
