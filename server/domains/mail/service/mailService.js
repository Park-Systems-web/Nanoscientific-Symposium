const {getCurrentPool} = require("../../../common/utils/getCurrentPool");
const {validateData} = require("../../../common/tools/validators/dataTypeValidator");
const {postEmailVerificationDto,findEmailVerificationDto} = require("../dto/mailDtos");
const sqlGenerator = require("../repository/mailQueries");

module.exports = {
    createEmailVerification : async (email,token,requestBody) => {
        const currentPool = getCurrentPool(requestBody.nation);
        const connection = await currentPool.getConnection(async (conn) => conn);

        if (!validateData(postEmailVerificationDto, requestBody)) {
            throw new Error("invalid Data: please check the data again");
        }

        const sql = sqlGenerator.createEmailVerificationSql(email,token);
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
    findEmailVerification : async (requestBody) => {
        const currentPool = getCurrentPool(requestBody.nation);
        const connection = await currentPool.getConnection(async (conn) => conn);

        if (!validateData(findEmailVerificationDto, requestBody)) {
                    throw new Error("invalid Data: please check the data again");
                }
        const sql = sqlGenerator.findEmailVerification(requestBody.email);

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


}