import { Router } from "express";
import { User } from "../models/index.js";
import md5 from "md5";

export const userRoute = new Router();

userRoute.post("/register", async (req, res) => {
  const { username, password, email, profile_image } = req.body;

  if (await User.findOne({ username })) {
    res.status(400).json({ error: true, message: "Username is not available" });
  } else {
    const user = await User.create({
      username,
      password: md5(password),
      email,
      profile_image,
      join_date: new Date(),
      subscriptions: 0,
    });
    res.json(user);
  }
});
