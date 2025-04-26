import React from "react";
import styled from "styled-components";
import {Link as RouterLink} from 'react-router-dom'

const StyledLink = styled(RouterLink)`
		color: #ffffff;
        text-decoration: none;
`;

const Link = ({ children, to, ...props }) => {
	return ( 
		<StyledLink to={to} {...props}>
			{children}
		</StyledLink>
	);
};

export default Link;