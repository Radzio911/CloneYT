import React from "react";
import styled from "styled-components";

const StyledImage = styled.img`
	width: 25px;
    height: 25px;
    border-radius: 100px;
`;

const ProfileImage = ({ src, ...props }) => {
	return ( 
		<StyledImage src={src} {...props}></StyledImage>
	);
};

export default ProfileImage;