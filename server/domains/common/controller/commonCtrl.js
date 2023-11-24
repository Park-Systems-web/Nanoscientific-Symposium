const e = require("express");
const path = require("path");
const service = require("../service/commonService")
const {handleHttpErrorResponse} = require("../../../common/tools/handlers/errorHandler");


//HTML file loaders
const commonCtrl = {
    getEventLanding: async (req, res) => {
        res.sendFile(path.join(__dirname, "..", "public/common/landing.html"));
    },

    getExhibitParkSystems: async (req, res) => {
        res.sendFile(
            path.join(__dirname, "..", "public/common/exhibitParkSystems.html")
        );
    },

    getNanoScientific: async (req, res) => {
        res.sendFile(
            path.join(__dirname, "..", "public/common/exhibitNanoScientific.html")
        );
    },
    getMaintenance: async (req, res) => {
        res.sendFile(path.join(__dirname, "..", "public/common/maintenance.html"));
    },
    getSponsors: async (req, res) => {
        const {nation} = req.query;
        res.sendFile(path.join(__dirname, "..", `public/${nation}/sponsors.html`));
    },

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    getPrograms: async (req, res) => {
        const {nation, year} = req.query;
        try {
            const result = await service.findPrograms(nation, year);
            res.send(result[0]);
        } catch (err) {
            await handleHttpErrorResponse(res, err);
        }
    },
    getAgenda: async (req, res) => {
        const {nation, year} = req.query;

        try {
            const result = await service.findAgendas(nation, year);
            res.status(200).json(
                {
                    success: 1,
                    data: result[0]
                }
            );
        } catch (err) {
            await handleHttpErrorResponse(res, err);
        }
    },
    getSessions: async (req, res) => {
        const {nation, year, language} = req.query;
        try {
            const result = await service.findSessions(nation, year, language);
            console.log(result);
            res.send(result[0]);
        } catch (err) {
            await handleHttpErrorResponse(res, err);
        }
    },
    getSpeakers: async (req, res) => {
        const {nation, year} = req.query;
        try {
            const result = await service.findSpeakers(nation, year);
            res.send(result[0]);
        } catch (err) {
            await handleHttpErrorResponse(res, err);
        }
    },
    getSpeakersAbstract: async (req, res) => {
        const {nation, year} = req.query;
        try {
            const result = await service.findSpeakersAbstract(nation, year);
            res.send(result[0]);
        } catch (err) {
            await handleHttpErrorResponse(res, err);
        }
    },

    updateSpeakerList: async (req, res) => {
        const requestBody = req.body;
        try {
            await service.updateSpeakerList(requestBody);
            res.status(200).json({
                success: true,
            });
        } catch (err) {
            await handleHttpErrorResponse(res, err);
        }
    },
    ////from here to start
    getPosters: async (req, res) => {
        const {nation, year} = req.query;

        try {
            const result = await service.findPosters(nation, year);
            res.send(result[0]);
        } catch (err) {
            await handleHttpErrorResponse(res, err);
        }
    },
    // poster add
    addPoster: async (req, res) => {
        const requestBody = req.body;

        try {

            await service.createPosters(requestBody);

            res.status(200).json({
                success: true,
            });
        } catch (err) {
            await handleHttpErrorResponse(res, err);
        }
    },

    deletePoster: async (req, res) => {
        const {nation, id} = req.query;

        try {
            await service.deletePoster(nation, id);
            res.status(200).json({
                success: true,
            });
        } catch (err) {
            await handleHttpErrorResponse(res, err);
        }
    },


    updatePosterList: async (req, res) => {
        const requestBody = req.body;

        try {
            await service.updatePosters(requestBody);
            res.status(200).json({
                success: true,
            });
        } catch (err) {
            await handleHttpErrorResponse(res, err);
        }
    },
    ////for here to test
    getKeynoteSpeakers: async (req, res) => {
        const {nation, year} = req.query;
        try {
            const result = await service.findKeynoteSpeakers(nation, year);
            res.send(result[0]);
        } catch (err) {
            await handleHttpErrorResponse(res, err);
        }
    },
    getSpeakerDetailById: async (req, res) => {
        const {nation, id} = req.query;

        try {

            const result = await service.findSpeakerDetailById(nation, id);

            if (result[0].length === 0) {
                res.status(200).json({
                    success: true,
                    result: {...result[0][0]},
                });
            } else {
                res.status(200).json({
                    success: true,
                    result: {
                        ...result[0][0],
                    },
                });
            }
        } catch (err) {
            await handleHttpErrorResponse(res, err);
        }
    },

//for here to test
    getBanner: async (req, res) => {
        const {nation, year, path} = req.query;
        console.log(path)
        console.log(path)
        try {
            const result = await service.findBanner(nation, year, path);

            if (result[0].length === 0) {
                res.status(404).json({
                    success: false,
                    msg: "no banner",
                });
            } else {
                res.status(200).json({
                    success: true,
                    result: result[0][0].banner_path,
                });
            }
        } catch (err) {
            await handleHttpErrorResponse(res, err);
        }
    },


    setBanner: async (req, res) => {
        const requestBody = req.body;
        try {
            await service.updateBanner(requestBody);

            res.status(200).json({
                success: true,
            });
        } catch (err) {
            await handleHttpErrorResponse(res, err);
        }
    },
    getLandingSectionList: async (req, res) => {
        const {nation, year, language} = req.query;
        try {

            const row = await service.findLandingSectionList(nation, year, language);
            res.status(200).json({
                success: true,
                result: row[0],
            });
        } catch (err) {
            await handleHttpErrorResponse(res, err);
        }
    },

    setLandingSectionList: async (req, res) => {
        const requestBody = req.body;

        try {
            await service.updateLandingSectionList(requestBody);
            res.status(200).json({
                success: true,
            });
        } catch (err) {
            await handleHttpErrorResponse(res, err);
        }
    },
    setLandingTitle: async (req, res) => {
        const requestBody = req.body;
        const {id} = req.params;

        try {
            await service.updateLandingTitle(requestBody,id);
            res.status(200).json({
                success: true,
            });
        } catch (err) {
            await handleHttpErrorResponse(res, err);
        }
    },

    getLandingBanner: async (req, res) => {
        const {nation, year, language} = req.query;


        try {

            const row = await service.findLandingBanner(nation, year, language);

            res.status(200).json({
                success: true,
                result: row[0],
            });
        } catch (err) {
            await handleHttpErrorResponse(res, err);
        }
    },
    //쿼리 수정 필요
    setLandingBanner: async (req, res) => {
        const requestBody = req.body;

        try {

            await service.updateLandingBanner(requestBody);

            res.status(200).json({
                success: true,
            });
        } catch (err) {
            await handleHttpErrorResponse(res, err);
        }
    },
    getLandingContent: async (req, res) => {
        const {nation, year, language} = req.query;
        const {id} = req.params;
        try {

            const row = await service.findLandingContent(nation, year, language, id);

            res.status(200).json({
                success: true,
                result: row[0],
            });
        } catch (err) {
            await handleHttpErrorResponse(res, err);
        }
    },
    //there is nowhere getting argument "year" in this API 그래서 고쳤는데 프론트도 수정 필요
    //but it is not used.
    getLanding2Content: async (req, res) => {
        const {nation, language, year} = req.query;
        try {

            const row = await service.findLanding2Content(nation, language);

            res.status(200).json({
                success: true,
                result: row[0],
            });
        } catch (err) {
            await handleHttpErrorResponse(res, err);
        }
    },
    setLanding2Content: async (req, res) => {
        const requestBody = req.body;

        try {
            await service.updateLanding2Content(requestBody)
            res.status(200).json({
                success: true,
            });
        } catch (err) {
            await handleHttpErrorResponse(res, err);
        }
    },
    getLanding3Content: async (req, res) => {
        const {nation, language, year} = req.query;
        try {

            const row = await service.findLanding3Content(nation, language, year);
            res.status(200).json({
                success: true,
                result: row[0],
            });
        } catch (err) {
            await handleHttpErrorResponse(res, err);
        }
    },
    setLanding3Content: async (req, res) => {
        const requestBody = req.body;

        try {
            await service.updateLanding3Content(requestBody);
            res.status(200).json({
                success: true,
            });
        } catch (err) {
            await handleHttpErrorResponse(res, err);
        }
    },
    getLanding6Content: async (req, res) => {
        const {nation, language, year} = req.query;

        try {

            const row = await service.findLanding6Content(nation, language, year);

            res.status(200).json({
                success: true,
                result: row[0],
            });
        } catch (err) {
            await handleHttpErrorResponse(res, err);
        }
    },
    setLanding6Content: async (req, res) => {
        const requestBody = req.body;

        try {
            await service.updateLanding6Content(requestBody);
            res.status(200).json({
                success: true,
            });
        } catch (err) {
            await handleHttpErrorResponse(res, err);
        }
    },
    setLanding6Button: async (req, res) => {
        const requestBody = req.body;

        try {

            await service.updateLanding6Button(requestBody);

            res.status(200).json({
                success: true,
            });
        } catch (err) {
            await handleHttpErrorResponse(res, err);
        }
    },
    setLanding4Content: async (req, res) => {
        const requestBody = req.body;
        try {
            await service.createLanding4Content(requestBody);

            res.status(200).json({
                success: true,
            });
        } catch (err) {
            await handleHttpErrorResponse(res, err);
        }
    },
    modifyLanding4Content: async (req, res) => {
        const requestBody = req.body;
        try {

            await service.updateLanding4Content(requestBody);
            res.status(200).json({
                success: true,
            });
        } catch (err) {
            await handleHttpErrorResponse(res, err);
        }
    },
    deleteLanding4Content: async (req, res) => {
        const {nation, id} = req.query;
        try {
            await service.deleteLanding4Content(nation, id);
            res.status(200).json({
                success: true,
            });
        } catch (err) {
            await handleHttpErrorResponse(res, err);
        }
    },

    //test from here
    addSponsor: async (req, res) => {
        const requestBody = req.body;
        try {
            await service.createSponsor(requestBody);
            res.status(200).json({
                success: true,
            });
        } catch (err) {
            await handleHttpErrorResponse(res, err);
        }
    },
    modifySponsor: async (req, res) => {
        const requestBody = req.body;
        try {

            await service.updateSponsor(requestBody);

            res.status(200).json({
                success: true,
            });
        } catch (err) {
            await handleHttpErrorResponse(res, err);
        }
    },
    deleteSponsor: async (req, res) => {
        const {nation, id, sectionNo} = req.query;
        try {
            await service.deleteSponsor(nation, id, sectionNo);

            res.status(200).json({
                success: true,
            });
        } catch (err) {
            await handleHttpErrorResponse(res, err);
        }
    },

    getAbstractDesc: async (req, res) => {
        const {nation, year} = req.query;
        try {
            const row = await service.findAbstractDesc(nation, year);
            res.status(200).json({
                success: true,
                result: row[0],
            });
        } catch (err) {
            await handleHttpErrorResponse(res, err);
        }
    },
    setAbstractDesc: async (req, res) => {
        const requestBody = req.body;

        try {

            await service.updateAbstractDesc(requestBody);
            res.status(200).json({
                success: true,
            });
        } catch (err) {
            await handleHttpErrorResponse(res, err);
        }
    },

    getEditorContent: async (req, res) => {
        const {nation, tableName, year} = req.query;
        try {

            const row = await service.findEditorContent(nation, tableName, year);

            res.status(200).json({
                success: true,
                result: row[0][0].description,
            });
        } catch (err) {
            await handleHttpErrorResponse(res, err);
        }
    },
    updateEditorContent: async (req, res) => {
        const requestBody = req.body;
        try {
            await service.updateEditorContent(requestBody);
            res.status(200).json({
                success: true,
            });
        } catch (err) {
            await handleHttpErrorResponse(res, err);
        }
    },
};

module.exports = commonCtrl;
