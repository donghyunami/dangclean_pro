import { Schema, model } from "mongoose";
const { ObjectId } = Schema.Types;

const diabetesSchema = new Schema(
  {
    writer: {
      type: ObjectId,
      ref: "User"
    },
    sugar_level: {
      type: Number,
      require: true
    },
    slot: {
      type: String,
      require: true
    },
    note: {
      type: String,
      default: ""
    },
    createdAt: {
      type: String,
      default: new Date(),
      require: true
    }
  },
  {
    timestamps: false
  }
);

const Diabetes = model("Diabetes", diabetesSchema);
export default Diabetes;
