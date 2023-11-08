import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import dbconnect from "./dbconfig";
import morgan from "morgan";
import helmet from "helmet";

import { NODE_ENV, CLIENT_URL, COOKIE_SECRET } from "./config/key.js";

import {
  usersRouter,
  authRouter,
  commentRouter,
  contentsRouter,
  diabetesRouter,
  likeRouter
} from "./routes/index.js";

dotenv.config();

const app = express();
app.set("port", 5000);

dbconnect();

// Middlewares
if (NODE_ENV === "production") {
  // 배포 모드
  app.use(morgan("combined"));
} else {
  // 개발 모드
  app.use(morgan("dev"));
}
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

// Routes
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
