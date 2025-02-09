import Link from '../componet/atoms/Link'
import Navbar from '../componet/molecules/Navbar';
import LoginForm from '../forms/LoginForm';
import styled from 'styled-components';


const StyledWrapper = styled.div`

display:flex;
flex-direction: column;
align-items: center;
height: calc(100vh - 100px);
justify-content: center;

`;



const LoginPage = () =>{
    return (
        <>
            <Navbar/>
            <StyledWrapper>
                <LoginForm/>
            </StyledWrapper>
            
        </>
    )
}

export default LoginPage;