import Button from "../componet/atoms/Button";
import Input from "../componet/atoms/Input";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  color: #ffffff;
`;

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:5555/register", {
      body: JSON.stringify({ username, email, password, profileImage }),
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const { register } = data;
        if (register) {
          navigate("/login");
        }
      })
      .catch(() => {});
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <h1>Create Account</h1>
      <Input placeHolder={"username"} value={username} setValue={setUsername} />
      <Input placeHolder={"password"} value={password} setValue={setPassword} />
      <Input placeHolder={"email"} value={email} setValue={setEmail} />
      <Input
        placeHolder={"profile image"}
        value={profileImage}
        setValue={setProfileImage}
      />
      <Button>Create</Button>
    </StyledForm>
  );
};

export default RegisterForm;
