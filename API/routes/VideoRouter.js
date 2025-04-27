import { Router } from "express";
import { Video } from "../models/index.js";
import data from "../../APP/src/data.json" assert { type: "json" };
import { User, Comment } from "../models/index.js";
import md5 from "md5";

export const videoRouter = new Router();

videoRouter.get("/videos", async (req, res) => {
  let {
    username,
    limit,
    offset,
    sort_by = "_id",
    sort_type = "asc",
  } = req.query;
  const user = await User.find({ username }).sort({ [sort_by]: sort_type }); // !TODO
  if (!offset) offset = 0;
  if (!limit) limit = 1e6;
  let videos = [...(await Video.find({ user }))].slice(
    parseInt(offset),
    parseInt(offset) + parseInt(limit)
  );

  res.json({ videos });
});

videoRouter.get("/videos/:id", async (req, res) => {
  const { id } = req.params;

  const video = await Video.findById(id);

  res.json({ video });
});

videoRouter.post("/videos", async (req, res) => {
  const { title, description, url, thumbnail } = req.body;

  const user = await User.findById(req.user);

  const newVideo = await Video.create({
    title,
    description,
    url,
    hidden: false,
    thumbnail,
    upload_date: new Date(),
    user,
    views: 0,
  });

  res.status(201).json({ video: newVideo });
});

videoRouter.put("/videos/:id", async (req, res) => {
  const { id } = req.params;
  const { description, title, url, thumbnail } = req.body;
  let video = await Video.findById(id);
  const user = await User.findById(req.user);

  if (video.user != user._id) {
    res.json({ error: "That video is not yours!" });
    return;
  }

  if (description) {
    await Video.findByIdAndUpdate(id, { description });
  }

  if (title) {
    await Video.findByIdAndUpdate(id, { title });
  }

  if (url) {
    await Video.findByIdAndUpdate(id, { url });
  }

  if (thumbnail) {
    await Video.findByIdAndUpdate(id, { thumbnail });
  }

  video = await Video.findById(id);
  res.json({ video });
});

videoRouter.delete("/videos/:id", async (req, res) => {
  const { id } = req.params;

  let video = await Video.findById(id);
  const user = await User.findById(req.user);

  if (video.user != user._id) {
    res.json({ error: "That video is not yours!" });
    return;
  }

  await Video.findByIdAndDelete(id);

  res.json({ deleted: true });
});

// videoRouter.get("/migrate", async (req, res) => {
//   const user = await User.findById("67a89f151d6be9e352d43931");
//   const video = await User.findById("680e0a83c6f57a59c6380613");
//   await Promise.all(
//     data.comments.forEach(async (comment) => {
//       const { text, created_at } = comment;
//       await Comment.create({
//         create_at: new Date(created_at),
//         text,
//         user,
//         video,
//       });
//     })
//   );
// });
