const axios = require("axios");
const jwt = require("jsonwebtoken");

module.exports = {
  verifyToken: (token) => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      // if (e.name === "JsonWebTokenError") return undefined;
      // else return null;
      return null;
    }
  },
  issueAccessToken: (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });
  },
  issueRefreshToken: (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "14d",
    });
  },

  issueZoomToken: (apiKey, apiSecret) => {
    const payload = {
      iss: apiKey,
      exp: new Date().getTime() + 5000,
    };
    return jwt.sign(payload, apiSecret);
  },
  checkZoomTokenExpired: async (email, token) => {
    if (token === null) {
      // 1. 토큰 존재 x
      return true;
    } else if (jwt.decode(token).exp <= Math.floor(Date.now() / 1000)) {
      // 2. 토큰 존재, 기간 만료
      return true;
    } else {
      // 3. 토큰 존재, 기간 만료 x
      try {
        await axios.get(`https://api.zoom.us/v2/users/${email}/webinars`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return false;
      } catch (err) {
        // 4. 다른 곳에서 재발급되어 invalid
        return true;
      }
    }
  },
  issueZoomTokenOAuth: async (accountID, cId, cSecret) => {
    const res = await axios.post(
      `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${accountID}`,
      {},
      {
        auth: {
          username: cId,
          password: cSecret,
        },
      }
    );
    return res.data.access_token;
  },
};
