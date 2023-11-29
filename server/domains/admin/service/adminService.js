const  queryGenerator = require("../repository/adminQueries")
const {getCurrentPool} = require("../../../common/utils/getCurrentPool");
const {validateData} = require("../../../common/tools/validators/dataTypeValidator");
const {openSpeakerDto,patchSpeakerDto,postSpeakerDto,openProgramDto,reorderAgendaListDto, patchProgramDto, patchAgendaDto,postAgendaDto, postSessionDto,patchSessionDto,postProgramDto,
    patchUserRoleDto
} = require("../dto/adminDto")


module.exports = {
    createSession: async (requestBody, res) => {

        const nation = requestBody.nation;
        const currentPool = getCurrentPool(nation);
        const connection = await currentPool.getConnection(async (conn) => conn);
        // const langSfx = language === "china" ? "" : "_en";


        if (!validateData(postSessionDto, requestBody)) {
            throw new Error("invalid Data: please check the data again");
        }

        const sql = queryGenerator.postSessionQuery(requestBody);

        try {
            const result = await connection.query(sql);

            return result;
        } catch (err){

            console.log(err);
            throw err;

        } finally {
            connection.release();
        }
    },

    updateSession: async (requestBody, res) => {

        const nation = requestBody.nation;
        const currentPool = getCurrentPool(nation);
        const connection = await currentPool.getConnection(async (conn) => conn);


        if (!validateData(patchSessionDto, requestBody)) {
            throw new Error("invalid Data: please check the data again");
        }

        const sql = queryGenerator.patchSessionQuery(requestBody);
        try {
            const result = await connection.query(sql);

            return result;
        } catch (err){

            console.log(err);
            throw err;

        } finally {
            connection.release();
        }
    },

    deleteSession: async (nation, id, res) => {
        const currentPool = getCurrentPool(nation);
        const connection = await currentPool.getConnection(async (conn) => conn);

        try {


            const {sqlForDeleteProgram,sqlForDeleteSession} = queryGenerator.deleteSessionQuery(id);
            const programResult = await connection.query(sqlForDeleteProgram);
            const sessionResult = await connection.query(sqlForDeleteSession);

            const pFinalResult = programResult[0];
            const sFinalResult = sessionResult[0];

            const deletedProgram = pFinalResult.affectedRows;



            if (sFinalResult.affectedRows === 0) {
                throw new Error("no data found");

            }

            return {pFinalResult, sFinalResult,deletedProgram}

        } catch (err){

            console.log(err);
            throw err;

        } finally {
            connection.release();
        }
    },

    findHiddenSession: async ( nation, year,res) => {
        const currentPool = getCurrentPool(nation);
        const connection = await currentPool.getConnection(async (conn) => conn);

        try {
            const sql = queryGenerator.getHiddenSessionQuery(year);
            const result = await connection.query(sql);
            return result[0];
        } catch (err){
            await connection.rollback();
            console.log(err);
            throw err;

        } finally {
            connection.release();
        }
    },

    openSession: async (requestBody,res) => {

        const currentPool = getCurrentPool(requestBody.nation);
        const connection = await currentPool.getConnection(async (conn) => conn);


        const sessions = requestBody.sessions;

        try {
            sessions.map(async (session) => {
                const sql = queryGenerator.openSessionQuery(session);
                await connection.query(sql);
            });
        } catch (err){
            await connection.rollback();
            console.log(err);
            throw err;

        } finally {
            connection.release();
        }
    },


    // CRUD for Program

    createProgram: async (requestBody,res) => {
        const currentPool = getCurrentPool(requestBody.nation);
        const connection = await currentPool.getConnection(async (conn) => conn);



        if (!validateData(postProgramDto, requestBody)) {
            throw new Error("invalid Data: please check the data again");
        }

        try {
            let sql = queryGenerator.postProgramQuery(requestBody);
            const postResult = await connection.query(sql);

            let reOrderSql = queryGenerator.reOrderProgramQuery(requestBody,postResult);
            const finalResult = await connection.query(reOrderSql);

            return finalResult;
        } catch (err) {

            console.log(err);
            throw err;

        } finally {
            connection.release();
        }
    },

    updateProgram: async (requestBody,res) => {
        const currentPool = getCurrentPool(requestBody.nation);
        const connection = await currentPool.getConnection(async (conn) => conn);


        if (!validateData(patchProgramDto, requestBody)) {
            throw new Error("invalid Data: please check the data again");
        }


        try {
            let sql = queryGenerator.patchProgramQuery(requestBody);
            const result = connection.query(sql);
            return result;
        } catch (err) {

            console.log(err);
            throw err;

        } finally {
            connection.release();
        }
    },

    deleteProgram: async (id,nation,res) => {
        const currentPool = getCurrentPool(nation);
        const connection = await currentPool.getConnection(async (conn) => conn);

        try {

            const sqlForFindProgram = queryGenerator.findProgramQuery(id);
            const selectResult = await connection.query(sqlForFindProgram);
            const nextId = selectResult[0][0].next_id;


            const sqlDeleteProgram = queryGenerator.deleteProgramQuery(id);
            const deleteProgramResult = await connection.query(sqlDeleteProgram);

            const sqlDeleteProgramAgenda = queryGenerator.deleteProgramAgendaQuery(id)
            const deleteProgramAgendaResult = await connection.query(sqlDeleteProgramAgenda);

            const sqlReorderProgram = queryGenerator.reOrderProgramAftDeleteQuery(nextId, id)
            const finalResult = await connection.query(sqlReorderProgram);

            return finalResult;

        } catch (err){

            console.log(err);
            throw err;

        } finally {
            connection.release();
        }
    },


    findHiddenProgram: async (nation, year,res) => {

        const currentPool = getCurrentPool(nation);
        const connection = await currentPool.getConnection(async (conn) => conn);
        try {

            const sql = queryGenerator.getHiddenProgramQuery(year);
            const result = await connection.query(sql);
            return result[0];
        } catch (err){

            console.log(err);
            throw err;

        } finally {
            connection.release();
        }
    },

    openProgram: async (requestBody, res) => {

        const currentPool = getCurrentPool(requestBody.nation);
        const connection = await currentPool.getConnection(async (conn) => conn);

        if (!validateData(openProgramDto, requestBody)) {
            throw new Error("invalid Data: please check the data again");
        }

        const programs = requestBody.programs
        try {
            programs.map(async (program) => {
                const sql = queryGenerator.openProgramQuery(program);
                await connection.query(sql);
            })
        } catch (err){

            console.log(err);
            throw err;

        } finally {
            connection.release();
        }
    },


    // CRUD for Agenda

    createAgenda: async (requestBody,res) => {
        const currentPool = getCurrentPool(requestBody.nation);
        const connection = await currentPool.getConnection(async (conn) => conn);


        if (!validateData(postAgendaDto, requestBody)) {
            throw new Error("invalid Data: please check the data again");
        }

        try {

            const sql = queryGenerator.createAgendaQuery(requestBody);
            const sqlResult = await connection.query(sql);

            const programId = requestBody.program_id;

            const sqlForOrder = queryGenerator.reOrderProgramAgendaQuery(sqlResult,programId);
            const finalResult = await connection.query(sqlForOrder);
            return finalResult;

        } catch (err){

            console.log(err);
            throw err;

        } finally {
            connection.release();
        }

    },

    updateAgenda: async (requestBody,res) => {


        const currentPool = getCurrentPool(requestBody.nation);
        const connection = await currentPool.getConnection(async (conn) => conn);


        if (!validateData(patchAgendaDto, requestBody)) {
            throw new Error("invalid Data: please check the data again");
        }

        try {
            const sql = queryGenerator.patchAgendaQuery(requestBody);
            const result = connection.query(sql);

            return result;
        } catch (err){

            console.log(err);
            throw err;

        } finally {
            connection.release();
        }

    },

    reorderAgendaList: async (requestBody,res) => {

        const currentPool = getCurrentPool(requestBody.nation);
        const connection = await currentPool.getConnection(async (conn) => conn);

        if (!validateData(reorderAgendaListDto, requestBody)) {
            throw new Error("invalid Data: please check the data again");
        }
        const agendaList = requestBody.agendaList
        try {
            for (const agenda of agendaList) {
                const sql = queryGenerator.reorderAgendaListQuery(agenda);
                await connection.query(sql);
            }
            return agendaList; //순서가 변경된 리스트를 쿼리로 찾아서 리스폰스되어야 하는게 아닌가 의문이 듭니다.
        } catch (err){

            console.log(err);
            throw err;

        } finally {
            connection.release();
        }

    },

    deleteAgenda: async (nation,id,res) => {

        const currentPool = getCurrentPool(nation);
        const connection = await currentPool.getConnection(async (conn) => conn);

        try {
            const {selectProgramAgenda,deleteProgramAgenda} =deleteAgendaQuery(id);
            const selectResult = await connection.query(selectProgramAgenda);
            const deleteResult = await connection.query(deleteProgramAgenda);

            const nextId = selectResult[0][0].next_id;
            const updateProgramAgendaSql = queryGenerator.reOrderProgramAgendaQuery2(id,nextId);
            const updateResult = await connection.query(updateProgramAgendaSql);
            return deleteResult;
        } catch (err){

            console.log(err);
            throw err;

        } finally {
            connection.release();
        }
    },

    // CRUD for Speaker

    createSpeaker: async (requestBody,res) => {

        const currentPool = getCurrentPool(requestBody.nation);
        const connection = await currentPool.getConnection(async (conn) => conn);

        if (!validateData(postSpeakerDto, requestBody)) {
            throw new Error("invalid Data: please check the data again");
        }

        try {
            const postSqlForSpeakers = queryGenerator.postSpeakerQuery(requestBody);
            const postResult = await connection.query(postSqlForSpeakers);

            //has_abstract 을 가지고 검증하는 부분이 없는것이 의문
            const postSqlForSpeakerAbstract = queryGenerator.postSpeakerAbstractQuery(requestBody,postResult);
            const postResult2 = await connection.query(postSqlForSpeakerAbstract);

            return postResult;
        } catch (err){

            console.log(err);
            throw err;

        } finally {
            connection.release();
        }
    },

    updateSpeaker: async (requestBody,res) => {

        const currentPool = getCurrentPool(requestBody.nation);
        const connection = await currentPool.getConnection(async (conn) => conn);

        if (!validateData(patchSpeakerDto, requestBody)) {
            throw new Error("invalid Data: please check the data again");
        }
        try {

            const sqlForPatchSpeakers = queryGenerator.patchSpeakerQuery(requestBody);
            const patchResult = await connection.query(sqlForPatchSpeakers);
            const sqlForPostSpeakerAbstract = queryGenerator.postSpeakerAbstractQuery2(requestBody);
            const postPSResult = await connection.query(sqlForPostSpeakerAbstract); //매핑되어있는 speaker_abstract 객체를 찾아서 바꿔야 하는 것이 아닌지 의문

            return patchResult;
        } catch (err){

            console.log(err);
            throw err;

        } finally {
            connection.release();
        }

    },

    reOrderSpeaker: async (requestBody,res) => {},

    deleteSpeaker: async (nation,id,res) => {

        const currentPool = getCurrentPool(nation);
        const connection = await currentPool.getConnection(async (conn) => conn);

        try {
            const sqlForDeleteSpeaker = queryGenerator.deleteSpeakerQuery(id);
            await connection.query(sqlForDeleteSpeaker);

            const sqlForDeleteSpeakerAbstract = queryGenerator.deleteSpeakerAbstractQuery(id)
            await connection.query(sqlForDeleteSpeakerAbstract);

        } catch (err){

            console.log(err);
            throw err;

        } finally {
            connection.release();
        }
    },

    findHiddenSpeaker: async (nation,year) => {
        const currentPool = getCurrentPool(nation);
        const connection = await currentPool.getConnection(async (conn) => conn);


        try {
            const sql = queryGenerator.getHiddenSpeakerQuery(year);
            const result = await connection.query(sql);
            return result[0];
        } catch (err){

            console.log(err);
            throw err;

        } finally {
            connection.release();
        }
    },

    openSpeakers: async (requestBody,res) => {

        const currentPool = getCurrentPool(requestBody.nation);
        const connection = await currentPool.getConnection(async (conn) => conn);

        if (!validateData(openSpeakerDto, requestBody)) {
            throw new Error("invalid Data: please check the data again");
        }

        const speakers =requestBody.speakers
        try {

            speakers.map(async (speaker) => {
                const sql = queryGenerator.openSpeakersQuery(speaker)
                await connection.query(sql);
            })
        } catch (err){

            console.log(err);
            throw err;

        } finally {
            connection.release();
        }
    },

    // Managing users

    findUsers: async (nation, year) => {

        const currentPool = getCurrentPool(nation);
        const connection = await currentPool.getConnection(async (conn) => conn);

        try {
            const sql = queryGenerator.getUsersQuery(year);
            const result = await connection.query(sql);
            return result[0];
        } catch (err){

            console.log(err);
            throw err;

        } finally {
            connection.release();
        }
    },

    updateUser: async (requestBody,res) => {

        const currentPool = getCurrentPool(requestBody.nation);
        const connection = await currentPool.getConnection(async (conn) => conn);


        if (!validateData(patchUserRoleDto, requestBody)) {
            throw new Error("invalid Data: please check the data again");
        }
        try {
            const year = requestBody.year;
            const id = requestBody.id;
            const role = requestBody.role;

            const sql = queryGenerator.patchUserRoleQuery(year,id,role);
            await connection.query(sql);
        } catch (err){

            console.log(err);
            throw err;

        } finally {
            connection.release();
        }

    }
};