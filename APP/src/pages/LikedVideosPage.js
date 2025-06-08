import Navbar from "../componet/molecules/Navbar";
import Video, { VideoGrid } from "../componet/molecules/Video";
import { useState, useEffect } from "react";
import { getLikedVideos } from "../api";

const LikedVideosPage = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getLikedVideos().then((v) => setVideos(v));
  }, []);

  return (
    <>
      <Navbar />
      <VideoGrid>
        {videos
          .filter((video) => video.user)
          .map((video) => (
            <Video key={video._id} {...video} />
          ))}
      </VideoGrid>
    </>
  );
};

export default LikedVideosPage;
