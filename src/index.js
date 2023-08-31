import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import morgan from "morgan";
import helmet from "helmet";

import config from "./config/key.js";
import dbconnect from "./dbconfig.js";

import {
  usersRouter,
  authRouter,
  commentRouter,
  contentsRouter,
  diabetesRouter,
  likeRouter
} from "./routes/index.js";

dotenv.config();

const { PORT, COOKIE_SECRET, CLIENT_URL } = config;
const app = express();
app.set("port", PORT || 5000);

dbconnect();
app.use(morgan("div"));
app.use(
  cors({
    origin: CLIENT_URL || "http://localhost:3000",
    credentials: true
  })
);
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(COOKIE_SECRET));

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/diabetes", diabetesRouter);
app.use("/api/v1/contents", contentsRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/like", likeRouter);
app.use("/", (req, res) => res.send("연결 완료"));

app.listen(app.get("port"), () =>
  console.log(`Server Listening on http://localhost:${app.get("port")}`)
);
