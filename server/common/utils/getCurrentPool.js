const {
  asiaPool,
  koreaPool,
  usPool,
  japanPool,
  europePool,
  chinaPool,
  commonPool,
} = require("../config/dbConfigPool");

module.exports = {
  getCurrentPool: (req) => {
    let currentPool;
    switch (req) {
      case "asia":
        currentPool = asiaPool;
        break;
      case "kr":
        currentPool = koreaPool;
        break;
      case "americas":
        currentPool = usPool;
        break;
      case "jp":
        currentPool = japanPool;
        break;
      case "eu":
        currentPool = europePool;
        break;
      case "china":
        currentPool = chinaPool;
        break;
      default:
        currentPool = commonPool;
        break;
    }
    return currentPool;
  },
};
