import Button from "../componet/atoms/Button";
import Input from "../componet/atoms/Input";
import Textarea from "../componet/atoms/Textarea";
import Link from "../componet/atoms/Link";
import Navbar from "../componet/molecules/Navbar";
import styled from "styled-components";
import CreateVideoForm from "../forms/CreateVideo";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { changeMyPassword, me, updateMe, deleteAccount } from "../api";
import YourVideos from "../componet/YourVideos";

const titles = {
  personal_info: "Personal Info",
  your_videos: "Your Videos",
  new_video: "New Video",
  privacy: "Privacy",
};

const StyledMenu = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: #ffffff;
`;

const StyledContainer = styled.main`
  padding: 10%;
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const StyledForm = styled.form`
  padding: 20px;
  display: flex;
  flex-direction: column;
  color: #ffffff;
  gap: 25px;
  align-items: flex-start;
  > div {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  input {
    width: 300px;
  }
`;

const SettingsPage = ({ subpage }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [oldpassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    me().then((user) => {
      if (!user) {
        navigate("/login");
      } else {
        setUsername(user.username);
        setEmail(user.email);
        setProfileImage(user.profile_image);
      }
    });
  }, [navigate]);

  const handleSaveData = (event) => {
    event.preventDefault();
    updateMe(username, email, profileImage).then((edited) => {
      console.log("edited");
    });
  };
  const handleChangePassword = (event) => {
    event.preventDefault();
    changeMyPassword(oldpassword, newpassword).then((chanegd) => {
      console.log("changed");
    });
  };
  const handleDeleteAccount = (event) => {
    event.preventDefault();

    if (window.confirm("Are you sure you want to delete an account?")) {
      deleteAccount(password).then((deleted) => {
        console.log("deleted");
        navigate("/");
      });
    }
  };

  return (
    <>
      <Navbar />

      <StyledContainer>
        <StyledMenu>
          <h1>{titles[subpage]}</h1>
          <Link to="/settings/info">{titles["personal_info"]}</Link>
          <Link to="/settings/videos">{titles["your_videos"]}</Link>
          <Link to="/settings/new_video">{titles["new_video"]}</Link>
          <Link to="/settings/privacy">{titles["privacy"]}</Link>
        </StyledMenu>

        <main>
          {subpage === "personal_info" && (
            <>
              <StyledForm onSubmit={handleSaveData}>
                <div>
                  <b>Username</b>
                  <Input value={username} setValue={setUsername} />
                </div>
                <div>
                  <b>E-mail</b>
                  <Input value={email} setValue={setEmail} />
                </div>
                <div>
                  <b>Profile Image</b>
                  <Input value={profileImage} setValue={setProfileImage} />
                </div>
                <Button
                  backgroundColor="#D9D9D9"
                  color="#000000"
                  padding="10px 30px"
                >
                  Save
                </Button>
              </StyledForm>
            </>
          )}
          {subpage === "your_videos" && <YourVideos />}
          {subpage === "new_video" && <CreateVideoForm />}
          {subpage === "privacy" && (
            <>
              <StyledForm onSubmit={handleChangePassword}>
                <div>
                  <b>Old Password</b>
                  <Input
                    type={"password"}
                    value={oldpassword}
                    setValue={setOldPassword}
                  />
                </div>
                <div>
                  <b>New Password</b>
                  <Input
                    type={"password"}
                    value={newpassword}
                    setValue={setNewPassword}
                  />
                </div>

                <Button
                  backgroundColor="#E75A5A"
                  color="#000000"
                  padding="10px 30px"
                >
                  Change Password
                </Button>
              </StyledForm>

              <StyledForm onSubmit={handleDeleteAccount}>
                <span>
                  If you want to delete your account. You can do it here.
                </span>
                <div>
                  <b>Password</b>
                  <Input
                    type="password"
                    value={password}
                    setValue={setPassword}
                  />
                </div>
                <Button
                  backgroundColor="#E75A5A"
                  color="#000000"
                  padding="10px 30px"
                >
                  Delete Account
                </Button>
              </StyledForm>
            </>
          )}
        </main>
      </StyledContainer>
    </>
  );
};

export default SettingsPage;
