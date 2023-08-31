import express from "express";
import auth from "../middleware/auth.js";
import { commentCtrl } from "../controllers/commentCtrl.js";
import {
  FIND_BY_ID,
  GET_CONTENTS_FIND_BY_ID,
  GET_USER_FIND_BY_ID,
  INDEX_PATH
} from "../constants/path.js";

const router = express.Router();

// @routes     POST api/v1/comment
// @desc       Comment 데이터 추가
router.post(INDEX_PATH, auth, commentCtrl.postComment);

// @routes     PATCH api/v1/comment/:id
// @desc       Comment 데이터 수정
router.patch(FIND_BY_ID, auth, commentCtrl.updateComment);

// @routes     DELETE api/v1/comment/:id
// @desc       Comment 데이터 삭제
router.delete(FIND_BY_ID, auth, commentCtrl.deleteComment);

// @routes     GET api/v1/comment/contents/:id
// @desc       Comment 모든 데이터 조회
router.get(GET_CONTENTS_FIND_BY_ID, commentCtrl.getAllComment);

// @routes     GET api/v1/comment/user/:userId
// @desc       Comment 유저가 작성한 데이터 조회
router.get(GET_USER_FIND_BY_ID, commentCtrl.getUserComment);

export default router;
