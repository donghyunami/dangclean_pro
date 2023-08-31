import mongoose from "mongoose";
import config from "./config/key.js";

const { MONGO_URI } = config;

const dbconnect = () => {
  if (process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }
  try {
    mongoose.connect(MONGO_URI);
  } catch (err) {
    console.error(err);
  }
};

dbconnect();
mongoose.connection.on("connected", () => {
  console.log("몽고디비에 연결되었습니다. 😊");
});
mongoose.connection.on("disconnected", dbconnect);

export default dbconnect;
