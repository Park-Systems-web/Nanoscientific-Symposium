const service = require('../service/announcementService')
const { handleHttpErrorResponse } = require("../../../common/tools/handlers/errorHandler")


const announcementCtrl = {
  getPostAllListLength: async (req, res) => {
    const { nation, year } = req.query;
    try {

      const row = await service.findPostAllListLength(nation,year);

      if (row[0].length !== 0) {
        res.status(200).json({
          success: true,
          result: row[0].length,
          msg: "성공",
        });
      } else {
        res.status(404).json({
          success: true,
          result: [],
          msg: "해당 데이터가 없음",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        msg: err,
      });
    }
  },
  getPostList: async (req, res) => {
    const { nation, page, year } = req.query;
    try {

      const row = await service.findPostList(nation, page, year);

        res.status(200).json({
          success: true,
          result: row[0],
          totalCount: row[0][0].total_count,
          msg: "성공",})

    } catch (err) {
      await handleHttpErrorResponse(res, err);
    }
  },
  getPostById: async (req, res) => {
    const { nation, id, admin, year } = req.query;
    try {

      const row = await service.findPostById(nation, id, admin, year);

      res.status(200).json({
          success: true,
          result: row[0][0],
          msg: "성공",
        });

    } catch (err) {

      await handleHttpErrorResponse(res, err);
    }
  },
  //
  addPost: async (req, res) => {
    const requestBody = req.body;

    try {

      const row = await service.createPost(requestBody);

      res.status(201).json({
        success: true,
        msg: "성공",
        result: row
      });
    } catch (err) {

      await handleHttpErrorResponse(err);

    }
  },


  deletePost: async (req, res) => {
    const { nation, id, year } = req.query;
    try {

      await service.deletePost(nation, id, year);
      res.status(200).json({
        success: true,
        msg: "삭제 성공",
      });
    }  catch (err) {

      await handleHttpErrorResponse(err);

    }
  },
};

// 유저 id에 대한 annoucement만 가져와야하는 작업

module.exports = announcementCtrl;
