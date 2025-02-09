import Link from '../componet/atoms/Link'
import Navbar from '../componet/molecules/Navbar';
import LoginForm from '../forms/LoginForm';
import styled from 'styled-components';
import RegisterForm from '../forms/RegisterForm';


const StyledWrapper = styled.div`

display:flex;
flex-direction: column;
align-items: center;
height: calc(100vh - 100px);
justify-content: center;

`;



const RegisterPage = () =>{
    return (
        <>
            <Navbar/>
            <StyledWrapper>
                
                <RegisterForm/>
            </StyledWrapper>
            
        </>
    )
}

export default RegisterPage;