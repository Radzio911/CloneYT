import Button from "../componet/atoms/Button";
import Input from "../componet/atoms/Input";
import styled from "styled-components";

const StyledForm = styled.form`

display:flex;
flex-direction:column;
align-items: center;
gap: 15px;
color:#ffffff;


`

const LoginForm = () => {
    return (
        <StyledForm>
            <h1>Login</h1>
            <Input placeHolder={"username"}/>
            <Input placeHolder={"password"}/>
            <Button>Login</Button>
        </StyledForm>
    );
};

export default LoginForm;