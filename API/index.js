import dotenv from "dotenv";
import express from "express";
import { userRoute } from "./routes/UserRouter.js";
import mongoose from "mongoose";

dotenv.config();

mongoose.connect(process.env.MONGO);

const app = express();

app.use(express.json());
app.use(userRoute);

app.listen(5555);
