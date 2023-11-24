const announcementCtrl = require("../controller/announcementCtrl");
const announcementReadCtrl = require("../controller/announcementReadCtrl");
const router = require("express").Router();

router
  .route("/readlist")
  .get(announcementReadCtrl.getPostByUserID)
  .post(announcementReadCtrl.addReadPostInfo)
  .delete(announcementReadCtrl.deleteReadPostInfo);

router.route("/list").get(announcementCtrl.getPostList);
router.route("/originlist").get(announcementCtrl.getPostAllListLength);
router
  .route("/post")
  .get(announcementCtrl.getPostById)
  .post(announcementCtrl.addPost)
  .delete(announcementCtrl.deletePost);

module.exports = router;
