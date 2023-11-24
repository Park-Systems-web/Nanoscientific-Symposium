const {getCurrentPool} = require("../../../common/utils/getCurrentPool");
const {postAbstractDto} = require("../dto/abstractDto");
const {validateData} = require("../../../common/tools/validators/dataTypeValidator")
const queryGenerator = require("../repository/abstractQueries");

module.exports = {
    findAbstract: async (nation, year) => {

        console.log("finding the proper data...");

        const currentPool = getCurrentPool(nation);

        const connection = await currentPool.getConnection(async (conn) => conn);

        try {
            const sql = queryGenerator.getAbstractQuery(year);
            const row = await connection.query(sql);
            return row[0];

        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            connection.release();
        }
    },

    createAbstract: async (requestBody, res) => {

        console.log('data is saving...')

        /*/
         /mapping JSON data included in req.body
         /to dto for validation: it can be separated to mapper class on demand
         /Data Validation using DTO
        /*/
        if (!validateData(postAbstractDto, requestBody)) {
            throw new Error("invalid Data: please check the data again");
        }

        const currentPool = getCurrentPool(requestBody.nation);
        const connection = await currentPool.getConnection(async (conn) => conn);
        const sql = queryGenerator.postAbstractQuery(requestBody);

        try {
            const result = await connection.query(sql);

            return result;
        } catch (err) {

            console.log(err);

            throw err;

        } finally {
            connection.release();
        }
    }
};

