import express from "express";
import auth from "../middleware/auth.js";
import { userCtrl } from "../controllers/userCtrl.js";
import { FIND_BY_ID, INDEX_PATH } from "../constants/path.js";

const router = express.Router();

// @routes     POST api/v1/users
// @desc       유저 회원가입
router.post(INDEX_PATH, userCtrl.postUser);

// @routes     patch api/v1/users
// @desc       유저 정보 수정
router.patch(FIND_BY_ID, auth, userCtrl.updateUser);

// @routes     patch api/v1/users
// @desc       유저 삭제
router.delete(FIND_BY_ID, auth, userCtrl.deleteUser);

// @routes     GET api/v1/users/:id
// @desc       클라이언트로부터 전달받은 id를 통해 유저 정보를 전달
router.get(FIND_BY_ID, userCtrl.getUserFindById);

// @routes     GET api/v1/users/all-users
// @desc       모든유저 정보
router.get(INDEX_PATH, userCtrl.getUsersInfo);

// @routes     patch api/v1/users/:id/follow
// @desc       유저 팔로우
router.patch("/:id/follow", auth, userCtrl.addFollow);

// @routes     patch api/v1/users/:id/unfollow
// @desc       유저 언팔로우
router.patch("/:id/unfollow", auth, userCtrl.unFollow);

// @routes     get api/v1/users/:id/follow
// @desc       유저 팔로워, 팔로잉 목록
router.get("/:id/follow", auth, userCtrl.getFollowFindById);
export default router;
