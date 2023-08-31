import express from "express";
import { authCtrl } from "../controllers/authCtrl.js";
import { CHECK_EMAIL, INDEX_PATH, LOG_IN, LOG_OUT } from "../constants/path.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// @routes     POST api/v1/auth/login
// @desc       로그인
router.post(LOG_IN, authCtrl.login);

// @routes     POST api/v1/auth/checkemail
// @desc       이메일 중복 확인
router.post(CHECK_EMAIL, authCtrl.checkemail);

// @routes     GET api/v1/auth/logout
// @desc       로그아웃
router.get(LOG_OUT, authCtrl.logout);

// @routes     GET api/v1/auth
// @desc       토큰이 유효하다면, 유저 정보를 클라이언트로 전달
router.get(INDEX_PATH, auth, authCtrl.getUserIdByToken);

export default router;
