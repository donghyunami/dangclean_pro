import express from "express";
import auth from "../middleware/auth.js";
import { diabetesCtrl } from "../controllers/diabetesCtrl.js";
import {
  FIND_BY_ID,
  GET_USER_FIND_BY_ID,
  INDEX_PATH
} from "../constants/path.js";

const router = express.Router();

// @routes     POST api/v1/diabetes
// @desc       Diabetes 데이터 추가
router.post(INDEX_PATH, auth, diabetesCtrl.postDiabetes);

// @routes     PATCH api/v1/diabetes/:id
// @desc       Diabetes 데이터 수정
router.patch(FIND_BY_ID, auth, diabetesCtrl.updateDiabetes);

// @routes     DELETE api/v1/diabetes/:id
// @desc       Diabetes 데이터 삭제
router.delete(FIND_BY_ID, auth, diabetesCtrl.deleteDiabetes);

// @routes     GET api/v1/diabetes/users/:id
// @desc       Diabetes 유저의 모든 데이터 조회
router.get(GET_USER_FIND_BY_ID, auth, diabetesCtrl.getAllDiabetes);

// @routes     GET api/v1/diabetes/:id
// @desc       Diabetes 상세 조회
router.get(FIND_BY_ID, auth, diabetesCtrl.getDiabetesFindById);

export default router;
