import { Router } from "express";
import { Comment } from "../models/Comment.js";
import { Video } from "../models/Video.js";
import { User } from "../models/User.js";

export const commentRouter = new Router();

commentRouter.post("/comment", async (req, res) => {
  const { videoId, text } = req.body;

  const comment = await Comment.create({
    video: await Video.findById(videoId),
    text,
    user: await User.findById(req.user),
    create_at: new Date(),
  });

  res.json({ comment });
});

commentRouter.get("/comment/:id", async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  const comments = await Promise.all(
    (
      await Comment.find({ video })
    ).map(async (video) => ({
      ...video.toJSON(),
      user: await User.findById(video.user),
      video,
    }))
  );
  res.json({ comments });
});
