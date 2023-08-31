import { Schema, model } from "mongoose";
const { ObjectId } = Schema.Types;

const commentSchema = new Schema(
  {
    writer: {
      type: ObjectId,
      ref: "User"
    },
    contentsId: {
      type: ObjectId,
      ref: "Contents"
    },
    parentCommentId: {
      type: ObjectId,
      ref: "Comments"
    },
    content: {
      type: String
    },
    isDeleted: {
      type: Boolean,
      default: false /* true이면 삭제된 상태 */
    }
  },
  {
    timestamps: true
  }
);

const Comment = model("Comment", commentSchema);
export default Comment;
