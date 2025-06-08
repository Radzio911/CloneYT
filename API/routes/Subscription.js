import { Router } from "express";
import { User } from "../models/User.js";
import { Subscription } from "../models/Subscription.js";

export const subscriptionRouter = new Router();

subscriptionRouter.post("/subscription", async (req, res) => {
  const { userId, subscribe } = req.body;
  const me = await User.findById(req.user);
  const user = await User.findById(userId);

  const subscription = await Subscription.findOne({
    user: me,
    subscribed_user: user,
  });

  if (subscribe && !subscription) {
    const newSubscribe = await Subscription.create({
      user: me,
      subscribed_user: user,
      create_at: new Date(),
    });
    res.json({ newSubscribe });
  } else if (subscription && !subscribe) {
    const deleteSubscribe = await Subscription.findByIdAndDelete(
      subscription._id.toHexString()
    );
    res.json({ deleteSubscribe });
  } else {
    res.json({ error: "error" });
  }
});

subscriptionRouter.get("/subscription/users", async (req, res) => {
  const me = await User.findById(req.user);
  const subscriptions = await Subscription.find({ user: me });

  console.log(subscriptions.length);

  res.json({
    subscriptions: await Promise.all(
      subscriptions.map(async (sub) => ({
        ...sub.toJSON(),
        user: await User.findById(sub.subscribed_user),
      }))
    ),
  });
});

subscriptionRouter.get("/subscription/:userId", async (req, res) => {
  const { userId } = req.params;
  const me = await User.findById(req.user);
  const user = await User.findById(userId);

  const subscribe = await Subscription.findOne({
    user: me,
    subscribed_user: user,
  });

  res.json({ subscribe: !!subscribe });
});
