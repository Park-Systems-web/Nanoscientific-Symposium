const adminCtrl = require("../controller/adminCtrl");
const router = require("express").Router();

// page

/**
 * @swagger
 *  /api/admin/session:
 *    post:
 *      tags:
 *      - Admin
 *      description: 세션을 추가해줍니다.
 *      parameters:
 *        - name: request
 *          in: body
 *          required: true
 *          schema:
 *            type: string
 *            example: {
 *              "nation": "asia",
 *              "title": "session title",
 *              "date": "2022-02-02"
 *            }
 *      responses:
 *        '200':
 *          description: successful operation
 */

/**
 * @swagger
 *  /api/admin/session:
 *    put:
 *      tags:
 *      - Admin
 *      description: 세션을 수정해줍니다.
 *      parameters:
 *        - name: request
 *          in: body
 *          required: true
 *          schema:
 *            type: string
 *            example: {
 *              "nation": "asia",
 *              "title": "session title",
 *              "date": "2022-02-02",
 *              "id":25,
 *              "status":1
 *            }
 *      responses:
 *        '200':
 *          description: successful operation
 */

router
  .route("/session")
  .post(adminCtrl.addSession)
  .put(adminCtrl.modifySession);

/**
 * @swagger
 *  /api/admin/session/{id}:
 *    delete:
 *      tags:
 *      - Admin
 *      description: 세션을 삭제합니다.
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *          description: session ID
 *        - name: nation
 *          in: query
 *          required: true
 *          schema:
 *            type: string
 *          description: nation code
 *      responses:
 *        '200':
 *          description: successful operation
 */
router.route("/session/:id").delete(adminCtrl.deleteSession);

/**
 * @swagger
 *  /api/admin/program:
 *    post:
 *      tags:
 *      - Admin
 *      description: 프로그램을 추가해줍니다.
 *      parameters:
 *        - name: request
 *          in: body
 *          required: true
 *          schema:
 *            type: string
 *            example: {
 *              "nation": "asia",
 *              "session": 2,
 *              "title":"session-title",
 *              "speakers":"kim min tai",
 *              "description":"this section is desc",
 *              "startTime":"2022-02-21 11:44:00",
 *              "endTime":"2022-02-21 11:44:00",
 *            }
 *      responses:
 *        '200':
 *          description: successful operation
 */

/**
 * @swagger
 *  /api/admin/program:
 *    put:
 *      tags:
 *      - Admin
 *      description: 프로그램을 수정해줍니다.
 *      parameters:
 *        - name: request
 *          in: body
 *          required: true
 *          schema:
 *            type: string
 *            example: {
 *              "nation": "asia",
 *              "title": "session title",
 *              "date": "2022-02-02",
 *              "id":25,
 *              "status":1
 *              "speakers":"kim min tai",
 *              "description":"this section is desc",
 *              "startTime":"2022-02-21 11:44:00",
 *              "endTime":"2022-02-21 11:44:00"
 *             }
 *      responses:
 *        '200':
 *          description: successful operation
 */

router
  .route("/program")
  .post(adminCtrl.addProgram)
  .put(adminCtrl.modifyProgram);

router
  .route("/session")
  .post(adminCtrl.addSession)
  .put(adminCtrl.modifySession);

/**
 * @swagger
 *  /api/admin/program/{id}:
 *    delete:
 *      tags:
 *      - Admin
 *      description: 프로그램을 삭제합니다.
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *          description: program ID
 *        - name: nation
 *          in: query
 *          required: true
 *          schema:
 *            type: string
 *          description: nation code
 *      responses:
 *        '200':
 *          description: successful operation
 */
router.route("/program/:id").delete(adminCtrl.deleteProgram);

/**
 * @swagger
 *  /api/admin/program/agenda:
 *    post:
 *      tags:
 *      - Admin
 *      description: 서브 프로그램을 추가해줍니다.
 *      parameters:
 *        - name: request
 *          in: body
 *          required: true
 *          schema:
 *            type: string
 *            example: {
 *              "nation": "asia",
 *              "program": 2,
 *              "title":"session-title",
 *              "speakers":"kim min tai",
 *            }
 *      responses:
 *        '200':
 *          description: successful operation
 */

