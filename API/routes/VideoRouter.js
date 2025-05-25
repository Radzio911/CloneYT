import { Router } from "express";
import { Video } from "../models/index.js";
import data from "../../APP/src/data.json" assert { type: "json" };
import { User, Comment } from "../models/index.js";
import md5 from "md5";

export const videoRouter = new Router();

videoRouter.get("/videos", async (req, res) => {
  let { limit, offset, sort_by = "upload_date", sort_type = "asc" } = req.query;

  if (!offset) offset = 0;
  if (!limit) limit = 1e6;

  let videos = [...(await Video.find().sort({ [sort_by]: sort_type }))].slice(
    parseInt(offset),
    parseInt(offset) + parseInt(limit)
  );

  const videosWithUsers = await Promise.all(
    videos.map(async (video) => ({
      ...video.toJSON(),
      user: await User.findById(video.user),
    }))
  );

  res.json({ videos: videosWithUsers });
});

// videoRouter.get("/videos", async (req, res) => {
//   let { limit, offset, sort_by = "_id", sort_type = "asc" } = req.query;
//   if (!offset) offset = 0;
//   if (!limit) limit = 1e6;

//   let videos = [...(await Video.find())].slice(
//     parseInt(offset),
//     parseInt(offset) + parseInt(limit)
//   );

//   res.json({ videos });
// });

videoRouter.get("/videos/my", async (req, res) => {
  const user = await User.findById(req.user);
  const videos = await Video.find({ user }); // TODO {user}

  res.json({ videos });
});

videoRouter.get("/videos/:id", async (req, res) => {
  const { id } = req.params;

  const video = await Video.findById(id); // TODO {user}

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

  if (video.user.toHexString() != user._id.toHexString()) {
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

  if (video.user.toHexString() != user._id.toHexString()) {
    res.json({ error: "That video is not yours!" });
    return;
  }

  await Video.findByIdAndDelete(id);

  res.json({ deleted: true });
});

videoRouter.patch("/videos/:id/views", async (req, res) => {
  const { id } = req.params;
  const video = await Video.findByIdAndUpdate(id, { $inc: { views: 1 } });

  res.json({
    _id: video._id,
    views: video.views,
  });
});

videoRouter.patch("/videos/:id/set_hidden", async (req, res) => {
  const { hidden } = req.body;

  const isHidden = hidden == "true";

  // req.user,
  const user = await User.findById(req.user);
  const video = await Video.findById(req.params.id);

  if (video.user.toHexString() != user._id.toHexString()) {
    res.json({ error: "That video is not yours!" });
    return;
  }

  await Video.findByIdAndUpdate(req.params.id, { hidden: isHidden });

  res.json({ id: id, hidden: isHidden });
});
