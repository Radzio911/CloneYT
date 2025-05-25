import React, { useState, useEffect } from "react";
import { getMyVideos, deleteVideo } from "../api";
import Video from "../componet/molecules/Video";
import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledVideo = styled.div`
  display: flex;
  flex-direction: row;

  > .buttons {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-bottom: 70px;
    padding-left: 40px;
    align-items: flex-start;
  }
`;

const StyledButton = styled.button`
  color: #ffffff;
  background-color: transparent;
  border: none;
  font-size: 20px;
  font-weight: bold;
`;

function YourVideos() {
  const [yourVideos, setYourVideos] = useState([]);

  const refreshVideos = () => {
    getMyVideos().then((v) => setYourVideos(v));
  };

  useEffect(refreshVideos, []);

  const handleDeleteVideo = (video) => {
    const videoId = video._id;
    console.log(videoId);
    if (window.confirm("Are you sure you want to delete a video?")) {
      deleteVideo(videoId).then((deleted) => {
        console.log("deleted");
        refreshVideos();
      });
    }
  };

  return (
    <StyledWrapper>
      {yourVideos.map((video) => (
        <StyledVideo>
          <Video {...video} />
          <div className="buttons">
            <StyledButton>EDIT</StyledButton>
            <StyledButton onClick={() => handleDeleteVideo(video)}>
              DELETE
            </StyledButton>
            <StyledButton>HIDE</StyledButton>
          </div>
        </StyledVideo>
      ))}
    </StyledWrapper>
  );
}

export default YourVideos;
