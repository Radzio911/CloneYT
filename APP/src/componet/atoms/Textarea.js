import React from "react";
import styled from "styled-components";

const StyledTextarea = styled.textarea`
  border: none;
  border-bottom: #ffffff 2px solid;
  background-color: transparent;
  padding: 5px;
  min-width: 200px;
  outline: none;
  color: #ffffff;
  resize: none;
`;

const Textarea = ({
  placeHolder,
  value = "",
  setValue = () => {},
  ...props
}) => {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <StyledTextarea
      {...props}
      value={value}
      placeholder={placeHolder}
      onChange={handleChange}
    />
  );
};

export default Textarea;
