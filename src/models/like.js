import { Schema, model } from "mongoose";
const { ObjectId } = Schema.Types;

const LikeSchema = new Schema({
  writer: {
    type: ObjectId,
    ref: "User"
  },
  contentsType: {
    type: String
  },
  contents: {
    type: ObjectId,
    ref: "Contents"
  },
  comments: {
    type: ObjectId,
    ref: "Comment"
  }
});

const Like = model("Like", LikeSchema);
export default Like;
