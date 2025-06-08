import axios from "axios";
import Cookies from "js-cookie";

export const api = new axios.Axios({
  headers: {
    "content-type": "application/json",
    token: Cookies.get("token"),
  },
  baseURL: "http://localhost:5555/",
});

export const getVideos = async (
  limit = 100,
  offset = 0,
  sort_by = "_id",
  sort_type = "asc"
) => {
  const res = await api.get("/videos", {
    params: { limit, offset, sort_by, sort_type },
  });

  return JSON.parse(res.data).videos;
};

export const getVideo = async (id) => {
  const res = await api.get(`/videos/${id}`);

  return JSON.parse(res.data).video;
};

export const createVideo = async (title, description, url, thumbnail) => {
  const res = await api.post(
    "/videos",
    JSON.stringify({ title, description, url, thumbnail })
  );
  return JSON.parse(res.data).video;
};

export const me = async () => {
  const res = await api.get("/me");

  return JSON.parse(res.data).user;
};

export const updateMe = async (username, email, profile_image) => {
  const res = await api.patch(
    "/me",
    JSON.stringify({ username, email, profile_image })
  );

  return JSON.parse(res.data).edited;
};

export const changeMyPassword = async (oldPassword, newPassword) => {
  const res = await api.patch(
    "/password",
    JSON.stringify({ oldPassword, newPassword })
  );
  return JSON.parse(res.data).changed;
};

export const deleteAccount = async (password) => {
  const res = await api.delete("/me", {
    headers: { password },
  });
  return JSON.parse(res.data).deleted;
};

export const setVideoHidden = async (isHidden, videoId) => {
  const res = await api.patch(`/videos/${videoId}/set_hidden`, {
    hidden: isHidden,
  });
  return JSON.parse(res.data);
};

export const getMyVideos = async () => {
  const res = await api.get(`/videos/my`);
  return JSON.parse(res.data).videos;
};

export const deleteVideo = async (videoId) => {
  const res = await api.delete(`/videos/${videoId}`);
  return JSON.parse(res.data).deleted;
};

export const createComment = async (text, videoId) => {
  const res = await api.post(`/comment`, JSON.stringify({ text, videoId }));
  return JSON.parse(res.data).comment;
};

export const getComments = async (videoId) => {
  const res = await api.get(`/comment/${videoId}`);
  return JSON.parse(res.data).comments;
};

export const setLike = async (videoId, liked) => {
  const res = await api.post(`/liked`, JSON.stringify({ videoId, liked }));
  return JSON.parse(res.data);
};

export const getLike = async (videoId) => {
  const res = await api.get(`/liked/${videoId}`);
  return JSON.parse(res.data).liked;
};

export const getLikedVideos = async () => {
  const res = await api.get(`/liked/videos`);
  return JSON.parse(res.data).videos;
};

export const setSubscription = async (userId, subscribe) => {
  const res = await api.post(
    `/subscription`,
    JSON.stringify({ userId, subscribe })
  );
  return JSON.parse(res.data);
};

export const getSubscription = async (userId) => {
  const res = await api.get(`/subscription/${userId}`);
  return JSON.parse(res.data).subscribe;
};

export const getSubscriptionUsers = async () => {
  const res = await api.get(`/subscription/users`);
  return JSON.parse(res.data).subscriptions;
};
