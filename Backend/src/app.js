import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
//app.use(express.urlencoded());
app.use( cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}) );
app.use(cookieParser());

//importing routes
import userRouter from "./routes/user.routes.js";
import eventRouter from "./routes/event.routes.js";

//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/events", eventRouter);

export { app };