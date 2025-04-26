import axios from "axios";
import Cookies from "js-cookie";

export const api = new axios.Axios({
  headers: {
    "content-type": "application/json",
    token: Cookies.get("token"),
  },
  baseURL: "http://localhost:5555/",
});
