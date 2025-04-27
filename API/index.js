import dotenv from "dotenv";
import express from "express";
import { userRoute } from "./routes/UserRouter.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import { auth } from "./middleware/Auth.js";
import { videoRouter } from "./routes/VideoRouter.js";

dotenv.config();

mongoose.connect(process.env.MONGO);

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(auth(process.env.TOKEN));
app.use(express.json());
app.use(userRoute);
app.use(videoRouter);

app.listen(5555);
