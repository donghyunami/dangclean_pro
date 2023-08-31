import Image from "../models/image";

export const imageCtrl = {
  postUploadImg: async (req, res) => {
    const image = new Image(req.body);
    try {
      const savedImageUrl = await image.save();
      res.status(200).json(savedImageUrl);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  }
};
