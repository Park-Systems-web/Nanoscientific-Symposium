const menuCtrl = require("../controller/menuCtrl");
const router = require("express").Router();

/**
 * @swagger
 *  /api/menu/list:
 *    get:
 *      tags:
 *      - Menu
 *      description: menu의 item을 모두 불러옵니다.
 *      parameters:
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
router.route("/list").get(menuCtrl.getMenuList);
/**
 * @swagger
 *  /api/menu/list:
 *    post:
 *      tags:
 *      - Menu
 *      description: menu의 publish 상태 업데이트.
 *      parameters:
 *        - name: request
 *          in: body
 *          required: true
 *          schema:
 *            type: string
 *            example: {
 *              "nation": "us",
 *              "menus": menu list
 *            }
 *      responses:
 *        '200':
 *          description: successful operation
 */
router.route("/list").post(menuCtrl.updateMenuList);

/**
 * @swagger
 *  /api/menu/admin:
 *    post:
 *      tags:
 *      - Menu
 *      description: menu의 isAdmin 값을 조회합니다.
 *      parameters:
 *        - name: path
 *          in: query
 *          required: true
 *          schema:
 *            type: string
 *          description: subpath name
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

router.route("/admin").post(menuCtrl.getIsAdmin);
/**
 * @swagger
 *  /api/menu/admin:
 *    put:
 *      tags:
 *      - Menu
 *      description: menu의 isAdmin 값을 변경해줍니다..
 *      parameters:
 *        - name: request
 *          in: body
 *          required: true
 *          schema:
 *            type: string
 *            example: {
 *              "path": "/us/programs",
 *              "nation": "us",
 *              "isAdmin": 1
 *            }
 *      responses:
 *        '200':
 *          description: successful operation
 */

router.route("/admin").put(menuCtrl.setIsAdmin);

module.exports = router;