/**
 * @swagger
 *  /api/admin/program/agenda:
 *    put:
 *      tags:
 *      - Admin
 *      description: sub program을 수정해줍니다.
 *      parameters:
 *        - name: request
 *          in: body
 *          required: true
 *          schema:
 *            type: string
 *            example: {
 *              "nation": "asia",
 *              "title": "session title",
 *              "id":25,
 *              "speakers":"kim min tai",
 *             }
 *      responses:
 *        '200':
 *          description: successful operation
 */

router
  .route("/program/agenda")
  .post(adminCtrl.addAgenda)
  .put(adminCtrl.modifyAgenda);

/**
 * @swagger
 *  /api/admin/program/agenda/{id}:
 *    delete:
 *      tags:
 *      - Admin
 *      description: 서브프로그램을 삭제합니다.
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *          description: program ID
 *        - name: nation
 *          in: query
 *          required: true
 *          schema:
 *            type: string
 *          description: nation code
 *      responses:
 *        '200':
 *          description: successful operation
 */
router.route("/program/agenda/:id").delete(adminCtrl.deleteAgenda);

/**
 * @swagger
 *  /api/admin/program/agenda/reorder:
 *    post:
 *      tags:
 *      - Admin
 *      description: 서브 프로그램의 next id를 수정.
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

router.route("/program/agenda/reorder").post(adminCtrl.reorderAgendaList);

/**
 * @swagger
 *  /api/admin/speaker:
 *    post:
 *      tags:
 *      - Admin
 *      description: 스피커를 추가해줍니다.
 *      parameters:
 *        - name: request
 *          in: body
 *          required: true
 *          schema:
 *            type: string
 *            example: {
 *              "nation": "asia",
 *              "name": "chanhyuk",
 *              "belong": "parksystems",
 *              "imagePath": "upload/rdb.png-1644910479311",
 *            }
 *      responses:
 *        '200':
 *          description: successful operation
 */

/**
 * @swagger
 *  /api/admin/speaker:
 *    put:
 *      tags:
 *      - Admin
 *      description: 스피커를 수정해줍니다.
 *      parameters:
 *        - name: request
 *          in: body
 *          required: true
 *          schema:
 *            type: string
 *            example: {
 *              "nation": "asia",
 *              "name": "chanhyuk",
 *              "belong": "parksystems",
 *              "imagePath": "upload/rdb.png-1644910479311",
 *              "id":5,
 *              "status":1
 *             }
 *      responses:
 *        '200':
 *          description: successful operation
 */

router
  .route("/speaker")
  .post(adminCtrl.addSpeaker)
  .put(adminCtrl.modifySpeaker);

/**
 * @swagger
 *  /api/admin/speaker/{id}:
 *    delete:
 *      tags:
 *      - Admin
 *      description: 연사를 삭제합니다.
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *          description: speaker ID
 *        - name: nation
 *          in: query
 *          required: true
 *          schema:
 *            type: string
 *          description: nation code
 *      responses:
 *        '200':
 *          description: successful operation
 */
router.route("/speaker/:id").delete(adminCtrl.deleteSpeaker);

/**
 * @swagger
 *  /api/admin/hideProgram:
 *    get:
 *      tags:
 *      - Admin
 *      description: 숨긴 프로그램을 모두 보여줍니다. 나라를 쿼리로 넘겨줍니다.
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

router.route("/hideProgram").get(adminCtrl.getHideProgram);

/**
 * @swagger
 *  /api/admin/hideSession:
 *    get:
 *      tags:
 *      - Admin
 *      description: 숨긴 세션을 모두 보여줍니다. 나라를 쿼리로 넘겨줍니다.
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

router.route("/hideSession").get(adminCtrl.getHideSession);

/**
 * @swagger
 *  /api/admin/showProgram:
 *    put:
 *      tags:
 *      - Admin
 *      description: 선택한 프로그램 배열을 모두 보여짐 상태로 바꿔줍니다.
 *      parameters:
 *        - name: request
 *          in: body
 *          required: true
 *          schema:
 *            type: string
 *            example: {
 *               "nation": "asia",
 *               "programs": [
 *                {
 *                   "id": 2,
 *                   "session": 1,
 *                  "start_time": "2022-02-20T19:11:00.000Z",
 *                   "end_time": "2022-02-21T02:10:00.000Z",
 *                   "title": "Opening Message",
 *                   "speakers": "Dr. Sang-Joon Cho",
 *                   "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dum",
 *                  "status": 0
 *                },
 *                {
 *                   "id": 5,
 *                  "session": 2,
 *                   "start_time": "2022-02-21T01:29:15.000Z",
 *                   "end_time": "2022-02-21T01:29:15.000Z",
 *                   "title": "ㄴㅇㄹㄴㄹㄴㄹ",
 *                   "speakers": "ㄴㄹㄴㄹ",
 *                     "status": 0
 *                 },
 *                 {
 *                   "id": 13,
 *                   "session": 2,
 *                   "start_time": "2022-02-21T02:44:00.000Z",
 *                  "end_time": "2022-02-21T02:44:00.000Z",
 *
 *                  "speakers": "kim min tai",
 *                   "description": "this section is desc",
 *                   "status": 0
 *                 }
 *               ]
 *            }
 *      responses:
 *        '200':
 *          description: successful operation
 */

