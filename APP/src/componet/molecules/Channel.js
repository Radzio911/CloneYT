import React from "react";
import styled from "styled-components";
import Link from "../atoms/Link";
import data from "../../data.json";
import ProfileImage from "../atoms/ProfileImage";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button.js";

const StyledChannel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: white;
  padding: 20px;
  align-items: center;

  img {
    width: 80px;
    aspect-ratio: 1/1;
  }

  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;

    > div {
      display: flex;
      flex-direction: column;
    }
  }
`;

// new Date()

const Channel = ({
  userId,
  profile_image,
  username,
  subscriptions,
  create_at,
  onUnsubscribe,
  ...props
}) => {
  return (
    <StyledChannel>
      <div>
        <img src={profile_image} />
        <div>
          <span>
            @{username} | {subscriptions} Subscribers
          </span>
          <span>You are subscriber from {create_at.toDateString()}</span>
        </div>
      </div>
      <Button onClick={() => onUnsubscribe(userId)}>UNSUBSCRIBE</Button>
    </StyledChannel>
  );
};

export default Channel;
