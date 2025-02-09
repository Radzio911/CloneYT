import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  join_date: Date,
  subscriptions: Number,
  profile_image: String,
});

export const User = mongoose.model("User", userSchema, "users");
