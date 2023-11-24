const configurationCtrl = require("../controller/configurationCtrl");
const router = require("express").Router();

/**
 * @swagger
 *  /api/configuration:
 *    get:
 *      tags:
 *      - Configuration
 *      description: 페이지 설정 값 확인
 *      parameters:
 *        - name: request
 *          in: query
 *          required: true
 *          schema:
 *            type: string
 *            example: {
 *              "nation": "asia",
 *            }
 *      responses:
 *        '200':
 *          description: successful operation
 */
router
  .route("/")
  .get(configurationCtrl.getConfig)
  .post(configurationCtrl.setConfig);

module.exports = router;
