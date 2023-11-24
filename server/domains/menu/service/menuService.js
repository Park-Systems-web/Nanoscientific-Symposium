const sqlGenerator = require("../repository/menuQueries");
const {getCurrentPool} = require("../../../common/utils/getCurrentPool");
const {validateData} = require("../../../common/tools/validators/dataTypeValidator");
const serviceUtils = require("../../../common/utils/serviceUtls")
const {patchMenuListDto, findIsAdminDto, patchIsAdminDto} = require("../dto/menueDtos")


module.exports = {

    findMenuList: async (nation, year, language) => {
        const connection = await serviceUtils.currentPoolLoader(nation);
        const sql = sqlGenerator.findMenuListSql(nation, year, language);

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
    updateMenuList: async (requestBody) => {
        const connection = await serviceUtils.currentPoolLoader(requestBody.nation);
        if (!validateData(patchMenuListDto, requestBody)) {
            throw new Error("invalid Data: please check the data again");
        }

        const {menus, year} = requestBody;
        try {

            for (const menu of menus) {
                const sql = sqlGenerator.updateMenuListSql(menu, year);
                if (sql !== null) {
                    await connection.query(sql)
                }
            }
        } catch (err) {

            console.log(err);
            throw err;
        } finally {
            connection.release()
        }
    },
    findIsAdmin: async (requestBody) => {
        const connection = await serviceUtils.currentPoolLoader(requestBody.nation);
        if (!validateData(findIsAdminDto, requestBody)) {
            throw new Error("invalid Data: please check the data again");
        }
        const sql = sqlGenerator.findIsAdminSql(requestBody.path);

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
    updateIsAdmin: async (requestBody) => {
        const connection = await serviceUtils.currentPoolLoader(requestBody.nation);
        if (!validateData(patchIsAdminDto, requestBody)) {
            throw new Error("invalid Data: please check the data again");
        }
        const sql = sqlGenerator.updateIsAdminSql(requestBody);
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