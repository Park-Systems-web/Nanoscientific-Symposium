const europeCtrl = require("../controller/europeCtrl");
const router = require("express").Router();

/**
 * @swagger
 *  /api/page/eu/register:
 *    post:
 *      tags:
 *      - Europe
 *      description: 유럽 페이지 회원가입 API
 *      parameters:
 *        - name: request
 *          in: body
 *          required: true
 *          schema:
 *            type: string
 *            example: {
 *              "email": "chanhyuk-tech@kakao.com",
 *              "title": "this is title",
 *              "university": "hanyang erica campus",
 *              "institute": "parksystems",
 *              "street": "dongtan park",
 *              "zipCode": "18249",
 *              "city": "hwaseoung",
 *              "researchField": "anything",
 *              "afmTool": "NX10",
 *              "nanoMechanical": "2",
 *              "characterizationOfSoft": "1",
 *              "advancedImaging": "4",
 *              "highResolutionImaging": "2",
 *              "automationInAfm": "1",
 *              "lastName": "chanhyuk",
 *              "firstName": "park",
 *              "psOptIn": 1,
 *            }
 *      responses:
 *        '200':
 *          description: successful operation
 */

router.route("/register").post(europeCtrl.register);

/**
 * @swagger
 *  /api/page/eu/transaction:
 *    post:
 *      tags:
 *      - Europe
 *      description: PayPal 결제 내역을 추가해주는 API
 *      parameters:
 *        - name: request
 *          in: body
 *          required: true
 *          schema:
 *            type: string
 *            example: {
 *              "details": {transaction details object},
 *              "userId": 29,
 *            }
 *      responses:
 *        '200':
 *          description: successful operation
 */

/**
 * @swagger
 *  /api/page/eu/transaction:
 *    delete:
 *      tags:
 *      - Europe
 *      description: PayPal 결제 내역을 취소해준다.
 *      parameters:
 *        - name: request
 *          in: body
 *          required: true
 *          schema:
 *            type: string
 *            example: {
 *              "id": "EWAHEJKIWAHEAEH213712893713ESDAD",
 *            }
 *      responses:
 *        '200':
 *          description: successful operation
 */

router
  .route("/transaction")
  .post(europeCtrl.saveTransaction)
  .delete(europeCtrl.deleteTransaction);

// 서버시간 통해 얼리버드 체크
router.route("/early").get(europeCtrl.getIsEarlyBird);
// 서버시간 통해 등록 종료 시점 체크
router.route("/registration-ended").get(europeCtrl.getIsRegistrationEnded);

module.exports = router;
