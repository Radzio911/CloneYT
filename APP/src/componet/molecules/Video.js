import React from "react";
import styled from "styled-components";
import Link from "../atoms/Link";
import data from "../../data.json";
import ProfileImage from "../atoms/ProfileImage";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const StyledVideo = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 5px;
  color: #ffffff;
  cursor: pointer;

  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
  }

  & > div > div {
    display: flex;
    flex-direction: column;
  }

  .title {
    font-size: 130%;
    font-weight: 700;
  }
  .data {
  }
`;

const StyledThumbnail = styled.img`
  border-radius: 8px;
`;

const Video = ({
  _id,
  title,
  thumbnail,
  upload_date,
  views,
  user,
  ...props
}) => {
  const upload = new Date(upload_date);
  const momentDate = moment(upload);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/video/${_id}`);
  };

  return (
    <StyledVideo onClick={handleClick} tabIndex={0}>
      <StyledThumbnail src={thumbnail} />
      <div>
        <ProfileImage src={user.profile_image} />
        <div>
          <span className="title">{title}</span>
          <span className="data">
            {user.username} {views} Views | {momentDate.fromNow()}
          </span>
        </div>
      </div>
    </StyledVideo>
  );
};

export const VideoGrid = styled.div`
  display: grid;
  justify-content: space-around;
  grid-template-columns: repeat(
    auto-fit,
    minmax(0, min(100%/1, max(340px, 100%/4)))
  );
  padding: 40px;
  gap: 40px;
`;

export default Video;
