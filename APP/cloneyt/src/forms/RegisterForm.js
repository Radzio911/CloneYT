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

const RegisterForm = () => {
    return (
        <StyledForm>
            <h1>Create Account</h1>
            <Input placeHolder={"username"}/>
            <Input placeHolder={"password"}/>
            <Input placeHolder={"emial"}/>
            <Input placeHolder={"profile image"}/>
            <Button>Create</Button>
        </StyledForm>
    );
};

export default RegisterForm;