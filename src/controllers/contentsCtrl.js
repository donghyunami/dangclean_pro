import Contents from "../models/contents.js";
import { Like } from "../models/like.js";
import User from "../models/user.js";
import qs from "qs";

export const contentsCtrl = {
  postContents: async (req, res) => {
    const newContents = new Contents(req.body);
    try {
      await newContents.save();
      res.status(200).json({ isOk: true, msg: "성공적으로 저장되었습니다." });
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },
  deleteContents: async (req, res) => {
    try {
      const contents = await Contents.findById(req.params.id);
      console.log(contents);
      if (!contents._id) {
        return res
          .status(403)
          .json({ isOk: false, msg: "해당 게시글이 존재하지 않습니다." });
      }
      await contents.updateOne({
        $set: { isDeleted: true }
      });
      return res
        .status(200)
        .json({ isOk: true, msg: "해당 게시물이 삭제되었습니다." });
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },
  updateContents: async (req, res) => {
    try {
      const contents = await Contents.findById(req.params.id);
      if (!contents._id) {
        return res
          .status(403)
          .json({ isOk: false, msg: "해당 게시글이 존재하지 않습니다." });
      }
      await contents.updateOne({
        $set: req.body
      });
      return res
        .status(200)
        .json({ isOk: true, msg: "해당 게시물이 수정되었습니다." });
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },
  // /contents?page=1&size=10
  getAllContents: async (req, res) => {
    const { page, size } = qs.parse(req.query);

    try {
      const currentPage = parseInt(page || 1); // 현재 페이지, default: 1
      const listSize = parseInt(size || 10); //한 페이지당 보여줄 게시글 수, default: 1
      const totalContents = await Contents.countDocuments({}); //총 컨텐츠 갯수
      if (!totalContents)
        return res
          .status(400)
          .json({ isOk: false, msg: "불러올 컨텐츠가 없습니다." });

      const contents = await Contents.find()
        .sort({ createdAt: -1 }) //데이터 최신순으로 정렬
        .skip(listSize * (currentPage - 1))
        .limit(listSize)
        .populate("writer", "nickname imageSrc");
      if (!contents.length) {
        return res
          .status(403)
          .json({ isOk: false, msg: "해당 게시글이 존재하지 않습니다." });
      }
      res.status(200).json({ isOk: true, contents });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  // 상세 게시글
  getContentsFindById: async (req, res) => {
    try {
      const contents = await Contents.findById(req.params.id).populate(
        "writer",
        "nickname imageSrc"
      );
      if (contents._id) {
        return res
          .status(403)
          .json({ isOk: false, msg: "해당 게시글이 존재하지 않습니다." });
      }
      res.status(200).json({ isOk: true, contentsInfo: contents });
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },
  //내피드
  getMyFeed: async (req, res) => {
    try {
      const { nickname } = req.params;
      const { _id } = await User.findOne({ nickname });
      const contents = await Contents.find()
        .where("writer")
        .equals(_id)
        .sort({ createdAt: -1 })
        .populate("writer", "email nickname imageSrc aboutMe");
      console.log(contents);
      //        .populate("writer", "nickname imageSrc");
      if (!contents.length) {
        return res
          .status(403)
          .json({ isOk: false, msg: "해당 게시글이 존재하지 않습니다." });
      }
      res.status(200).json({ isOk: true, contents });
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },
  //내 관심글 가져오기
  getLikedMyContents: async (req, res) => {
    console.log("내 관심글 가져오기");
    try {
      const { nickname } = req.params;
      const { _id } = await User.findOne({ nickname });
      const like = await Like.find()
        .where("writer")
        .equals(_id)
        .where({ contentsType: "contents" })
        .sort({ createdAt: -1 })
        .select("_id contents")
        .populate({
          path: "contents",
          populate: { path: "writer", select: "_id email nickname imageSrc" }
        });

      if (!like) {
        return res.status(403).json({
          isOk: false,
          msg: "해당 게시글의 좋아요 정보가 존재하지 않습니다."
        });
      }
      res.status(200).json({ isOk: true, like });
    } catch (err) {
      console.error(err);
      res.status(500).json({ isOk: false, err });
    }
  }
};
