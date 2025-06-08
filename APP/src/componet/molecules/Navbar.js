import React from "react";
import styled from "styled-components";
import Link from "../atoms/Link";
import data from "../../data.json";
import ProfileImage from "../atoms/ProfileImage";

const StyledNav = styled.nav`
  color: #ffffff;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 35px;

  div {
    display: flex;
    flex-direction: row;
    gap: 40px;
    align-items: center;
  }

  h1 {
    span {
      color: white;
    }
    span:first-child {
      color: red;
    }
  }
`;

const Navbar = ({ children, ...props }) => {
  return (
    <StyledNav {...props}>
      <div>
        <h1>
          <span>Y</span>
          <span>T</span>
        </h1>
        <Link to={"/"}>HomePage</Link>
        <Link to={"/subscription"}>Subscriptions</Link>
        <Link to={"/liked"}>Liked Videos</Link>
      </div>
      <div>
        <ProfileImage src={data.users[0].profile_image} />
        <Link to={"/settings/info"}>Your Account</Link>
      </div>
    </StyledNav>
  );
};

export default Navbar;
