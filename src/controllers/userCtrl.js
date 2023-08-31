import User from "../models/user.js";
import bcrypt from "bcrypt";

export const userCtrl = {
  postUser: async (req, res) => {
    const { email, nickname, password } = req.body;
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        email,
        nickname,
        password: hashedPassword
      });

      await newUser.save();
      res.status(200).json({ isOk: true, msg: "가입 완료" });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  updateUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(403).json({
          isOk: false,
          msg: "해당 유저가 존재하지 않습니다."
        });
      }
      await user.updateOne({
        $set: req.body
      });
      return res
        .status(200)
        .json({ isOk: true, msg: "해당 유저 정보가 수정되었습니다." });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(403).json({
          isOk: false,
          msg: "해당 유저가 존재하지 않습니다."
        });
      }
      /* 
        원래 유저 정보는 나중을 위해 보관하는게 좋지만
        보안상 삭제하는 게 좋다고 판단. 
      */
      await user.deleteOne();
      return res.status(200).json({ isOk: true, msg: "회원 탈퇴되었습니다." });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  /**
   * 유저 정보를 불러오기
   * @description 클라이언트로부터 전달받은 id를 통해 유저 정보를 전달합니다.
   */
  getUserFindById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(403).json({
          isOk: false,
          msg: "해당 유저가 존재하지 않습니다."
        });
      }
      res.status(200).json({ isOk: true, userInfo: user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ err });
    }
  },
  //개발용으로 개발 완료후 삭제
  getUsersInfo: async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).json({ isOk: true, user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ err });
    }
  },
  addFollow: async (req, res) => {
    try {
      if (req.params.id !== req.user) {
        const currentUser = await User.findById(req.user);
        const targetUser = await User.findById(req.params.id);
        if (!currentUser.followings.includes(targetUser._id)) {
          await currentUser.updateOne({
            $push: { followings: targetUser._id }
          });
          await targetUser.updateOne({
            $push: { followers: currentUser._id }
          });
          return res.status(200).json({ isOk: true, msg: "팔로우했습니다." });
        } else {
          return res
            .status(403)
            .json({ isOk: false, msg: "이미 팔로우한 유저입니다." });
        }
      } else {
        res
          .status(403)
          .json({ isOk: false, msg: "자신을 팔로우할 수는 없습니다." });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  unFollow: async (req, res) => {
    try {
      if (req.params.id !== req.user) {
        const currentUser = await User.findById(req.user);
        const targetUser = await User.findById(req.params.id);
        if (currentUser.followings.includes(targetUser._id)) {
          await currentUser.updateOne({
            $pull: { followings: targetUser._id }
          });
          await targetUser.updateOne({
            $pull: { followers: currentUser._id }
          });
          return res
            .status(200)
            .json({ isOk: true, msg: "팔로우 취소되었습니다." });
        } else {
          return res
            .status(403)
            .json({ isOk: false, msg: "팔로우한 대상이 아닙니다." });
        }
      } else {
        res
          .status(403)
          .json({ isOk: false, msg: "자신을 팔로우 취소할 수는 없습니다." });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  getFollowFindById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(403).json({
          isOk: false,
          msg: "해당 유저가 존재하지 않습니다."
        });
      }
      const { _id, nickname, followers, followings } = user;
      const followInfo = {
        writer: { _id, nickname },
        followers,
        followings
      };
      res.status(200).json({ isOk: true, followInfo });
    } catch (err) {
      res.status(500).json({ err });
    }
  }
};
