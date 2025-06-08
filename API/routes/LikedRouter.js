import { Router } from "express";
import { Like } from "../models/Like.js";
import { User } from "../models/User.js";
import { Video } from "../models/Video.js";

export const LikedRouter = new Router();

LikedRouter.post("/liked", async (req, res) => {
  const { videoId, liked } = req.body;
  const user = await User.findById(req.user);
  const video = await Video.findById(videoId);

  const like = await Like.findOne({ user, video });

  if (liked && !like) {
    const newLiked = await Like.create({
      user: user,
      video: video,
      create_at: new Date(),
    });
    res.json({ newLiked });
  } else if (like) {
    const deleteLiked = await Like.findByIdAndDelete(like._id.toHexString());
    res.json({ deleteLiked });
  } else {
    res.json({ error: true });
  }
});

LikedRouter.get("/liked/videos", async (req, res) => {
  const user = await User.findById(req.user);

  const likes = await Like.find({ user });

  res.json({
    videos: await Promise.all(
      likes.map(async (like) => await Video.findById(like.video))
    ),
  });
});

LikedRouter.get("/liked/:videoId", async (req, res) => {
  const { videoId } = req.params;
  const user = await User.findById(req.user);
  const video = await Video.findById(videoId);

  const like = await Like.findOne({ user, video });

  res.json({ liked: !!like });
});
