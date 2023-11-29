const router = require("express").Router();
const zoomCtrl = require("./zoomCtrl");
const zoomMiddle = require("../../middlewares/zoomMiddle");

/**
 * @swagger
 *  /api/zoom/webinar/list:
 *    get:
 *      tags:
 *      - Zoom
 *      description: 계정의 Webinar 목록을 받아옵니다.
 *      responses:
 *        '200':
 *          description: successful operation
 */
router.get(
  "/webinar/list",
  zoomMiddle.getZoomTokenOAuth,
  zoomCtrl.getWebinarList
);

/**
 * @swagger
 *  /api/zoom/webinar/registrant/questions/{webinarId}:
 *    get:
 *      tags:
 *      - Zoom
 *      description: Webinar Id의 register question 목록을 받아옵니다.
 *      parameters:
 *        - in: path
 *          name: webinarId
 *          required: true
 *          schema:
 *            type: integer
 *          description: webinar ID
 *      responses:
 *        '200':
 *          description: successful operation
 */
router.get(
  "/webinar/registrant/questions/:webinarId",
  zoomMiddle.getZoomTokenOAuth,
  zoomCtrl.getRegistrationQuestions
);

/**
 * @swagger
 *  /api/zoom/webinar/registrants/{webinarId}:
 *    post:
 *      tags:
 *      - Zoom
 *      description: webinarId에 registrant 추가
 *      parameters:
 *        - name: request
 *          in: body
 *          required: true
 *          schema:
 *            type: array
 *            example: [{
 *              "id": 1,
 *              "next_id": 2,
 *              },{
 *              "id":2,
 *              "next_id": 3,
 *            }]
 *      responses:
 *        '200':
 *          description: successful operation
 */

router
  .route("/webinar/registrants/:webinarId")
  .get(zoomMiddle.getZoomTokenOAuth, zoomCtrl.getRegistrantLink)
  .post(zoomMiddle.getZoomTokenOAuth, zoomCtrl.addRegistrant);

router.post(
  "/webinar/registrant/fetch",
  zoomMiddle.getZoomTokenOAuth,
  zoomCtrl.fetchRegistrantId
);

router.post("/webinar", zoomMiddle.getZoomTokenOAuth, zoomCtrl.addWebinar);
router
  .route("/webinar/:webinarId")
  .get(zoomMiddle.getZoomTokenOAuth, zoomCtrl.getWebinar)
  .delete(zoomMiddle.getZoomTokenOAuth, zoomCtrl.removeWebinar);

router.get(
  "/meeting/list",
  zoomMiddle.getZoomTokenOAuth,
  zoomCtrl.getMeetingList
);
router.post("/webinar/live", zoomCtrl.setLiveStatus);

module.exports = router;
