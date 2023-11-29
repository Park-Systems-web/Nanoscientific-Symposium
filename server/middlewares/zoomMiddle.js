const { getCurrentPool } = require("../common/utils/getCurrentPool");
const {
  issueZoomToken,
  issueZoomTokenOAuth,
  checkZoomTokenExpired,
} = require("../common/utils/jwt");

const zoomMiddle = {
  getZoomToken: async (req, res, next) => {
    const nation = req.query.nation || req.body.nation;
    const currentPool = getCurrentPool(nation);

    const connection = await currentPool.getConnection((conn) => conn);

    try {
      const sql = `
      SELECT zoom_email, zoom_api_key, zoom_api_secret from configuration;
      `;

      const row = await connection.query(sql);

      const { zoom_email, zoom_api_key, zoom_api_secret } = row[0][0];

      res.locals.zoom_email = zoom_email;
      res.locals.zoom_token = issueZoomToken(zoom_api_key, zoom_api_secret);

      next();
    } catch (err) {
      connection.release();
      res.status(400).json({ success: false, err });
    }
  },
  getZoomTokenOAuth: async (req, res, next) => {
    const nation = req.query.nation || req.body.nation;
    const currentPool = getCurrentPool(nation);

    const connection = await currentPool.getConnection((conn) => conn);

    try {
      const sql = `
      SELECT zoom_email, zoom_account_id, zoom_client_id, zoom_client_secret, zoom_token from configuration;
      `;

      const row = await connection.query(sql);

      const {
        zoom_email,
        zoom_account_id,
        zoom_client_id,
        zoom_client_secret,
        zoom_token,
      } = row[0][0];

      res.locals.zoom_email = zoom_email;
      if (await checkZoomTokenExpired(zoom_email, zoom_token)) {
        res.locals.zoom_token = await issueZoomTokenOAuth(
          zoom_account_id,
          zoom_client_id,
          zoom_client_secret
        );
        const insertSql = `
        UPDATE configuration SET zoom_token="${res.locals.zoom_token}"
        WHERE id=1
        `;
        await connection.query(insertSql);
      } else {
        res.locals.zoom_token = zoom_token;
      }
      next();
    } catch (err) {
      connection.release();
      res.status(400).json({ success: false, err });
    }
  },
};

module.exports = zoomMiddle;
