const { getCurrentPool } = require("../../../common/utils/getCurrentPool");
const queryGenerator = require("../repository/configurationQueries")
const {patchConfigDto} = require("../dto/configurationDto");
const {validateData} = require("../../../common/tools/validators/dataTypeValidator");


module.exports = {
    findConfig: async (nation) => {
        const currentPool = getCurrentPool(nation);
        const connection = await currentPool.getConnection(async (conn) => conn);

        const sql = queryGenerator.findConfigSql();
        try {
            const result = await connection.query(sql)
            return result;
        } catch(err){

            console.log(err);
            throw err;
        } finally {
            connection.release()
        }
    },
    updateConfig : async (requestBody) => {
        const currentPool = getCurrentPool(requestBody.nation);
        const connection = await currentPool.getConnection(async (conn) => conn);

        if (!validateData(patchConfigDto, requestBody)) {
            throw new Error("invalid Data: please check the data again");
        }
        const alert_receive_email  = requestBody.config;

        const sql = queryGenerator.updateConfigSql(alert_receive_email);
        try {
            await connection.query(sql);
        } catch(err){

            console.log(err);
            throw err;
        } finally {
            connection.release()
        }
    }

};