router.route("/showProgram").put(adminCtrl.showProgram);

/**
 * @swagger
 *  /api/admin/showSession:
 *    put:
 *      tags:
 *      - Admin
 *      description: 선택한 세션 객체 배열을 모두 보여짐 상태로 바꿔줍니다.
 *      parameters:
 *        - name: request
 *          in: body
 *          required: true
 *          schema:
 *            type: string
 *            example: {
 *               "nation": "asia",
 *               "sessions": [
 *                 {
 *                   "id": 21,
 *                  "session_title": "ㅁㄴㅇㅁㄴㅇㅁ",
 *                  "date": "2022-01-29T15:00:00.000Z",
 *                   "status": 0
 *                 },
 *                 {
 *                   "id": 22,
 *                   "session_title": "asdad",
 *                  "date": "2022-02-13T15:00:00.000Z",
 *                  "status": 0
 *                },
 *                 {
 *                  "id": 23,
 *                  "session_title": "1111111",
 *                  "date": "2022-02-15T15:00:00.000Z",
 *                  "status": 0
 *                }
 *               ]
 *            }
 *      responses:
 *        '200':
 *          description: successful operation
 */

router.route("/showSession").put(adminCtrl.showSession);

/**
 * @swagger
 *  /api/admin/hideSpeaker:
 *    get:
 *      tags:
 *      - Admin
 *      description: 숨긴 스피커를 모두 보여줍니다. 나라를 쿼리로 넘겨줍니다.
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

router.route("/hideSpeaker").get(adminCtrl.getHideSpeaker);

/**
 * @swagger
 *  /api/admin/showSpeaker:
 *    put:
 *      tags:
 *      - Admin
 *      description: 선택한 스피커 객체 배열을 모두 보여짐 상태로 바꿔줍니다.
 *      parameters:
 *        - name: request
 *          in: body
 *          required: true
 *          schema:
 *            type: string
 *            example: {
 *               "nation": "asia",
 *               "speakers": [
 *                 {
 *                   "id": 3,
 *                  "name": "Dr. dfs",
 *                   "belong": "Park Systems, United Kingdom",
 *                   "image_path": "upload/cha.png-1644912178651",
 *                   "status": 0,
 *                   "description": null
 *                 },
 *                {
 *                   "id": 19,
 *                   "name": "asdada",
 *                   "belong": "dasdasdas",
 *                   "image_path": "upload/exhibition-0217.jpg-1645406171875",
 *                   "status": 0,
 *                  "description": null
 *                 }
 *               ]
 *            }
 *      responses:
 *        '200':
 *          description: successful operation
 */

router.route("/showSpeaker").put(adminCtrl.showSpeaker);

/**
 * @swagger
 *  /api/admin/users:
 *    get:
 *      tags:
 *      - Admin
 *      description: 해당 나라의 유저정보를 보여줍니다. 나라를 쿼리로 넘겨줍니다.
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

router.route("/users").get(adminCtrl.getUsers);

/**
 * @swagger
 *  /api/admin/users/role:
 *    post:
 *      tags:
 *      - Admin
 *      description: 유저의 role을 변경합니다.
 *      parameters:
 *      - name: request
 *        in: body
 *        required: true
 *        schema:
 *          type: string
 *          example: {
 *             "nation": "asia",
 *             "id": 1,
 *             "role": "subscriber"
 *          }
 *      responses:
 *        '200':
 *          description: successful operation
 */

router.route("/users/role").post(adminCtrl.updateRole);

module.exports = router;
