import Diabetes from "../models/diabetes.js";

export const diabetesCtrl = {
  postDiabetes: async (req, res) => {
    const newDiabetes = new Diabetes(req.body);
    try {
      await newDiabetes.save();
      res.status(200).json({ isOk: true, msg: "성공적으로 저장되었습니다." });
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },
  deleteDiabetes: async (req, res) => {
    try {
      const diabetes = await Diabetes.findById(req.params.id);
      if (!diabetes) {
        return res.status(403).json({
          isOk: false,
          msg: "해당 당수치 데이터가 존재하지 않습니다."
        });
      }
      await diabetes.deleteOne();
      return res
        .status(200)
        .json({ isOk: true, msg: "해당 당수치 데이터가 삭제되었습니다." });
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },
  updateDiabetes: async (req, res) => {
    try {
      const diabetes = await Diabetes.findById(req.params.id);
      if (!diabetes) {
        return res.status(403).json({
          isOk: false,
          msg: "해당 당수치 데이터가 존재하지 않습니다."
        });
      }
      await diabetes.updateOne({
        $set: req.body
      });
      return res
        .status(200)
        .json({ isOk: true, msg: "해당 당수치 데이터가 수정되었습니다." });
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },
  getAllDiabetes: async (req, res) => {
    const writer = req.params.id;
    try {
      const diabetes = await Diabetes.find({ writer })
        .sort({ createdAt: -1 }) // 내림차순 정렬
        .populate("writer", "nickname");
      res.status(200).json({ isOk: true, diabetesInfo: diabetes });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  getDiabetesFindById: async (req, res) => {
    const diabetesId = req.params.id;
    try {
      const diabetes = await Diabetes.findById(diabetesId).populate(
        "writer",
        "nickname"
      );
      res.status(200).json({ isOk: true, diabetesInfo: diabetes ?? {} });
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  }
};
