import { Schema, model } from "mongoose";
const { ObjectId } = Schema.Types;

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      maxlength: 50,
      require: true
    },
    nickname: {
      type: String,
      maxlength: 50
    },
    password: {
      type: String,
      minglength: 5,
      require: true
    },
    imageSrc: {
      type: String,
      default: ""
    },
    aboutMe: {
      //유저 소개
      type: String,
      max: 80
    },
    followers: [
      {
        type: ObjectId,
        ref: "User"
      }
    ],
    followings: [
      {
        type: ObjectId,
        ref: "User"
      }
    ],
    token: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);
export default User;
