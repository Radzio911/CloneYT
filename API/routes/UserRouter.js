import { Router } from "express";
import { User } from "../models/index.js";
import md5 from "md5";
import JWT from "jsonwebtoken";

export const userRoute = new Router();

userRoute.post("/register", async (req, res) => {
  const { username, password, email, profileImage } = req.body;

  if (await User.findOne({ username })) {
    res.status(400).json({
      error: true,
      message: "Username is not available",
      register: false,
    });
  } else {
    const user = await User.create({
      username,
      password: md5(password),
      email,
      profileImage,
      join_date: new Date(),
      subscriptions: 0,
    });
    res.json({ ...user, register: true });
  }
});

userRoute.post("/login", async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  const user = await User.findOne({
    $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
    password: md5(password),
  });

  if (user) {
    const token = JWT.sign({ id: user._id }, process.env.TOKEN);
    res.cookie("TOKEN", token);
    res.status(200).json({ login: true, token });
  } else {
    res.status(403).json({ error: true, message: "User not found." });
  }
});

userRoute.get("/me", async (req, res) => {
  const user = await User.findById(req.user);
  res.json({ user });
});

userRoute.patch("/me", async (req, res) => {
  const { username, email, profile_image } = req.body;
  const user = await User.findByIdAndUpdate(req.user, {
    username: username,
    email: email,
    profile_image: profile_image,
  });
  res.json({
    edited: true,
    username: user.username,
    email: user.email,
    date_joined: user.date_joined,
  });
});

userRoute.patch("/password", async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user);

  if (md5(oldPassword) === user.password) {
    const user = await User.findByIdAndUpdate(req.user, {
      password: md5(newPassword),
    });

    res.json({ changed: true });
  } else {
    res.json({ changed: false });
  }
});

userRoute.delete("/me", async (req, res) => {
  const { password } = req.headers;
  const user = await User.findById(req.user);

  if (md5(password) === user.password) {
    await User.findByIdAndDelete(req.user);
    res.json({ deleted: true });
  } else {
    res.json({ deleted: false });
  }
});
