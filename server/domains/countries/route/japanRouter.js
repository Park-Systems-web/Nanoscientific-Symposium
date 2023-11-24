const japanCtrl = require("../controller/japanCtrl");
const router = require("express").Router();


// 모달의 번역때문에 일본은 따로 쓴다
router.route("/exhibit/parksystems").get(japanCtrl.getExhibitParkSystems);
// data


module.exports = router;
