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
