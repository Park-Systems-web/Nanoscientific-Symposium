
const service  = require("../service/abstractService");
const {handleHttpErrorResponse} = require("../../../common/tools/handlers/errorHandler");

const abstractCtrl = {

//GET
  getAbstract: async (req, res) => {

    const {nation, year} = req.query;
    try {
      // Call the findAbstract function from the abstractService module
      const result = await service.findAbstract(nation, year);

      // You can now work with the 'result' here
      res.status(200).json({
            success: true,
            result: result
          },
      );

    } catch (err) {
      await handleHttpErrorResponse(err);
    }
  },

  //Post
  postAbstract: async (req, res) => {

    const requestBody = req.body;

    console.log('post Abstract controller');
    try {
      // Call the findAbstract function from the abstractService module
      const result = await service.createAbstract(requestBody, res);

      console.log(result);

      res.status(201).json({
        success: true,
        message: "New abstract is created!",
        result
      });

    } catch (err) {
      // Handle the error and specify a custom error code and message
      await handleHttpErrorResponse(err);
    }


  }
}
module.exports = abstractCtrl;
