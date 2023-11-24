const {getCurrentPool} = require("../../../common/utils/getCurrentPool");
const sqlGenerator = require("../repository/announcementQueries")
const {validateData} = require("../../../common/tools/validators/dataTypeValidator");
const {postPostDto, postReadPostDto} = require("../dto/announcementDto");


const announcementService = {

    findPostAllListLength: async (nation, year) => {

        const currentPool = getCurrentPool(nation);
        const connection = await currentPool.getConnection(async (conn) => conn);

        try {
            const sql = sqlGenerator.getPostAllListLengthQuery(year);
            const result = connection.query(sql);

            return result;
        } catch (err) {

            console.log(err);
            throw err;

        } finally {
            connection.release();
        }

    },
    findPostList: async (nation, page, year) => {

        const currentPool = getCurrentPool(nation);
        const postPerPage = 5;

        const connection = await currentPool.getConnection(async (conn) => conn);
        const sql = sqlGenerator.getPostListQuery(year, page, postPerPage);

        try {
            const result = await connection.query(sql);

            if (result[0].length !== 0) {
                return result;
            } else {
                throw new Error("no data found");
            }
        } catch (err) {

            console.log(err);
            throw err;

        } finally {
            connection.release();
        }

    },
    findPostById: async (nation, id, admin, year) => {
        const currentPool = getCurrentPool(nation);
        const connection = await currentPool.getConnection(async (conn) => conn);

        const sql = sqlGenerator.getPostByIdQuery(id, year, admin);
        try {

            const row = await connection.query(sql);

            //뷰 카운트 올려주는 로직: 아이피에 대한 중복검사를 하고 있지 않아 조회수 어뷰징의 위험이 있음
            // 어뷰징 방지 로직 추가 요망
            if (row[0].length !== 0 && admin == 0) {
                const sqlForViews = sqlGenerator.increaseViewQuery(row, id, year);
                await connection.query(sqlForViews);
            } else if (row[0].length == 0) {
                throw new Error("no data found");
            }
            return row;
        } catch (err) {

            console.log(err);
            throw err;

        } finally {
            connection.release();
        }
    },
    createPost: async (requestBody) => {
        const currentPool = getCurrentPool(requestBody.nation);

        const connection = await currentPool.getConnection(async (conn) => conn);

        if (!validateData(postPostDto, requestBody)) {
            throw new Error("invalid Data: please check the data again");
        }

        try {
            const sql = sqlGenerator.postPostQuery(requestBody);
            const result = await connection.query(sql);
            return result[0];
        } catch (err) {

            console.log(err);
            throw err;

        } finally {
            connection.release();
        }
    },

    deletePost: async (nation, id, year) => {
        const currentPool = getCurrentPool(nation);

        const connection = await currentPool.getConnection(async (conn) => conn);

        const sql = sqlGenerator.deletePostQuery(id, year);
        try {

            //삭제하기전 해당 데이터가 있는지 조회 후 없으면 404에러 코드 전송하는 것이 바람직해 보임 
            await connection.query(sql);

        } catch (err) {

            console.log(err);
            throw err;

        } finally {
            connection.release();
        }
    },

    findPostByUserId: async (nation, id, year) => {
        const currentPool = getCurrentPool(nation);
        const connection = await currentPool.getConnection(async (conn) => conn);

        const annoucementReadSQL = sqlGenerator.findAnnouncementReadQuery(id, year);
        const annoucementSQL = sqlGenerator.findAnnouncementReadDataQuery(year);
        try {
            const announcementReadData = await connection.query(annoucementReadSQL);
            const announcementData = await connection.query(annoucementSQL);
            const readDataLen = announcementReadData[0].length;
            const dataLen = announcementData[0].length;

            let result;
            let unread;
            if (
                // 읽을 것도 있으며 읽은 기록이 있는 경우
                readDataLen !== 0 &&
                dataLen !== 0
            ) {
                result = announcementData[0].filter((el) =>
                    announcementReadData[0]
                        .map((rEl) => rEl.announcement_id)
                        .includes(el.id)
                ).length === dataLen;
                unread = announcementData[0].filter(
                    (el) =>
                        !announcementReadData[0]
                            .map((rEl) => rEl.announcement_id)
                            .includes(el.id)
                )
                    .map((el) => el.id)
            } else if (readDataLen === 0 && dataLen !== 0) {
                result = false;
                unread = announcementData[0].map((el) => el.id);
            } else if (dataLen === 0) {
                result = false;
                unread = announcementData[0].map((el) => el.id);
            }

            // console.log("readDataLen: "+readDataLen);
            // console.log("dataLen: "+dataLen);
            // console.log("result: "+result);
            // console.log("unread: "+unread);


            return {announcementReadData, announcementData, readDataLen, dataLen, result, unread};
        } catch (err) {

            console.log(err);
            throw err;

        } finally {
            connection.release();
        }

    },

    createPostInfo: async (requestBody) =>{
        const currentPool = getCurrentPool(requestBody.nation);
        const connection = await currentPool.getConnection(async (conn) => conn);

        if (!validateData(postReadPostDto, requestBody)) {
            throw new Error("invalid Data: please check the data again");
        }

        const sql = sqlGenerator.postPostInfoQuery(requestBody);
        await connection.query(sql);
    },
    deleteReadPostInfo: async (nation, announcementId, year) =>{
        const currentPool = getCurrentPool(nation);
        const connection = await currentPool.getConnection(async (conn) => conn);
        const sql = sqlGenerator.deleteReadPostInfoQuery(announcementId, year);

        try {
            await connection.query(sql);
        } catch (err) {

            console.log(err);
            throw err;

        } finally {
            connection.release();
        }
    }
}

module.exports = announcementService;