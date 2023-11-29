// swaggerDoc.js

const swaggerJSDoc = require("swagger-jsdoc");

let swaggerDefinition = {
  info: {
    // 정보 작성
    title: "Nanoscientific 2022 REST API DOCS",
    version: "1.0.0",
    description: "Documented the REST API for Nanoscientific, a global site.",
    contact: {
      name: "eric , chanhyuk",
      email: "eric.kim@parksystems.com , chanhyuk-tech@kakao.com",
    },
  },
  host: "event.nanoscientific.org", // base-url
  basePath: "/", // base path
};

let options = {
  swaggerDefinition: swaggerDefinition,
  apis: [__dirname + "/../routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
