const service = require("../service/onDemandService");
const {handleHttpErrorResponse} = require("../../../common/tools/handlers/errorHandler");


const onDemandCtrl = {
  getOnDemandList: async (req, res) => {

    const { page, itemPerPage } = req.query;
     try {
      // 현재 페이지에 맞는 결과
      const row = await service.findOnDemandList(page, itemPerPage);
      // 총 item 개수
      const row2 = await service.findOnDemandListCount();

      res.status(200).json({
        result: row[0].map((video) => {
          if (video.application) {
            return { ...video, application: video.application.split(",") };
          }
          return video;
        }),
        totalCount: row2[0][0].count,
        success: true,
      });
    }  catch (err) {
       await handleHttpErrorResponse(res, err);
     }
  },
  getOnDemandAllFilter: async (req, res) => {
   try {
      // 전체 필터 리스트
      const row = await service.findOnDemandAllFilter();
      res.status(200).json({
        result: row[0],
        year: row[0][0].yearFilter.split(","),
        region: row[0][0].regionFilter.split(","),
        language: row[0][0].languageFilter.split(","),
        application: [
          ...new Set(
            row[0][0].applicationFilter.split(",").filter((v) => v !== "")
          ),
        ],
        success: true,
      });
    } catch (err) {
     await handleHttpErrorResponse(res, err);
   }
  },

  getOnDemandPageVideo: async (req, res) => {
    const { page, itemPerPage, year, region, language, application, keyword } =
      req.query;

    try {

      const row = await service.findOnDemandPageVideo(page, itemPerPage, year, region, language, application, keyword);
      const row2 = await service.findOnDemandPageVideoCount(page, itemPerPage, year, region, language, application, keyword);

      const result = row[0].map((arr) => {
        return {
          ...arr,
          application: arr.application ? arr.application.split(",") : [],
        };
      });
      res.status(200).json({
        result,
        totalCount: row2[0][0].count,
        success: true,
      });
    } catch (err) {
      await handleHttpErrorResponse(res, err);
    }
  },

  getOnDemandVideo: async (req, res) => {
    const { id } = req.params;
       try {
      const row = await service.findOnDemandVideo(id);

      res.status(200).json({
        result: row[0],
        success: true,
      });
    }  catch (err) {
         await handleHttpErrorResponse(res, err);
       }
  },

  editOnDemandList: async (req, res) => {
     const requestBody = req.body;

    try {

      const row = await service.updateOnDemandList(requestBody);

      res.status(200).json({
        result: row[0],
        success: true,
      });
    }  catch (err) {
      await handleHttpErrorResponse(res, err);
    }
  },

  deleteOnDemandList: async (req, res) => {

    const { id } = req.query;
    try {

      const row = await service.deleteOnDemandList(id);

      res.status(200).json({
        result: row[0],
        success: true,
      });
    } catch (err) {
      await handleHttpErrorResponse(res, err);
    }
  },
  getOnDemandApplication: async (req, res) => {
     try {

      const row = await service.findOnDemandApplication();
      res.status(200).json({
        result: row[0],
        success: true,
      });
    } catch (err) {
      await handleHttpErrorResponse(res, err);
    }
  },
  deleteOnDemandApplication: async (req, res) => {

     const { id } = req.query;
    try {

      const row = await service.deleteOnDemandApplication(id);
      res.status(200).json({
        result: row[0],
        success: true,
      });
    } catch (err) {
      await handleHttpErrorResponse(res, err);
    }
  },
  editOnDemandApplication: async (req, res) => {

     const requestBody = req.body;
    try {
          const row = await service.createOnDemandApplication(requestBody);
      res.status(200).json({
        result: row[0],
        success: true,
      });
    } catch (err) {
      await handleHttpErrorResponse(res, err);
    }
  },

  getOnDemandApplicationId: async (req, res) => {
     const { application } = req.query;
    try {

      const row = await service.findOnDemandApplicationId(application);
      res.status(200).json({
        result: row[0],
        success: true,
      });
    } catch (err) {
      await handleHttpErrorResponse(res, err);
    }
  },

  //? for what?
  getSearchVideo: async (req, res) => {
    const { query } = req.query;
    console.log(query);
  },
};

module.exports = onDemandCtrl;
