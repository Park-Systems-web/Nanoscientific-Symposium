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

app.use("/api/page/asia", require("./routes/asiaRouter"));
app.use("/api/page/kr", require("./routes/koreaRouter"));
app.use("/api/page/eu", require("./routes/europeRouter"));
app.use("/api/page/us", require("./routes/usRouter"));
app.use("/api/page/jp", require("./routes/japanRouter"));
app.use("/api/page/common", require("./routes/commonRouter"));
app.use("/api/users", require("./routes/usersRouter"));
app.use("/api/admin", require("./routes/adminRouter"));
app.use("/api/menu", require("./routes/menuRouter"));
app.use("/api/mail", require("./routes/mailRouter"));
app.use("/api/zoom", require("./routes/zoomRouter"));
app.use("/api/announcement", require("./routes/announcementRouter"));
app.use("/api/abstract", require("./routes/abstractRouter"));
app.use("/api/configuration", require("./routes/configurationRouter"));
app.use("/api/ondemand", require("./routes/onDemandRouter"));
// 추가


app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(require("./config/swaggerDoc"))
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
