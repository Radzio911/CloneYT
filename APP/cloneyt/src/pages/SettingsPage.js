import Button from '../componet/atoms/Button';
import Input from '../componet/atoms/Input';
import Link from '../componet/atoms/Link'
import Navbar from '../componet/molecules/Navbar';
import styled from 'styled-components';


const titles = {
    personal_info: 'Personal Info',
    your_videos: 'Your Videos',
    privacy: 'Privacy',
}

const StyledMenu = styled.aside`

display:flex;
flex-direction: column;
gap: 20px;
color:#ffffff;
`

const StyledContainer = styled.main`
    padding: 10%;
    display:flex;
    flex-direction: row;
    gap: 20px;
`

const StyledForm = styled.form`
    padding: 20px;
    display:flex;
    flex-direction:column;
    color: #ffffff;
    gap: 25px;
    align-items: flex-start;
    > div {
        display:flex;
        flex-direction:column;
        gap: 5px;
    }

    input{
        width: 300px;
    }

`

const SettingsPage = ({subpage}) =>{
    return (
        <>
            <Navbar/>

           <StyledContainer>
                <StyledMenu>
                    <h1>{titles[subpage]}</h1>
                    <Link to="/settings/info">{titles['personal_info']}</Link>
                    <Link to="/settings/videos">{titles['your_videos']}</Link>
                    <Link to="/settings/privacy">{titles['privacy']}</Link>
                </StyledMenu>

                <main>
                   
                    {subpage === 'personal_info' && <>

                    <StyledForm>
                        <div>
                            <b>Username</b>
                            <Input/>
                        </div>
                        <div>
                            <b>E-mail</b>
                            <Input/>
                        </div>
                        <div>
                            <b>Profile Image</b>
                            <Input/>
                        </div>
                        <Button backgroundColor='#D9D9D9' color='#000000' padding='10px 30px'>Save</Button>
                    </StyledForm>
                    
                    </>}
                    {subpage === 'your_videos' && <>
                    
                    </>}
                    {subpage === 'privacy' && <>

                        <StyledForm>
                        <div>
                            <b>Old Password</b>
                            <Input/>
                        </div>
                        <div>
                            <b>New Password</b>
                            <Input/>
                        </div>
                     
                        <Button backgroundColor='#E75A5A' color='#000000' padding='10px 30px'>Change Password</Button>
                    
                    </StyledForm>

                    <StyledForm>
                        <span>If you want to delete your account. You can do it here.</span>
                            <div>
                            <b>Password</b>
                            <Input/>
                        </div>
                        <Button backgroundColor='#E75A5A' color='#000000' padding='10px 30px'>Delete Account</Button>
                    
                    </StyledForm>



                    
                    </>}
                </main>
           </StyledContainer>
           
        </>
    )
}

export default SettingsPage;