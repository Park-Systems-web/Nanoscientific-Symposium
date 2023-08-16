const hasher = require("wordpress-hash-node");
const {
  issueAccessToken,
  issueRefreshToken,
  issueRefreshTokenByYear,
  issueAccessTokenByYear,
} = require("../utils/jwt");
const { getCurrentPool } = require("../utils/getCurrentPool");
const useYearList = ["eu"];

const usersCtrl = {
  login: async (req, res, next) => {
    const currentPool = getCurrentPool(req.body.nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    const year = req.body.year;
    const userEmail = req.body.email;
    const userPw = req.body.password;
    const isCommon = req.body.isCommon;

    const yearList = ["2022", "2023"];
    let checked = false;

    let sql;

    try {
      // if (useYearList.indexOf(req.body.nation) === -1) {
      //   // useYearList에 없는 경우
      //   sql = `SELECT email, password, role FROM user WHERE email='${userEmail}'`;
      // } else
      sql = `SELECT email, password, role FROM ${
        year && year !== "2022" ? `user_${year}` : `user`
      } WHERE email='${userEmail}';`;
      const result = await connection.query(sql);
      connection.release();
      if (result[0].length) {
        let dbPassword = result[0][0].password; // 해쉬화 된 db상의 wordpress 비밀번호
        checked = hasher.CheckPassword(userPw, dbPassword);
        role = result[0][0].role;
      }
      connection.release();
    } catch (error) {
      await connection.rollback();
      connection.release();
      res.status(500).json({ error });
      throw error;
    }

    if (checked) {
      // refresh토큰 생성 및 db에 저장
      let insertSql;
      let getUserIdSql;
      let refreshToken = issueRefreshToken(userEmail);
      // if (useYearList.indexOf(req.body.nation) === -1) {
      //   // useYearList에 없는 경우
      //   // refreshToken = issueRefreshToken(userEmail);
      //   insertSql = `UPDATE user SET refresh_token='${refreshToken}' WHERE email='${userEmail}'`;
      //   getUserIdSql = `SELECT id FROM user WHERE email='${userEmail}'`;
      // } else {
      // refreshToken = issueRefreshTokenByYear(userEmail,year);
      insertSql = `UPDATE ${
        year && year !== "2022" ? `user_${year}` : `user`
      } SET refresh_token='${refreshToken}' WHERE email='${userEmail}'`;
      getUserIdSql = `SELECT id FROM ${
        year && year !== "2022" ? `user_${year}` : `user`
      } WHERE email='${userEmail}'`;
      // }

      try {
        await connection.beginTransaction();
        await connection.query(insertSql);
        // fetch user id data
        const result = await connection.query(getUserIdSql);
        await connection.commit();
        connection.release();

        // access토큰 생성
        let accessToken = issueAccessToken(userEmail);

        // 쿠키 세팅
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
        });

        res.status(200).json({
          success: true,
          message: "login success",
          accessToken,
          role,
          userId: result[0][0].id,
        });
      } catch (error) {
        await connection.rollback();
        connection.release();
        res.status(500).json({ error });
        throw error;
      }
    } else {
      res.status(200).json({
        success: false,
        message: "user info not match.",
      });
    }
  },

  logout: async (req, res) => {
    const currentPool = getCurrentPool(req.body.nation);

    const connection = await currentPool.getConnection(async (conn) => conn);

    const year = req.body.year;
    const userEmail = req.body.email;
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      res.status(200).json({
        success: false,
        message: "Refresh token not exists in client",
      });
      return;
    }
    try {
      let sql;
      // if (useYearList.indexOf(req.body.nation) === -1) {
      //   // useYearList에 없는 경우
      sql = `UPDATE user SET refresh_token='' 
        WHERE email='${userEmail}' AND refresh_token='${refreshToken}'`;
      // } else
      sql = `UPDATE ${
        year && year !== "2022" ? `user_${year}` : `user`
      } SET refresh_token='' 
      WHERE email='${userEmail}' AND refresh_token='${refreshToken}'`;
      const result = await connection.query(sql);
      connection.release();
      // if (result[0].changedRows === 0) {
      //   res.status(200).json({
      //     success: true,
      //     message: "Already logged out",
      //   });
      // } else {
      res.cookie("refreshToken", "", {
        httpOnly: true,
      });
      res.status(200).json({
        success: true,
        message: "Successfully logged out",
      });
      // }
    } catch (error) {
      await connection.rollback();
      connection.release();
      res.status(500).json({ error });
      throw error;
    }
  },
  checkEmail: async (req, res) => {
    const { year, email, nation } = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      let sql;
      // if (useYearList.indexOf(nation) === -1) {
      //   // useYearList에 없는 경우
      //   sql = `SELECT EXISTS(
      //     SELECT email FROM user WHERE email="${email}"
      //     ) as result;`;
      // } else {
      sql = `SELECT EXISTS( 
          SELECT email FROM ${
            year && year !== "2022" ? `user_${year}` : `user`
          } WHERE email="${email}"
          ) as result;`;
      // }
      const result = await connection.query(sql);
      connection.release();

      res.status(200).json({
        success: true,
        result: result[0][0].result === 0 ? false : true,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        err,
      });
    }
  },

  checkPasswordSet: async (req, res) => {
    const currentPool = getCurrentPool(req.body.nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    const userEmail = req.body.email;
    const year = req.body.year;
    let result = "";
    try {
      let sql;
      // if (useYearList.indexOf(req.body.nation) === -1) {
      //   sql = `SELECT is_password_set FROM user WHERE email="${userEmail}"`;
      // } else
      sql = `SELECT is_password_set FROM ${
        year && year !== "2022" ? `user_${year}` : `user`
      } WHERE email="${userEmail}"`;
      result = await connection.query(sql);
      connection.release();
      if (result[0].length === 0) {
        res.status(200).json({
          success: false,
          result: "email NOT EXIST",
        });
      } else {
        res.status(200).json({
          success: true,
          result: result[0][0].is_password_set === 0 ? false : true,
          msg: "패스워드 설정: true, 미설정: false",
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        err,
      });
    }
  },

  // 비밀번호 초기 설정
  setPassword: async (req, res) => {
    const currentPool = getCurrentPool(req.body.nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    const userEmail = req.body.email;
    const year = req.body.year;
    const userPassword = hasher.HashPassword(req.body.password);
    try {
      let sql;
      // if (useYearList.indexOf(req.body.nation) === -1) {
      //   sql = `UPDATE user SET password='${userPassword}', is_password_set=1 WHERE email='${userEmail}'`;
      // } else
      sql = `UPDATE ${
        year && year !== "2022" ? `user_${year}` : `user`
      } SET password='${userPassword}', is_password_set=1 WHERE email='${userEmail}'`;
      try {
        await connection.query(sql);
        connection.release();
        res.status(200).json({
          success: true,
          result: "success",
        });
      } catch (err) {
        res.status(500).json({
          success: false,
          err,
        });
        return false;
      }
    } catch (err) {
      connection.release();
      res.status(500).json({
        success: false,
        err,
      });
    }
  },

  // 비밀번호 재설정
  resetPassword: async (req, res) => {
    const { nation, curPassword, newPassword, year } = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    const userEmail = res.locals.email;

    const hashedNewPassword = hasher.HashPassword(newPassword);

    try {
      let sql1;
      // if (useYearList.indexOf(nation) === -1) {
      //   sql1 = `SELECT password FROM user WHERE email='${userEmail}'`;
      // } else
      sql1 = `SELECT password FROM ${
        year && year !== "2022" ? `user_${year}` : `user`
      } WHERE email='${userEmail}'`;
      const passwordRow = await connection.query(sql1);
      connection.release();

      if (hasher.CheckPassword(curPassword, passwordRow[0][0].password)) {
        let sql2;
        // if (useYearList.indexOf(nation) === -1) {
        //   sql2 = `UPDATE user SET password='${hashedNewPassword}', is_password_set=1 WHERE email='${userEmail}'`;
        // } else
        sql2 = `UPDATE ${
          year && year !== "2022" ? `user_${year}` : `user`
        } SET password='${hashedNewPassword}', is_password_set=1 WHERE email='${userEmail}'`;
        await connection.query(sql2);
        connection.release();
        res.status(200).json({
          success: true,
          result: "success",
        });
      } else {
        res.status(200).json({
          success: false,
          code: "P40",
          result: "Current password not matched.",
        });
      }
    } catch (err) {
      connection.release();
      console.log(err);
      res.status(500).json({
        success: false,
        err,
      });
      return false;
    }
  },

  // 비밀번호 분실
  forgotPassword: async (req, res) => {
    const currentPool = getCurrentPool(req.body.nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    const year = req.body.year;
    const userEmail = req.body.email;
    const newPassword = hasher.HashPassword(req.body.password);

    try {
      let sql;
      sql = `UPDATE ${
        year && year !== "2022" ? `user_${year}` : `user`
      } SET password='${newPassword}', is_password_set=1 WHERE email='${userEmail}'`;

      await connection.query(sql);
      connection.release();

      res.status(200).json({
        success: true,
        result: true,
        msg: "비밀번호 변경 성공",
      });
    } catch (err) {
      console.log(err);
      connection.release();

      res.status(500).json({
        success: false,
        err,
      });
      return false;
    }
  },

  // 회원가입
  register: async (req, res) => {
    const {
      title,
      firstName,
      lastName,
      email,
      phone,
      institute,
      department,
      country,
      state,
      nation,
      isStudent,
      participationType,
      issueBill,
      year,
    } = req.body;

    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      let sql;
      if (nation === "eu") {
        sql = `INSERT INTO ${year && year !== "2022" ? `user_${year}` : `user`}(
            title,
            first_name,
            last_name,
            email,
            password,
            phone,
            institute,
            department,
            country,
            is_student)
          VALUES(
            '${title}',
            '${firstName}',
            '${lastName}',
            '${email}',
            '${hasher.HashPassword(null)}',
            '${phone}',
            '${institute}',
            '${department}',
            '${country}',
            ${isStudent ? 1 : 0}
          )
          `;
      } else if (nation === "kr") {
        if (year === "2023") {
          sql = `INSERT INTO ${
            year && year !== "2022" ? `user_${year}` : `user`
          }(
            title,
            first_name,
            last_name,
            email,
            password,
            phone,
            institute,
            department,
            country,
            role
            )
          VALUES(
            '${title}',
            '${firstName}',
            '${lastName}',
            '${email}',
            '${hasher.HashPassword(null)}',
            '${phone}',
            '${institute}',
            '${department}',
            '${country}',
            'visitor'
          )
          `;
        } else {
          sql = `INSERT INTO ${
            year && year !== "2022" ? `user_${year}` : `user`
          }(
          title,
          first_name,
          last_name,
          email,
          password,
          phone,
          institute,
          department,
          country,
          participation_type,
          issue_bill
          )
        VALUES(
          '${title}',
          '${firstName}',
          '${lastName}',
          '${email}',
          '${hasher.HashPassword(null)}',
          '${phone}',
          '${institute}',
          '${department}',
          '${country}',
          '${participationType}',
          ${issueBill ? 1 : 0}
        )
        `;
        }
      } else {
        sql = `INSERT INTO ${year && year !== "2022" ? `user_${year}` : `user`}(
          title,
          first_name,
          last_name,
          email,
          password,
          phone,
          institute,
          department,
          country,
          state
          )
        VALUES(
          '${title}',
          '${firstName}',
          '${lastName}',
          '${email}',
          '${hasher.HashPassword(null)}',
          '${phone}',
          '${institute}',
          '${department}',
          '${country}',
          '${state}'
        )
        `;
      }

      const result = await connection.query(sql);

      res.status(200).json({
        success: true,
        id: result[0].insertId,
        message: "Success",
      });

      await connection.commit();
      connection.release();
    } catch (err) {
      connection.release();
      res.status(500).json({
        success: false,
        err,
        message: "Failed",
      });
    }
  },

  // 임시 회원가입 (유럽용)
  tempRegister: async (req, res) => {
    const {
      title,
      firstName,
      lastName,
      email,
      phone,
      institute,
      department,
      country,
      nation,
      isStudent,
      year,
    } = req.body;

    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      let sql;
      sql = `INSERT INTO user_temp(
            title,
            first_name,
            last_name,
            email,
            password,
            phone,
            institute,
            department,
            country,
            is_student,
            year)
          VALUES(
            '${title}',
            '${firstName}',
            '${lastName}',
            '${email}',
            '${hasher.HashPassword(null)}',
            '${phone}',
            '${institute}',
            '${department}',
            '${country}',
            ${isStudent ? 1 : 0},
            '${year}'
          )
          `;

      const result = await connection.query(sql);

      res.status(200).json({
        success: true,
        id: result[0].insertId,
        message: "Success",
      });

      await connection.commit();
      connection.release();
    } catch (err) {
      connection.release();
      res.status(500).json({
        success: false,
        err,
        message: "Failed",
      });
    }
  },

  tempUnregister: async (req, res) => {
    const { nation, email, year } = req.query;

    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      const sql = `DELETE FROM user_temp WHERE email='${email}' AND year='${year}'`;

      await connection.query(sql);

      res.status(200).json({
        success: true,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        err,
      });
    }
  },

  updateAnnouncementCache: async (req, res) => {
    const { nation, year, flag, email } = req.body;
    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      let sql;
      // if (useYearList.indexOf(nation) === -1) {
      //   // useYearList에 없는 경우
      //   if (flag === "cached") {
      //     sql = `UPDATE user SET is_new_announcement=0, is_announcement_cached=1 WHERE email='${email}'`;
      //   } else if (flag === "add") {
      //     sql = `UPDATE user SET is_new_announcement=1, is_announcement_cached=0 WHERE email='${email}'`;
      //   } else if (flag === "delete") {
      //     sql = `UPDATE user SET is_announcement_cached=0 WHERE email='${email}'`;
      //   }
      // } else {
      if (flag === "cached") {
        sql = `UPDATE ${
          year && year !== "2022" ? `user_${year}` : `user`
        } SET is_new_announcement=0, is_announcement_cached=1 WHERE email='${email}'`;
      } else if (flag === "add") {
        sql = `UPDATE ${
          year && year !== "2022" ? `user_${year}` : `user`
        } SET is_new_announcement=1, is_announcement_cached=0 WHERE email='${email}'`;
      } else if (flag === "delete") {
        sql = `UPDATE ${
          year && year !== "2022" ? `user_${year}` : `user`
        } SET is_announcement_cached=0 WHERE email='${email}'`;
      }
      // }
      await connection.query(sql);
      connection.release();

      res.status(200).json({
        success: true,
        result: true,
        msg: "announcement 캐시 업데이트 성공",
      });
    } catch (err) {
      console.log(err);
      connection.release();

      res.status(500).json({
        success: false,
        err,
        message: "announcement 캐시 업데이트 실패",
      });
      return false;
    }
  },

  getDataIsNewAnnoucnement: async (req, res) => {
    const { nation, id } = req.query;
    // console.log(nation, id);

    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);
    try {
      let sql;
      // if (useYearList.indexOf(nation) === -1) {
      //   sql = `SELECT is_new_announcement FROM user WHERE id=${id}`;
      // } else
      sql = `SELECT is_new_announcement FROM ${
        year && year !== "2022" ? `user_${year}` : `user`
      } WHERE id=${id}`;

      const result = await connection.query(sql);
      connection.release();
      console.log(result[0]);
      res.status(200).json({
        success: true,
        result: result[0][0].is_new_announcement,
        msg: "is_new_announcement 데이터 획득",
      });
    } catch (err) {
      console.log(err);
      connection.release();

      res.status(500).json({
        success: false,
        err,
        message: "is_new_announcement 데이터 획득 실패",
      });
      return false;
    }
  },
  unregister: async (req, res) => {
    const { nation, id, year } = req.query;

    const currentPool = getCurrentPool(nation);
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      const sql = `DELETE FROM ${
        year && year !== "2022" ? `user_${year}` : `user`
      } WHERE id=${id}`;

      await connection.query(sql);

      res.status(200).json({
        success: true,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        err,
      });
    }
  },
};

module.exports = usersCtrl;
