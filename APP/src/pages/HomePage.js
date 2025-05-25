import Navbar from "../componet/molecules/Navbar";
import Video, { VideoGrid } from "../componet/molecules/Video";
import { useState, useEffect } from "react";
import { getVideos } from "../api";

const HomePage = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos(100, 0, "upload_date", "desc").then((v) => setVideos(v));
  }, []);

  useEffect(() => {
    console.log(videos);
  }, [videos]);

  return (
    <>
      <Navbar />
      <VideoGrid>
        {videos
          .filter((video) => video.user)
          .map((video) => (
            // <></>
            <Video key={video.id} {...video} />
          ))}
      </VideoGrid>
    </>
  );
};

export default HomePage;
