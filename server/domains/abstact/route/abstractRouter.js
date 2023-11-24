const abstractCtrl = require("../controller/abstractCtrl");
const router = require("express").Router();

// /api/abstract
router
  .route("/")
  .get(abstractCtrl.getAbstract)
  .post(abstractCtrl.postAbstract);

module.exports = router;
