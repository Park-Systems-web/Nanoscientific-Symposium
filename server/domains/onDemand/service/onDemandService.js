const sqlGenerator = require("../repository/onDemandQueries");
const {getCurrentPool} = require("../../../common/utils/getCurrentPool");
const {validateData} = require("../../../common/tools/validators/dataTypeValidator");
const serviceUtils = require("../../../common/utils/serviceUtls")
const {patchEditOnDemandListDto, postOnDemandApplicationDto} = require("../dto/onDemandDtos")
const {objectToDtoMapper} = require("../../../common/tools/mapper/objectToDto");

module.exports = {

    findOnDemandList: async (page, itemPerPage ) => {
        const connection = await serviceUtils.currentPoolLoader("common");
        const sql = sqlGenerator.findOnDemandListSql(page, itemPerPage);


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
    findOnDemandListCount : async () => {
        const connection = await serviceUtils.currentPoolLoader("common");
        const sqlForCount = sqlGenerator.findOnDemandListCountSql();
        try {
            const result = await connection.query(sqlForCount);
            return result;
        } catch(err){

            console.log(err);
            throw err;
        } finally {
            connection.release()
        }
    },
    findOnDemandAllFilter: async () => {
        const connection =await serviceUtils.currentPoolLoader("common");
        const sql = sqlGenerator.findOnDemandAllFilterSql();
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
    findOnDemandPageVideo: async (page, itemPerPage, year, region, language, application, keyword) => {
        const connection = await serviceUtils.currentPoolLoader("common");
        const sql = sqlGenerator.findOnDemandPageVideoSql(page, itemPerPage, year, region, language, application, keyword)
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
    findOnDemandPageVideoCount: async (page, itemPerPage, year, region, language, application, keyword) => {
        const connection = await serviceUtils.currentPoolLoader("common");
        const sql = sqlGenerator.findOnDemandPageVideoCountSql(page, itemPerPage, year, region, language, application, keyword)

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
    findOnDemandVideo: async (id) => {
        const connection = await serviceUtils.currentPoolLoader("common");
        const sql = sqlGenerator.findOnDemandVideoSql(id);

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
    updateOnDemandList: async (requestBody) => {
        const connection = await serviceUtils.currentPoolLoader("common");

        const dto = objectToDtoMapper(patchEditOnDemandListDto,requestBody);

        if (!validateData(patchEditOnDemandListDto, dto)) {
                    throw new Error("invalid Data: please check the data again");
                }

        const sql = sqlGenerator.updateOnDemandListSql(dto);
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
    deleteOnDemandList: async (id) => {
        const connection = await serviceUtils.currentPoolLoader("common");

        const sql = sqlGenerator.deleteOnDemandListSql(id);
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
    findOnDemandApplication: async () => {
        const connection = await serviceUtils.currentPoolLoader("common");

        const sql = sqlGenerator.findOnDemandApplicationSql();
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
    deleteOnDemandApplication: async (id) => {
        const connection = await serviceUtils.currentPoolLoader("common");

        console.log(id)
        const sql = sqlGenerator.deleteOnDemandApplicationSql(id);

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
    createOnDemandApplication: async (requestBody) => {
        const connection = await serviceUtils.currentPoolLoader("common");

        const dto = objectToDtoMapper(postOnDemandApplicationDto,requestBody);

        if (!validateData(postOnDemandApplicationDto, dto)) {
                    throw new Error("invalid Data: please check the data again");
                }
        const sql = sqlGenerator.createOnDemandApplicationSql(dto);

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
    findOnDemandApplicationId: async (application) => {
        const connection = await serviceUtils.currentPoolLoader("common");

        const sql = sqlGenerator.findOnDemandApplicationIdSql(application);

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
    findSearchVideo: async () => {
        const connection = await serviceUtils.currentPoolLoader("common");

    },
}