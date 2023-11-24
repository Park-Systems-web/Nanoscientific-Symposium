const {getCurrentPool} = require("./getCurrentPool");

module.exports = {
    currentPoolLoader: async (region) => {
        const currentPool = getCurrentPool(region);
        const connection = await currentPool.getConnection(async (conn) => conn);
        return connection;
    }
}