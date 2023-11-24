const {handleHttpErrorResponse} = require("../../../common/tools/handlers/errorHandler");
const service = require("../service/menuService");

const menuCtrl = {
    getMenuList: async (req, res) => {
        const {nation, year, language} = req.query;

        try {

            const row = await service.findMenuList(nation, year, language);

            if (row[0].length !== 0) {
                res.status(200).json({
                    success: true,
                    result: row[0],
                    msg: "성공",
                });
            } else {
                res.status(404).json({
                    success: true,
                    msg: "해당 path가 없음",
                });
            }
        } catch (err) {
            await handleHttpErrorResponse(res, err);
        }
    },
    updateMenuList: async (req, res) => {
        const requestBody = req.body;

        try {
            await service.updateMenuList(requestBody);
            res.status(200).json({
                success: true,
                msg: "성공",
            });
        } catch (err) {
            await handleHttpErrorResponse(res, err);
        }
    },
    getIsAdmin: async (req, res) => {
        const requestBody = req.body;
        try {

            const row = await service.findIsAdmin(requestBody);

            if (row[0].length !== 0) {
                res.status(200).json({
                    success: true,
                    result: row[0][0].is_published,
                    msg: "성공",
                });
            } else {
                res.status(200).json({
                    success: true,
                    msg: "해당 path가 없음",
                });
            }
        } catch (err) {
            await handleHttpErrorResponse(res, err);
        }
    },
    setIsAdmin: async (req, res) => {
        const requestBody = req.body;

        try {
            const sql =

            await service.updateIsAdmin(requestBody);

            res.status(200).json({
                success: true,
                msg: "성공",
            });
        } catch (err) {
            await handleHttpErrorResponse(res, err);
        }
    },
};
module.exports = menuCtrl;
