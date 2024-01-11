const fs = require("fs");

const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);
const mysql = require("mysql2/promise");

const runningEnv = process.env.NODE_ENV || "development";
// const PORT = runningEnv === "production" ? conf.port : "3308";
const PORT = "3306";

const commonPool = mysql.createPool({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: PORT,
  database: "common",
  connectionLimit: 30,
  enableKeepAlive: true,
  waitForConnections: true,
  queueLimit: 0,
});

const asiaPool = mysql.createPool({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: PORT,
  database: "asia",
  connectionLimit: 30,
  enableKeepAlive: true,
  waitForConnections: true,
  queueLimit: 0,
});

const koreaPool = mysql.createPool({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: PORT,
  database: "korea",
  connectionLimit: 30,
  enableKeepAlive: true,
  waitForConnections: true,
  queueLimit: 0,
});
const japanPool = mysql.createPool({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: PORT,
  database: "japan",
  connectionLimit: 30,
  enableKeepAlive: true,
  waitForConnections: true,
  queueLimit: 0,
});
const usPool = mysql.createPool({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: PORT,
  database: "us",
  connectionLimit: 30,
  enableKeepAlive: true,
  waitForConnections: true,
  queueLimit: 0,
});
const europePool = mysql.createPool({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: PORT,
  database: "europe",
  connectionLimit: 30,
  enableKeepAlive: true,
  waitForConnections: true,
  queueLimit: 0,
});
const chinaPool = mysql.createPool({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: PORT,
  database: "china",
  connectionLimit: 30,
  enableKeepAlive: true,
  waitForConnections: true,
  queueLimit: 0,
});

module.exports.commonPool = commonPool;
module.exports.asiaPool = asiaPool;
module.exports.koreaPool = koreaPool;
module.exports.japanPool = japanPool;
module.exports.usPool = usPool;
module.exports.europePool = europePool;
module.exports.chinaPool = chinaPool;
