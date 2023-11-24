const service = require("../service/announcementService")
const {handleHttpErrorResponse} = require("../../../common/tools/handlers/errorHandler");


const announcementReadCtrl = {
    //controller의 실제 역할과 이름이 맞지 않음
    getPostByUserID: async (req, res) => {
        const {nation, id, year} = req.query;
        try {
            const {
                announcementReadData,
                announcementData,
                readDataLen,
                dataLen,
                result,
                unread
            } = await service.findPostByUserId(nation, id, year);
            // console.log("result: "+result);
            // console.log("unread: "+unread);
            if (
                // 읽을 것도 있으며 읽은 기록이 있는 경우
                readDataLen !== 0 && dataLen !== 0
            ) {
                res.status(200).json({
                    success: true,
                    result: result,
                    unread: unread,
                    msg: "성공",
                });
            } else if (readDataLen === 0 && dataLen !== 0) {
                // 읽을 것은 있지만 읽은 데이터가 없는 경우
                res.status(200).json({
                    success: true,
                    result: result,
                    unread: unread,
                    msg: "읽을 것은 있지만 읽은 데이터가 없는 경우",
                });
            } else if (dataLen === 0) {
                // 읽을 것과 읽은 데이터 모두 없는 경우
                res.status(200).json({
                    success: true,
                    result: result,
                    unread: unread,
                    msg: "annoucementRead 혹은 annoucement의 데이터가 존재하지 않습니다.",
                });
            }
        } catch (err) {
            // Handle the error and specify a custom error code and message
            await handleHttpErrorResponse(res, err);
        }
    },

    addReadPostInfo: async (req, res) => {
        const requestBody = req.body;
        try {
            await service.createPostInfo(requestBody);
            res.status(200).json({
                success: true,
                msg: "성공",
            });
        } catch (err) {
            // Handle the error and specify a custom error code and message
            await handleHttpErrorResponse(res, err);
        }
    },
    deleteReadPostInfo: async (req, res) => {
        const {nation, announcementId, year} = req.query;
        try {

            await service.deleteReadPostInfo(nation, announcementId, year);
            res.status(200).json({
                success: true,
                msg: "성공",
            });
        } catch (err) {
            // Handle the error and specify a custom error code and message
            await handleHttpErrorResponse(res, err);
        }
    },
};

module.exports = announcementReadCtrl;
