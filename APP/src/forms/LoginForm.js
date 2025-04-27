import Button from "../componet/atoms/Button";
import Input from "../componet/atoms/Input";
import styled from "styled-components";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  color: #ffffff;
`;

const LoginForm = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:5555/login", {
      body: JSON.stringify({ usernameOrEmail, password }),
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const { token, login } = data;
        if (login) {
          setCookie("token", token);

          navigate("/");
        }
      })
      .catch(() => {});
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <h1>Login</h1>
      <Input
        placeHolder={"Username or Email"}
        value={usernameOrEmail}
        setValue={setUsernameOrEmail}
      />
      <Input placeHolder={"password"} value={password} setValue={setPassword} />
      <Button>Login</Button>
    </StyledForm>
  );
};

export default LoginForm;
