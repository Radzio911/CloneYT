import mongoose from "mongoose";

export const subscriptionSchema = new mongoose.Schema({
  create_at: Date,
  user: { type: mongoose.Types.ObjectId, ref: "User" },
  subscribed_user: { type: mongoose.Types.ObjectId, ref: "User" },
});

export const Subscription = mongoose.model(
  "Subscription",
  subscriptionSchema,
  "subscriptions"
);
