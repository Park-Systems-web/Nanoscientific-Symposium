const jwt = require("jsonwebtoken");

module.exports = {
  // 난수 인증번호 생성
  create: (email) => {
    let code = Math.floor(Math.random() * 1000000);
    code = code < 100000 ? "0" + code : "" + code;
    return [
      code,
      jwt.sign({ email, code }, process.env.JWT_SECRET, {
        expiresIn: "3m",
      }),
    ];
  },

  check: (code, token) => {
    let result = false;
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (decoded.code === code) result = true;
    });

    return result;
  },
};
