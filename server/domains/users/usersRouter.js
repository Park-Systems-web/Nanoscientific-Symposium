const router = require("express").Router();
const usersCtrl = require("./usersCtrl");
const usersMid = require("../../middlewares/users");

/**
 * @swagger
 *  /api/users/login:
 *    post:
 *      tags:
 *      - User
 *      description: 로그인
 *      parameters:
 *        - name: request
 *          in: body
 *          required: true
 *          schema:
 *            type: string
 *            example: {
 *              "nation": "asia",
 *              "email": "chanhyuk-tech@kakao.com",
 *              "password": "parksystems",
 *            }
 *      responses:
 *        '200':
 *          description: successful operation
 */

router.post("/login", usersCtrl.login);

/**
 * @swagger
 *  /api/users/logout:
 *    post:
 *      tags:
 *      - User
 *      description: 로그아웃
 *      parameters:
 *        - name: request
 *          in: body
 *          required: true
 *          schema:
 *            type: string
 *            example: {
 *              "nation": "asia",
 *              "email": "chanhyuk-tech@kakao.com",
 *              "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluMSIsImlhdCI6MTY0NTYwMjI3MywiZXhwIjoxNjQ2ODExODczfQ.7PHrIEB4ljAJN6aRHPo3heFMLPAhBQILTa__uW5hHqo",
 *            }
 *      responses:
 *        '200':
 *          description: successful operation
 */

router.post("/logout", usersCtrl.logout);

/**
 * @swagger
 *  /api/users/check:
 *    post:
 *      tags:
 *      - User
 *      description: accessToken 유효성 검증
 *      parameters:
 *        - name: request
 *          in: body
 *          required: true
 *          schema:
 *            type: string
 *            example: {
 *              "nation": "asia",
 *              "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluMSIsImlhdCI6MTY0NTYwMjI3MywiZXhwIjoxNjQ2ODExODczfQ.7PHrIEB4ljAJN6aRHPo3heFMLPAhBQILTa__uW5hHqo",
 *            }
 *      responses:
 *        '200':
 *          description: successful operation,
 *        '200-T40':
 *          description: 토큰 만료,
 *        '200-T41':
 *          description: 다른 브라우저에서 로그인,
 */

router.post(
  "/check",
  usersMid.checkToken,
  usersMid.readUser,
  async (req, res) => {
    let resObj = {
      success: true,
      message: "success",
      data: {
        id: res.locals.id,
        email: res.locals.email,
        role: res.locals.role,
        nation: res.locals.nation,
        accessToken: res.locals.accessToken,
        isPasswordSet: res.locals.is_password_set,
        isNewAnnouncement: res.locals.is_new_announcement,
        isAnnouncementCached: res.locals.is_announcement_cached,
      },
    };
    res.status(200).json(resObj);
  }
);

/**
 * @swagger
 *  /api/users/checkemail:
 *    post:
 *      tags:
 *      - User
 *      description: accessToken 유효성 검증
 *      parameters:
 *        - name: request
 *          in: body
 *          required: true
 *          schema:
 *            type: string
 *            example: {
 *              "nation": "asia",
 *              "email": "chanhyuk-tech@kakao.com",
 *            }
 *      responses:
 *        '200':
 *          description: successful operation
 */

router.post("/checkemail", usersCtrl.checkEmail);

/**
 * @swagger
 *  /api/users/passwordset:
 *    post:
 *      tags:
 *      - User
 *      description: 비밀번호가 설정되지 않은 유저 비밀번호 설정 유도
 *      parameters:
 *        - name: request
 *          in: body
 *          required: true
 *          schema:
 *            type: string
 *            example: {
 *              "nation": "asia",
 *              "email": "chanhyuk-tech@kakao.com",
 *              "password": "new password",
 *              "firstName": "chanhyuk",
 *              "lastName": "park",
 *            }
 *      responses:
 *        '200':
 *          description: successful operation
 */

router.post("/passwordset", usersCtrl.setPassword);

/**
 * @swagger
 *  /api/users/passwordreset:
 *    post:
 *      tags:
 *      - User
 *      description: 유저 비밀번호 변경 (재설정)
 *      parameters:
 *        - name: request
 *          in: body
 *          required: true
 *          schema:
 *            type: string
 *            example: {
 *              "nation": "asia",
 *              "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVyaWMua2ltQHBhcmtzeXN0ZW1zLmNvbSIsImlhdCI6MTY0NjAxMzIzNiwiZXhwIjoxNjQ2MDEzODM2fQ.gU-Ej6V4FQNBzmk1HQX7FqFuRO7pMzoF1EdIzP65ZTw",
 *              "curPassword": "current password",
 *              "newPassword": "new password",
 *            }
 *      responses:
 *        '200':
 *          description: successful operation,
 *        '200-P40':
 *          description: 현재 비밀번호 input이 DB와 다름,
 */
router.post(
  "/passwordreset",
  usersMid.checkToken,
  usersMid.readUser,
  usersCtrl.resetPassword
);

/**
 * @swagger
 *  /api/users/passwordforgot:
 *    post:
 *      tags:
 *      - User
 *      description: 유저 비밀번호 분실 (재설정)
 *      parameters:
 *        - name: request
 *          in: body
 *          required: true
 *          schema:
 *            type: string
 *            example: {
 *              "nation": "asia",
 *              "newPassword": "new password",
 *            }
 *      responses:
 *        '200':
 *          description: successful operation,
 *        '200-P40':
 *          description: 현재 비밀번호 input이 DB와 다름,
 */
router.post("/passwordforgot", usersCtrl.forgotPassword);

/**
 * @swagger
 *  /api/users/passwordset/check:
 *    post:
 *      tags:
 *      - User
 *      description: 유저의 password가 설정되어있는지 안되어있는지 판단
 *      parameters:
 *        - name: request
 *          in: body
 *          required: true
 *          schema:
 *            type: string
 *            example: {
 *              "nation": "asia",
 *              "email": "chanhyuk-tech@kakao.com",
 *            }
 *      responses:
 *        '200':
 *          description: successful operation
 */
router.post("/passwordset/check", usersCtrl.checkPasswordSet);

/**
 * @swagger
 *  /api/users/register:
 *    post:
 *      tags:
 *      - User
 *      description: Europe을 제외한 나라에 유저를 등록.
 *      parameters:
 *        - name: request
 *          in: body
 *          required: true
 *          schema:
 *            type: string
 *            example: {
 *              "email": "eric.kim@parksystems.com",
 *              "title": "Developer",
 *              "university": "Park Systems",
 *              "institute": "GM",
 *              "street": "St",
 *              "zipCode": "12345",
 *              "city": "Gyeonggi",
 *              "researchField": "Industry",
 *              "afmTool": "FX40",
 *              "lastName": "kim",
 *              "firstName": "eric",
 *              "psOptIn": "1",
 *              "nation": "asia"
 *            }
 *      responses:
 *        '200':
 *          description: successful operation,
 *
 *
 *
 */
router.post("/register", usersCtrl.register);
router.delete("/unregister", usersCtrl.unregister);

// 유럽용
router.post("/register/temp", usersCtrl.tempRegister);
router.delete("/unregister/temp", usersCtrl.tempUnregister);

router.post("/updateAnnouncementCache", usersCtrl.updateAnnouncementCache);
router.get("/isNewData", usersCtrl.getDataIsNewAnnoucnement);

module.exports = router;
