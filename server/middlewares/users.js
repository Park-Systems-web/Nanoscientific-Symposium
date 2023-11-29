const { getCurrentPool } = require("../common/utils/getCurrentPool");
const {
  verifyToken,
  issueAccessToken,
  issueRefreshToken,
  issueAccessTokenByYear,
  issueRefreshTokenByYear,
  compareRefreshToken,
} = require("../common/utils/jwt");

// 유저 검증 연도별로 할지, 관계없이 할지 여부
const useYearList = ["eu"];

module.exports = {
  checkToken: async (req, res, next) => {
    if (
      getCurrentPool(req.body.nation) === "" ||
      getCurrentPool(req.body.nation) === "home"
    ) {
      res.status(200).json({
        success: false,
        message: "no pool selected. (root)",
      });
      return;
    }

    const accessToken = verifyToken(req.body.accessToken);
    const refreshToken = verifyToken(req.cookies.refreshToken);

    if (accessToken === null) {
      if (refreshToken === null) {
        // case 1: 둘다 만료 -> 로그아웃
        res
          .status(200)
          .json({ success: false, code: "T40", message: "token is expired" });
      } else {
        // case 2: access 만료, refresh 살아있음 -> access 재발급
        let newAccessToken = issueAccessToken(refreshToken.email);
        // 다음 미들웨어에서 접근하기 위한 전역 변수로 지정
        res.locals.accessToken = newAccessToken;
        next();
      }
    } else {
      if (refreshToken === null) {
        // case 3: access 살아있음, refresh 만료 -> refresh 재발급
        let newRefreshToken = issueRefreshToken(accessToken.email);
        res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
        });
        next();
      } else {
        // case 4: 둘다 존재한다면, refresh token을 db와 비교.
        res.locals.accessToken = req.body.accessToken;
        next();
      }
    }
  },

  readUser: async (req, res, next) => {
    const accessToken = verifyToken(res.locals.accessToken);
    const currentPool = getCurrentPool(req.body.nation);
    const year = req.body.year;
    const connection = await currentPool.getConnection(async (conn) => conn);

    try {
      let sql;
      // if (useYearList.indexOf(req.body.nation) === -1) {
      //   // useYearList에 없는 경우
      //   sql = `SELECT
      //   id,
      //   email,
      //   role,
      //   is_password_set,
      //   is_new_announcement,
      //   is_announcement_cached
      //   FROM user
      //   WHERE email="${accessToken.email}"
      //   AND refresh_token="${req.cookies.refreshToken}";`;
      // } else {
      sql = `SELECT
      id,
      email,
      role,
      is_password_set,
      is_new_announcement,
      is_announcement_cached
      FROM ${year && year !== "2022" ? `user_${year}` : `user`}
      WHERE email="${accessToken.email}"
      AND refresh_token="${req.cookies.refreshToken}"`;
      // }

      const result = await connection.query(sql);
      if (result[0].length === 0) {
        // refresh token에 해당하는 유저가 없을 때
        res.status(200).json({
          success: false,
          code: "T41",
          message: "Logged in from another browser.",
        });
        return;
      } else {
        res.locals.id = result[0][0].id;
        res.locals.email = accessToken.email;
        res.locals.role = result[0][0].role;
        res.locals.nation = req.body.nation;
        res.locals.is_password_set = result[0][0].is_password_set;
        res.locals.is_new_announcement = result[0][0].is_new_announcement;
        res.locals.is_announcement_cached = result[0][0].is_announcement_cached;
      }
      connection.release();
      next();
    } catch (err) {
      connection.release();
      res.status(500).json({
        success: false,
        code: "S0",
        err,
      });
    }
  },
};
