const path = require("path");
const  service = require("../service/adminService")
const { handleHttpErrorResponse } = require("../../../common/tools/handlers/errorHandler");

const adminCtrl = {

    //Session//
    ///////////////////////////////////////
    addSession: async (req, res) => {
        const requestBody = req.body;


        ///*!* there's something doubtful: when posting a session, it is not mapped with program

        try {

            const result = await service.createSession(requestBody, res);

            res.status(201).json({
                success: true,
                message: "new session has been created",
                result: result
            });
        } catch (error) {
            console.log(error)
            await handleHttpErrorResponse(res, error);
        }
    },

    modifySession: async (req, res) => {
        const requestBody = req.body;

        try {

            const result = await service.updateSession(requestBody, res);

            res.status(200).json({
                success: true,
                message: "the session has been updated",
                result: result
            });
        } catch (error) {
            console.log(error)
            await handleHttpErrorResponse(res, error);
        }
    },


    deleteSession: async (req, res) => {
        const nation = req.query.nation;
        const id = req.params.id;

        try {

            const {programResult, sessionResult, deletedProgram} = await service.deleteSession(nation, id, res);


            const affectedRows = deletedProgram;

            console.log(affectedRows)

            res.status(200).json({
                success: true,
                message: `1개의 세션 삭제, ${affectedRows}개의 프로그램 삭제`,
            });
        } catch (error) {
            console.log(error)
            await handleHttpErrorResponse(res, error);
        }
    },
    ///////////////////////////////////////
    ///////////////////////////////////////

    //Program//
    ///////////////////////////////////////
    addProgram: async (req, res) => {
        const requestBody = req.body;

        try {


            const sqlResult = await service.createProgram(requestBody, res);
            // console.log(sqlResult[0]);

            res.status(201).json({
                success: true,
                message: "Success",
                result: sqlResult
            });
        } catch (err) {
            // Handle the error and specify a custom error code and message
            await handleHttpErrorResponse(res, err);
        }

    },

    modifyProgram: async (req, res) => {
        const requestBody = req.body;

        try {

            const result = await service.updateProgram(requestBody, res)
            res.status(200).json({
                success: true,
                message: "Success",

            });
        } catch (err) {
            // Handle the error and specify a custom error code and message
            await handleHttpErrorResponse(res, err);
        }
    },

    deleteProgram: async (req, res) => {
        const nation = req.query.nation;
        const id = req.params.id;

        try {

            const result = await service.deleteProgram(id, nation, res);

            res.status(200).json({
                success: true,
                message: `id:${id} 프로그램 삭제 성공`,
            });
        } catch (err) {
            // Handle the error and specify a custom error code and message
            await handleHttpErrorResponse(res, err);
        }
    },

    ///////////////////////////////////////
    ///////////////////////////////////////
    // Agenda
    ///////////////////////////////////////
    addAgenda: async (req, res) => {
        const requestBody = req.body;

        try {

            const result = await service.createAgenda(requestBody, res);
            res.status(201).json({
                success: true,
                message: "Success",
            });
        } catch (err) {
            // Handle the error and specify a custom error code and message
            await handleHttpErrorResponse(res, err);
        }
    },

    modifyAgenda: async (req, res) => {
        const requestBody = req.body;

        try {

            const result = await service.updateAgenda(requestBody, res);
            res.status(200).json({
                success: true,
                message: "Success",
            });
        } catch (err) {
            // Handle the error and specify a custom error code and message
            await handleHttpErrorResponse(res, err);
        }
    },

    deleteAgenda: async (req, res) => {
        const {nation} = req.query;
        const id = req.params.id;

        try {

            const deleteResult = await service.deleteAgenda(nation, id, res);

            res.status(200).json({
                success: true,
                message: `id:${id} 프로그램 삭제`,
                result: deleteResult
            });
        } catch (err) {
            // Handle the error and specify a custom error code and message
            await handleHttpErrorResponse(res, err);
        }
    },


    ///코드 검토 요망 Reorder된 리스트를 리스폰스해야 하는 것 아닌지..
    reorderAgendaList: async (req, res) => {
        const requestBody = req.body;


        try {
            const agendaList = await service.reorderAgendaList(requestBody, res);
            res.status(200).json({
                success: true,
                agendaList,
            });
        } catch (err) {
            // Handle the error and specify a custom error code and message
            await handleHttpErrorResponse(res, err);
        }
    },

    getHideProgram: async (req, res) => {
        const {nation, year} = req.query;


        try {
            const result = await service.findHiddenProgram(nation, year, res);

            res.send(result);
        } catch (err) {
            // Handle the error and specify a custom error code and message
            await handleHttpErrorResponse(res, err);
        }
    },

    getHideSession: async (req, res) => {
        const {nation, year} = req.query;

        try {
            const result = await service.findHiddenSession(nation, year, res);

            res.status(200).json({
                success: true,
                result: result,
            });
        } catch (err) {
            // Handle the error and specify a custom error code and message
            await handleHttpErrorResponse(res, err);
        }
    },


    showProgram: async (req, res) => {
        const requestBody = req.body;

        try {
            const result = await service.openProgram(requestBody, res);
            res.status(200).json({
                success: true,
                result: result,
            });
        } catch (err) {
            // Handle the error and specify a custom error code and message
            await handleHttpErrorResponse(res, err);
        }
    },

    showSession: async (req, res) => {
        const requestBody = req.body;

        try {
            const result = await service.openSession(requestBody, res);
            res.status(200).json({
                success: true,
                message: "Success",
            });

        } catch (err) {
            // Handle the error and specify a custom error code and message
            await handleHttpErrorResponse(res, err);
        }
    },


    addSpeaker: async (req, res) => {
        const requestBody = req.body;


        try {

            const result = await service.createSpeaker(requestBody, res);

            res.status(201).json({
                success: true,
                message: "Success",
            });
        } catch (err) {
            // Handle the error and specify a custom error code and message
            await handleHttpErrorResponse(res, err);
        }
    },


    modifySpeaker: async (req, res) => {
        const requestBody = req.body;

        try {
            const result = await service.updateSpeaker(requestBody, res);

            res.status(200).json({
                success: true,
                message: "Success",
                result: result
            });
        } catch (err) {
            // Handle the error and specify a custom error code and message
            await handleHttpErrorResponse(res, err);
        }
    },

    deleteSpeaker: async (req, res) => {
        const nation = req.query.nation;
        const id = req.params.id;

        try {

            await service.deleteSpeaker(nation, id, res);
            res.status(200).json({
                success: true,
                message: "연사 삭제 완료",
            });
        } catch (err) {
            // Handle the error and specify a custom error code and message
            await handleHttpErrorResponse(res, err);
        }
    },

    showSpeaker: async (req, res) => {
        const requestBody = req.body;
        try {
            await service.openSpeakers(requestBody, res)
            res.status(200).json({
                success: true,
                message: "Success",
            });
        } catch (err) {
            // Handle the error and specify a custom error code and message
            await handleHttpErrorResponse(res, err);
        }
    },

    getHideSpeaker: async (req, res) => {
        const {nation, year} = req.query;

        try {

            const result = await service.findHiddenSpeaker(nation, year);
            res.send(result);
        } catch (err) {
            // Handle the error and specify a custom error code and message
            await handleHttpErrorResponse(res, err);
        }
    },

    getUsers: async (req, res) => {
        const {nation, year} = req.query;

        try {

            const result = await service.findUsers(nation, year);
            res.send(result);

        } catch (err) {
            // Handle the error and specify a custom error code and message
            await handleHttpErrorResponse(res, err);
        }
    },
    // api/admin/users/role
    updateRole: async (req, res) => {
        const requestBody = req.body;

        try {

            await service.updateUser(requestBody, res);
            res.status(200).json({
                success: true,
                msg: "변경 성공",
            });
        } catch (err) {
            // Handle the error and specify a custom error code and message
            await handleHttpErrorResponse(res, err);
        }
    },
};

module.exports = adminCtrl;
