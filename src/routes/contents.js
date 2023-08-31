import express from "express";
import auth from "../middleware/auth.js";
import { contentsCtrl } from "../controllers/contentsCtrl.js";
import {
  FIND_BY_ID,
  GET_USER_CONTENTS,
  INDEX_PATH
} from "../constants/path.js";

const router = express.Router();

// @routes     POST api/v1/contents
// @desc       Contents 데이터 추가
router.post(INDEX_PATH, auth, contentsCtrl.postContents);

// @routes     PATCH api/v1/contents/:id
// @desc       Contents 데이터 수정
router.patch(FIND_BY_ID, auth, contentsCtrl.updateContents);

// @routes     DELETE api/v1/contents/:id
// @desc       Contents 데이터 삭제
router.delete(FIND_BY_ID, auth, contentsCtrl.deleteContents);

// @routes     GET api/v1/contents
// @desc       Contents 모든 데이터 조회
router.get(INDEX_PATH, contentsCtrl.getAllContents);

// @routes     GET api/v1/contents/:id
// @desc       Contents 상세 조회
router.get(FIND_BY_ID, contentsCtrl.getContentsFindById);

// @routes     GET api/v1/contents/users/:nickname
// @desc       유저의 게시글 (내피드)
router.get(GET_USER_CONTENTS, contentsCtrl.getMyFeed);

// @routes     GET api/v1/contents/like/users/:nickname
// @desc       내 관심 게시글
router.get("/like/users/:nickname", auth, contentsCtrl.getLikedMyContents);

export default router;
