import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	gap: 10px;
		background-color: ${ (props) => props.$backgroundColor };
		color: ${ (props) => props.$color };
		font-size: 15px;
		padding: ${ (props) => props.$padding };
		border: 2px solid black;
		border-radius: 1000000px;
		cursor: pointer;
`;

const Button = ({ children, icon, backgroundColor = '#272727', color='#ffffff', padding='10px', ...props }) => {
	return ( 
		<StyledButton $backgroundColor={backgroundColor} $color={color} $padding={padding} {...props}>
			{icon}
			{children}
		</StyledButton>
	);
};

export default Button