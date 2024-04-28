import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app } from "./socket/socket.js";

//middlewares
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

//routes import
import authRoute from "./Routes/auth.route.js";
import messageRoute from "./Routes/message.route.js";
import userRoute from "./Routes/user.route.js";
import ApiError from "./utils/apiError.js";

//routes decleration
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/messages", messageRoute);

//Error Handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Somthing went wrong" } = err;

  // if (err.name === "CastError" && err.kind === "ObjectId") {
  //   statusCode = 404;
  //   message = "Resource not found";
  // }

  return res.status(statusCode).json(new ApiError(400, message));
});

export default app;