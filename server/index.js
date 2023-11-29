require("dotenv").config();
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const cookies = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookies());

// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static('client/build'))
//     app.get('*',(req,res)=>{
//         res.sendFile(path.join(__dirname,'client','build','index.html'))
//     })
// }

app.use("/api/page/asia", require("./domains/countries/route/asiaRouter"));
app.use("/api/page/kr", require("./domains/countries/route/koreaRouter"));
app.use("/api/page/eu", require("./domains/countries/route/europeRouter"));
app.use("/api/page/us", require("./domains/countries/route/usRouter"));
app.use("/api/page/jp", require("./domains/countries/route/japanRouter"));
app.use("/api/page/common", require("./domains/common/route/commonRouter"));
app.use("/api/users", require("./domains/users/usersRouter"));
app.use("/api/admin", require("./domains/admin/route/adminRouter"));
app.use("/api/menu", require("./domains/menu/route/menuRouter"));
app.use("/api/mail", require("./domains/mail/route/mailRouter"));
app.use("/api/zoom", require("./domains/zoom/zoomRouter"));
app.use("/api/announcement", require("./domains/announcement/route/announcementRouter"));
app.use("/api/abstract", require("./domains/abstact/route/abstractRouter"));
app.use("/api/configuration", require("./domains/configuration/route/configurationRouter"));
app.use("/api/ondemand", require("./domains/onDemand/route/onDemandRouter"));
// 추가


app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(require("./common/config/swaggerDoc"))
);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
