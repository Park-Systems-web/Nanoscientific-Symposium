const router = require("express").Router();
const commonCtrl = require("../controller/commonCtrl");
const asiaCtrl = require("../../countries/controller/asiaCtrl");

/**
 * @swagger
 *  /api/page/common/eventLanding:
 *    get:
 *      tags:
 *      - Common
 *      description: 가장 처음 이벤트 랜딩 페이지를 가져옵니다.
 *      parameters:
 *        - name: nation
 *          in: query
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: successful operation
 */

router.route("/eventLanding").get(commonCtrl.getEventLanding);

/**
 * @swagger
 *  /api/page/common/exhibit/parksystems:
 *    get:
 *      tags:
 *      - Common
 *      description: 파크시스템스 전시회 html 을 가져옵니다.
 *      parameters:
 *        - name: nation
 *          in: query
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: successful operation
 */

router.route("/exhibit/parksystems").get(commonCtrl.getExhibitParkSystems);

/**
 * @swagger
 *  /api/page/common/exhibit/nanoscientific:
 *    get:
 *      tags:
 *      - Common
 *      description: nanoscientific 전시회 html 을 가져옵니다.
 *      parameters:
 *        - name: nation
 *          in: query
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: successful operation
 */

router.route("/exhibit/nanoscientific").get(commonCtrl.getNanoScientific);

/**
 * @swagger
 *  /api/page/common/maintenance:
 *    get:
 *      tags:
 *      - Common
 *      description: 사이트 수리중이라는 문구를 받는 HTML 입니다.
 *      parameters:
 *        - name: nation
 *          in: query
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: successful operation
 */

router.route("/maintenance").get(commonCtrl.getMaintenance);

/**
 * @swagger
 *  /api/page/common/sponsors:
 *    get:
 *      tags:
 *      - Common
 *      description: 각 국가의 sponsor page html 을 줍니다. 국가는 쿼리에 담습니다
 *      parameters:
 *        - name: nation
 *          in: query
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: successful operation
 */

router.route("/sponsors").get(commonCtrl.getSponsors);

/**
 * @swagger
 *  /api/page/common/programs:
 *    get:
 *      tags:
 *      - Common
 *      description: 각 국가의 프로그램 정보를 주는 API 입니다. 국가는 쿼리에 담습니다
 *      parameters:
 *        - name: nation
 *          in: query
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: successful operation
 */

router.route("/programs").get(commonCtrl.getPrograms);

/**
 * @swagger
 *  /api/page/common/programs/agenda:
 *    get:
 *      tags:
 *      - Common
 *      description: 각 국가의 프로그램에 속한 agenda들의 정보를 주는 API 입니다. 국가는 쿼리에 담습니다
 *      parameters:
 *        - name: nation
 *          in: query
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: successful operation
 */

router.route("/programs/agenda").get(commonCtrl.getAgenda);

/**
 * @swagger
 *  /api/page/common/sessions:
 *    get:
 *      tags:
 *      - Common
 *      description: 각 국가의 세션 정보를 주는 API 입니다. 국가는 쿼리에 담습니다
 *      parameters:
 *        - name: nation
 *          in: query
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: successful operation
 */
router.route("/sessions").get(commonCtrl.getSessions);

/**
 * @swagger
 *  /api/page/common/speakers:
 *    get:
 *      tags:
 *      - Common
 *      description: 각 국가의 스피커 정보를 주는 API 입니다. 국가는 쿼리에 담습니다
 *      parameters:
 *        - name: nation
 *          in: query
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: successful operation
 */

router.route("/speakers").get(commonCtrl.getSpeakers);

/**
 * @swagger
 *  /api/page/common/speakers/keynote:
 *    get:
 *      tags:
 *      - Common
 *      description: 각 국가의 keynote 스피커 정보를 주는 API 입니다. 국가는 쿼리에 담습니다
 *      parameters:
 *        - name: nation
 *          in: query
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: successful operation
 */

router.route("/speakers/keynote").get(commonCtrl.getKeynoteSpeakers);

/**
 * @swagger
 *  /api/page/common/speakers/detail:
 *    get:
 *      tags:
 *      - Common
 *      description: id에 해당하는 speaker의 정보를 반환
 *      parameters:
 *        - name: nation
 *          in: query
 *          required: true
 *          schema:
 *            type: string
 *        - name: id
 *          in: query
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: successful operation
 */

router.route("/speakers/detail").get(commonCtrl.getSpeakerDetailById);
router.route("/banner").get(commonCtrl.getBanner).post(commonCtrl.setBanner);

router
  .route("/landing/banner")
  .get(commonCtrl.getLandingBanner)
  .post(commonCtrl.setLandingBanner);

router
  .route("/landing")
  .get(commonCtrl.getLandingSectionList)
  .post(commonCtrl.setLandingSectionList);
router.route("/landing/:id").get(commonCtrl.getLandingContent);
router.route("/landing/title/:id").post(commonCtrl.setLandingTitle);
router.route("/landing/2").post(commonCtrl.setLanding2Content);
router.route("/landing/3").post(commonCtrl.setLanding3Content);
router
  .route("/landing/4")
  .post(commonCtrl.setLanding4Content)
  .put(commonCtrl.modifyLanding4Content)
  .delete(commonCtrl.deleteLanding4Content);
router.route("/landing/6").post(commonCtrl.setLanding6Content);
router.route("/landing/button/6").post(commonCtrl.setLanding6Button);
router
  .route("/landing/7")
  .post(commonCtrl.addSponsor)
  .put(commonCtrl.modifySponsor)
  .delete(commonCtrl.deleteSponsor);

router
  .route("/poster")
  .get(commonCtrl.getPosters)
  .post(commonCtrl.addPoster)
  .delete(commonCtrl.deletePoster);

router.route("/poster/list").post(commonCtrl.updatePosterList);
router.route("/speakers/list").post(commonCtrl.updateSpeakerList);

router
  .route("/abstract")
  .get(commonCtrl.getAbstractDesc)
  .post(commonCtrl.setAbstractDesc);

router.route("/speakersAbstract").get(commonCtrl.getSpeakersAbstract);

router
  .route("/editor")
  .get(commonCtrl.getEditorContent)
  .post(commonCtrl.updateEditorContent);

module.exports = router;
