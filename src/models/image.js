import { Schema, model } from "mongoose";

const imageSchema = new Schema({
  imageName: {
    type: String
  },
  imageUrl: {
    type: String
  }
});

const Image = model("Image", imageSchema);
export default Image;
