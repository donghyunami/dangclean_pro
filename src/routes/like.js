import express from "express";
import auth from "../middleware/auth.js";
import { likeCtrl } from "../controllers/likeCtrl.js";
import {
  GET_COMMENT_FIND_BY_ID,
  GET_CONTENTS_FIND_BY_ID,
  INDEX_PATH
} from "../constants/path.js";
const router = express.Router();

// @routes     POST api/v1/like
// @desc       like 추가
router.post(INDEX_PATH, auth, likeCtrl.postLike);

// @routes     DELETE api/v1/like/contents/users/:id
// @desc       like 취소 (데이터를 보내야하므로 post로 요청)
router.post("/contents/users/:id", auth, likeCtrl.contentsUnLike);

// @routes     DELETE api/v1/like/comment/users/:id
// @desc       like 취소 (데이터를 보내야하므로 post로 요청)
router.post("/comment/users/:id", auth, likeCtrl.contentsUnLike);

// @routes     GET api/v1/like/contents/:id
// @desc       like 데이터 조회, id: commentId 또는 contentsId
router.get(GET_CONTENTS_FIND_BY_ID, likeCtrl.getContentsLike);

// @routes     GET api/v1/like/comment/:id
// @desc       like 데이터 조회, id: commentId 또는 contentsId
router.get(GET_COMMENT_FIND_BY_ID, likeCtrl.getCommentsLike);
export default router;
