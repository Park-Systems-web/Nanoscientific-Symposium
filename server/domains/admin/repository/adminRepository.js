// const {getCurrentPool} = require("../../../utils/getCurrentPool");
//
// //추후 이런식으로 레이어 완전 분리 필요
// module.exports = {
//     save : async (nation,sql) => {
//         const currentPool = getCurrentPool(nation);
//         const connection = await currentPool.getConnection(async (conn) => conn);
//
//         try {
//             const result = await connection.query(sql);
//
//             return result;
//         } catch (err){
//
//             console.log(err);
//             throw err;
//
//         } finally {
//             connection.release();
//         }
//     },
//     find : async () => {},
//     delete : async () => {}
//
// }