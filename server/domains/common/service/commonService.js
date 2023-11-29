const {getCurrentPool} = require("../../../common/utils/getCurrentPool");
const sqlGenerator = require("../repository/commonQueries");
const {validateData} = require("../../../common/tools/validators/dataTypeValidator");

const {
    patchEditorContentDto,
    patchAbstractDesc,
    patchSponsorDto,
    postSponsorDto,
    patchLanding4ContentDto,
    postLanding4ContentDto,
    patchLanding6ButtonDto,
    patchLandingContentDto,
    patchLandingBanner,
    patchLandingTitleDto,
    patchLandingSectionListDto,
    patchBannerDto,
    patchPosterListDto,
    postPosterDto,
    patchSpeakerListDto
} = require("../dto/commonDto");
const {objectToDtoMapper} = require("../../../common/tools/mapper/objectToDto");

const commonService = {
    findPrograms: async (nation, year) => {

        const currentPool = getCurrentPool(nation);
        const connection = await currentPool.getConnection(async (conn) => conn);

        const sql = sqlGenerator.findProgramsSQL(year);
        try {
            const result = connection.query(sql)
            return result;
        } catch (err) {

            console.log(err);
            throw err;

        } finally {
            connection.release();
        }
    },
    findAgendas: async (nation, year) => {
        const currentPool = getCurrentPool(nation);
        const connection = await currentPool.getConnection(async (conn) => conn);
        try {
            const sql = sqlGenerator.findAgendasSQL(year);
            const result = await connection.query(sql);
            return result;

        } catch (err) {

            console.log(err);
            throw err;

        } finally {
            connection.release();
        }
    },
    findSessions: async (nation, year, language) => {
        const currentPool = getCurrentPool(nation);
        const connection = await currentPool.getConnection(async (conn) => conn);

        try {
            const sql = sqlGenerator.findSessionsSQL(year);
            const result = await connection.query(sql);
            console.log(result);
            console.log(result[0]);
            return result;

        } catch (err) {

            console.log(err);
            throw err;

        } finally {
            connection.release();
        }
    },
    findSpeakers: async (nation, year) => {
        const currentPool = getCurrentPool(nation);
        const connection = await currentPool.getConnection(async (conn) => conn);
        const sql = sqlGenerator.findSpeakersSQL(year);
        try {
            const result = await connection.query(sql);
            return result;
        } catch (err) {

            console.log(err);
            throw err;

        } finally {
            connection.release();
        }
    },
    findSpeakersAbstract: async (nation, year) => {
        const currentPool = getCurrentPool(nation);
        const connection = await currentPool.getConnection(async (conn) => conn);
        const sql = sqlGenerator.findSpeakersAbstractSQL(year);
        try {
            const result = await connection.query(sql)
            return result;
        } catch (err) {

            console.log(err);
            throw err;
        } finally {
            connection.release()
        }
    },
    updateSpeakerList: async (requestBody) => {
        const currentPool = getCurrentPool(requestBody.nation);
        const connection = await currentPool.getConnection(async (conn) => conn);

        const dto = objectToDtoMapper(patchSpeakerListDto,requestBody);
        const {list,abstractlist} = dto;



        if (!validateData(patchSpeakerListDto, dto)) {
            throw new Error("invalid Data: please check the data again");
        }

        try {

            while (list.length > 0) {
                const listElement = list.shift();
                const sql = sqlGenerator.updateSpeakerListSql(listElement);
                await connection.query(sql);
            }
            while (abstractlist.length > 0) {
                const abstractlistElement = abstractlist.shift();
                const sql = sqlGenerator.updateSpeakerAbstractListSql(abstractlistElement);
                await connection.query(sql);
            }
        } catch (err) {

            console.log(err);
            throw err;

        } finally {
            connection.release();
        }
    },
    ////
    findPosters: async (nation, year) => {

        const currentPool = getCurrentPool(nation);
        const connection = await currentPool.getConnection(async (conn) => conn);
        const sql = sqlGenerator.findPostersSql(year);
        try {
            const result = await connection.query(sql)
            return result;
        } catch (err) {

            console.log(err);
            throw err;
        } finally {
            connection.release()
        }
    },
    createPosters: async (requestBody) => {
        const currentPool = getCurrentPool(requestBody.nation);
        const connection = await currentPool.getConnection(async (conn) => conn);
        const dto = objectToDtoMapper(postPosterDto,requestBody);
        const sql = sqlGenerator.createPostersSQL(dto);


        if (!validateData(postPosterDto,dto)) {
            throw new Error("invalid Data: please check the data again");
        }

        try {
            const result = await connection.query(sql)
            return result;
        } catch (err) {

            console.log(err);
            throw err;
        } finally {
            connection.release()
        }
    },
    deletePoster: async (nation, id) => {
        const currentPool = getCurrentPool(nation);
        const connection = await currentPool.getConnection(async (conn) => conn);

        const sql = sqlGenerator.deletePosterSQL(id)
        try {
            await connection.query(sql)

        } catch (err) {

            console.log(err);
            throw err;
        } finally {
            connection.release()
        }
    },
    updatePosters: async (requestBody) => {
        const currentPool = getCurrentPool(requestBody.nation);
        const connection = await currentPool.getConnection(async (conn) => conn);

        const dto = objectToDtoMapper(patchPosterListDto,requestBody);

        if (!validateData(patchPosterListDto,dto)) {
            throw new Error("invalid Data: please check the data again");
        }

        try {
            while (dto.list.length > 0) {
                const listElements =
                    dto.list.shift();
                const sql = sqlGenerator.updatePostersSQL(listElements);
                    await connection.query(sql);
            }


        } catch (err) {

            console.log(err);
            throw err;
        } finally {
            connection.release()
        }

    },
    findKeynoteSpeakers: async (nation, year) => {
        const currentPool = getCurrentPool(nation);
        const connection = await currentPool.getConnection(async (conn) => conn);

        const sql = sqlGenerator.findKeynoteSpeakersSql(year);
        try {
            const result = await connection.query(sql)
            return result;
        } catch (err) {

            console.log(err);
            throw err;
        } finally {
            connection.release()
        }
    },
    findSpeakerDetailById: async (nation, id) => {
        const currentPool = getCurrentPool(nation);
        const connection = await currentPool.getConnection(async (conn) => conn);

        const sql = sqlGenerator.findSpeakerDetailByIdSql(nation, id)
        try {
            const result = await connection.query(sql)
            return result;
        } catch (err) {

            console.log(err);
            throw err;
        } finally {
            connection.release()
        }
    },
    findBanner: async (nation, year, path) => {
        const currentPool = getCurrentPool(nation);
        if (!currentPool) {
            throw new Error("no data found");
        }
        const connection = await currentPool.getConnection(async (conn) => conn);
        console.log(path)
        console.log(nation)
        const sql = sqlGenerator.findBannerSql(year, path);
        console.log(path)
        console.log(sql)
        try {
            const result = await connection.query(sql)
            return result;
        } catch (err) {

            console.log(err);
            throw err;
        } finally {
            connection.release()
        }

    },
    updateBanner: async (requestBody) => {

        const currentPool = getCurrentPool(requestBody.nation);
        const connection = await currentPool.getConnection(async (conn) => conn);

        const dto = objectToDtoMapper(patchBannerDto,requestBody);
        if (!validateData(patchBannerDto,dto)) {
            throw new Error("invalid Data: please check the data again");
        }
        const sql = sqlGenerator.updateBannerSql(dto);
        try {
            await connection.query(sql)
        } catch (err) {

            console.log(err);
            throw err;
        } finally {
            connection.release()
        }
    },
    findLandingSectionList: async (nation, year, language) => {
        const currentPool = getCurrentPool(nation);
        const connection = await currentPool.getConnection(async (conn) => conn);

        const sql = sqlGenerator.findLandingSectionListSql(nation, year,language);
        try {
            const result = await connection.query(sql)
            return result;
        } catch (err) {

            console.log(err);
            throw err;
        } finally {
            connection.release()
        }
    },
    updateLandingSectionList: async (requestBody) => {
        const currentPool = getCurrentPool(requestBody.nation);
        const connection = await currentPool.getConnection(async (conn) => conn);

        const dto = objectToDtoMapper(patchLandingSectionListDto,requestBody);

        if (!validateData(patchLandingSectionListDto,dto)) {
            throw new Error("invalid Data: please check the data again");
        }

        try {

            for (let landing of dto.landingSectionList) {
                const sql = sqlGenerator.updateLandingSectionListSql(landing);

                await connection.query(sql);
            }
        } catch (err) {

            console.log(err);
            throw err;
        } finally {
            connection.release()
        }
    },
    updateLandingTitle: async (requestBody,id) => {
        const currentPool = getCurrentPool(requestBody.nation);
        const connection = await currentPool.getConnection(async (conn) => conn);

        const dto = objectToDtoMapper(patchLandingTitleDto,requestBody);

        if (!validateData(patchLandingTitleDto,dto)) {
            throw new Error("invalid Data: please check the data again");
        }
        //dto 검증에만 사용/ 실제적으로는 미적용
        const sql = sqlGenerator.updateLandingTitleSql(requestBody,id);
        try {
            await connection.query(sql);
        } catch (err) {

            console.log(err);
            throw err;
        } finally {
            connection.release()
        }
    },
    findLandingBanner: async (nation, year, language) => {
        const currentPool = getCurrentPool(nation);
        const connection = await currentPool.getConnection(async (conn) => conn);
        const langSfx = language === "china" ? "" : "_en";
        const sql = sqlGenerator.findLandingBannerSql(nation, year, language);
        try {
            const result = await connection.query(sql)
            return result;
        } catch (err) {

            console.log(err);
            throw err;
        } finally {
            connection.release()
        }

    },
    updateLandingBanner: async (requestBody) => {
        const currentPool = getCurrentPool(requestBody.nation);
        const connection = await currentPool.getConnection(async (conn) => conn);
        const langSfx = requestBody.language === "china" ? "" : "_en";
        const sql = sqlGenerator.updateLandingBannerSql(requestBody, langSfx);

        const dto = objectToDtoMapper(patchLandingBanner,requestBody);

        if (!validateData(dto, requestBody)) {
            throw new Error("invalid Data: please check the data again");
        }
        try {
            const result = await connection.query(sql)
            return result;
        } catch (err) {

            console.log(err);
            throw err;
        } finally {
            connection.release()
        }
    },
    findLandingContent: async (nation, year, language, id) => {
        const currentPool = getCurrentPool(nation);
        const connection = await currentPool.getConnection(async (conn) => conn);

        const sql = sqlGenerator.findLandingContentSql(nation, year, language, id);
        try {
            const result = await connection.query(sql)
            return result;
        } catch (err) {

            console.log(err);
            throw err;
        } finally {
            connection.release()
        }
    },
    findLanding2Content: async (nation, language, year) => {
        const currentPool = getCurrentPool(nation);
        const connection = await currentPool.getConnection(async (conn) => conn);
        const sql = sqlGenerator.findLandingContent2Sql(year, language);
        try {
            const result = await connection.query(sql)
            return result;
        } catch (err) {

            console.log(err);
            throw err;
        } finally {
            connection.release()
        }
    },
    updateLanding2Content: async (requestBody) => {
        const currentPool = getCurrentPool(requestBody.nation);
        const connection = await currentPool.getConnection(async (conn) => conn);

        const sql1 = sqlGenerator.updateLanding2ContentSql(requestBody);
        const sql2 = sqlGenerator.updateLanding2ContentSql2(requestBody);

        const dto = objectToDtoMapper(patchLandingContentDto,requestBody);

        if (!validateData(dto, requestBody)) {
            throw new Error("invalid Data: please check the data again");
        }
        try {
            await connection.query(sql1);
            await connection.query(sql2);
        } catch (err) {

            console.log(err);
            throw err;
        } finally {
            connection.release()
        }
    },
    findLanding3Content: async (nation, language, year) => {
        const currentPool = getCurrentPool(nation);
        const connection = await currentPool.getConnection(async (conn) => conn);
        const sql = sqlGenerator.findLanding3ContentSql(nation, language, year);

        try {
            const result = await connection.query(sql)
            return result;
        } catch (err) {

            console.log(err);
            throw err;
        } finally {
            connection.release()
        }
    },
    updateLanding3Content: async (requestBody) => {
        const currentPool = getCurrentPool(requestBody.nation);
        const connection = await currentPool.getConnection(async (conn) => conn);

        const sql = sqlGenerator.updateLanding3ContentSql(requestBody);
        const sql2 = sqlGenerator.updateLanding3ContentSql2(requestBody);

        const dto = objectToDtoMapper(patchLandingContentDto,requestBody);

        if (!validateData(dto, requestBody)) {
            throw new Error("invalid Data: please check the data again");
        }
        try {
            await connection.query(sql)
            await connection.query(sql2);
        } catch (err) {

            console.log(err);
            throw err;
        } finally {
            connection.release()
        }
    },
    findLanding6Content: async (nation, language, year) => {
        const currentPool = getCurrentPool(nation);
        const connection = await currentPool.getConnection(async (conn) => conn);
        const langSfx = language === "china" ? "" : "_en";
        const sql = sqlGenerator.findLanding6ContentSql(nation, langSfx, year);
        try {
            const result = await connection.query(sql)
            return result;
        } catch (err) {

            console.log(err);
            throw err;
        } finally {
            connection.release()
        }
    },
    updateLanding6Content: async (requestBody) => {
        const currentPool = getCurrentPool(requestBody.nation);
        const connection = await currentPool.getConnection(async (conn) => conn);
        const langSfx = requestBody.language === "china" ? "" : "_en";
        const sql = sqlGenerator.updateLanding6ContentSql(requestBody, langSfx);

        const dto = objectToDtoMapper(patchLandingContentDto,requestBody);
        if (!validateData(dto, requestBody)) {
            throw new Error("invalid Data: please check the data again");
        }

        try {
            await connection.query(sql);
        } catch (err) {

            console.log(err);
            throw err;
        } finally {
            connection.release()
        }
    },
    updateLanding6Button: async (requestBody) => {
        const currentPool = getCurrentPool(requestBody.nation);
        const connection = await currentPool.getConnection(async (conn) => conn);
        const langSfx = requestBody.language === "china" ? "" : "_en";

        const dto = objectToDtoMapper(patchLanding6ButtonDto,requestBody);

        if (!validateData(dto, requestBody)) {
            throw new Error("invalid Data: please check the data again");
        }
        const sql = sqlGenerator.updateLanding6ButtonSql(requestBody, langSfx);
        try {
            await connection.query(sql);

        } catch (err) {

            console.log(err);
            throw err;
        } finally {
            connection.release()
        }
    },
    createLanding4Content: async (requestBody) => {
        const currentPool = getCurrentPool(requestBody.nation);
        const connection = await currentPool.getConnection(async (conn) => conn);

        const sql = sqlGenerator.createLanding4ContentSql(requestBody);

        const dto = objectToDtoMapper(postLanding4ContentDto,requestBody);

        if (!validateData(dto, requestBody)) {
            throw new Error("invalid Data: please check the data again");
        }
        try {
            await connection.query(sql);
        } catch (err) {

            console.log(err);
            throw err;
        } finally {
            connection.release()
        }
    },
    updateLanding4Content: async (requestBody) => {
        const currentPool = getCurrentPool(requestBody.nation);
        const connection = await currentPool.getConnection(async (conn) => conn);

        const sql = sqlGenerator.updateLanding4ContentSql(requestBody);
        const dto = objectToDtoMapper(patchLanding4ContentDto,requestBody);

        if (!validateData(dto, requestBody)) {
            throw new Error("invalid Data: please check the data again");
        }
        try {
            await connection.query(sql)
        } catch (err) {

            console.log(err);
            throw err;
        } finally {
            connection.release()
        }
    },
    deleteLanding4Content: async (nation, id) => {
        const currentPool = getCurrentPool(nation);
        const connection = await currentPool.getConnection(async (conn) => conn);
        const sql = sqlGenerator.deleteLanding4ContentSql(id);

        try {
            await connection.query(sql);
        } catch (err) {

            console.log(err);
            throw err;
        } finally {
            connection.release()
        }
    },
    createSponsor: async (requestBody) => {
        const currentPool = getCurrentPool(requestBody.nation);
        const connection = await currentPool.getConnection(async (conn) => conn);

        const dto = objectToDtoMapper(postSponsorDto,requestBody);

        if (!validateData(dto, requestBody)) {
            throw new Error("invalid Data: please check the data again");
        }
        const sql = sqlGenerator.createSponsorSql(requestBody);
        try {
            await connection.query(sql)
        } catch (err) {

            console.log(err);
            throw err;
        } finally {
            connection.release()
        }

    },
    updateSponsor: async (requestBody) => {
        const currentPool = getCurrentPool(requestBody.nation);
        const connection = await currentPool.getConnection(async (conn) => conn);
        const sql = sqlGenerator.updateSponsorSql(requestBody);
        const dto = objectToDtoMapper(patchSponsorDto,requestBody);

        if (!validateData(dto, requestBody)) {
            throw new Error("invalid Data: please check the data again");
        }
        try {
            await connection.query(sql)

        } catch (err) {

            console.log(err);
            throw err;
        } finally {
            connection.release()
        }
    },
    deleteSponsor: async (nation, id, sectionNo) => {
        const currentPool = getCurrentPool(nation);
        const connection = await currentPool.getConnection(async (conn) => conn);

        const sql = sqlGenerator.deleteSponsorSql(sectionNo, id);

        try {
            await connection.query(sql)

        } catch (err) {

            console.log(err);
            throw err;
        } finally {
            connection.release()
        }
    },
    findAbstractDesc: async (nation, year) => {
        const currentPool = getCurrentPool(nation);
        const connection = await currentPool.getConnection(async (conn) => conn);

        const sql = sqlGenerator.findAbstractDescSql(year);
        try {
            const result = await connection.query(sql)
            return result;
        } catch (err) {

            console.log(err);
            throw err;
        } finally {
            connection.release()
        }
    },
    updateAbstractDesc: async (requestBody) => {
        const currentPool = getCurrentPool(requestBody.nation);
        const connection = await currentPool.getConnection(async (conn) => conn);

        const dto = objectToDtoMapper(patchAbstractDesc,requestBody);

        if (!validateData(dto, requestBody)) {
            throw new Error("invalid Data: please check the data again");
        }

        const sql = sqlGenerator.updateAbstractDescSql(requestBody)
        try {
            await connection.query(sql);
        } catch (err) {

            console.log(err);
            throw err;
        } finally {
            connection.release()
        }
    },
    findEditorContent: async (nation, tableName, year) => {
        const currentPool = getCurrentPool(nation);
        const connection = await currentPool.getConnection(async (conn) => conn);

        const sql = sqlGenerator.findEditorContentSql(tableName, year);

        try {
            const result = await connection.query(sql)
            return result;
        } catch (err) {

            console.log(err);
            throw err;
        } finally {
            connection.release()
        }
    },
    updateEditorContent: async (requestBody) => {
        const currentPool = getCurrentPool(requestBody.nation);
        const connection = await currentPool.getConnection(async (conn) => conn);
        const dto = objectToDtoMapper(patchEditorContentDto,requestBody);
        const sql = sqlGenerator.updateEditorContentSql(requestBody);


        if (!validateData(dto, requestBody)) {
            throw new Error("invalid Data: please check the data again");
        }
        try {
            await connection.query(sql)

        } catch (err) {

            console.log(err);
            throw err;
        } finally {
            connection.release()
        }
    },
}
module.exports = commonService;