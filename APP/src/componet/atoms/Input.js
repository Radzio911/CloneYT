import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  border: none;
  border-bottom: #ffffff 2px solid;
  background-color: transparent;
  padding: 5px;
  min-width: 200px;
  outline: none;
  color: #ffffff;
`;
const Input = ({
  placeHolder,
  value = "",
  setValue = () => {},
  type = "text",
  ...props
}) => {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <StyledInput
      {...props}
      type={type}
      value={value}
      placeholder={placeHolder}
      onChange={handleChange}
    />
  );
};

export default Input;
