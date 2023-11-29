const configService = require("../service/configurationService");
const {handleHttpErrorResponse} = require("../../../common/tools/handlers/errorHandler");

const configurationCtrl = {
  getConfig: async (req, res) => {
    const { nation } = req.query;

    try {

      const result = await configService.findConfig(nation);
      res.status(200).json({
        success: true,
        result: result[0][0],
      });
    }  catch (err) {
      await handleHttpErrorResponse(res, err);
    }
  },

  setConfig: async (req, res) => {
    const requestBody = req.body;

    try {

      await configService.updateConfig(requestBody);
      res.status(200).json({
        success: true,
        message: "config 저장 성공",
      });
    }  catch (err) {
      await handleHttpErrorResponse(res, err);
    }
  },
};
module.exports = configurationCtrl;
