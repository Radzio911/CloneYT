import Button from "./componet/atoms/Button";
import { FaBeer } from 'react-icons/fa';
import Input from "./componet/atoms/Input";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import VideoPage from "./pages/VideoPage";
import SettingsPage from "./pages/SettingsPage";
import Page404 from "./pages/Page404";
import { GlobalStyles } from "./theme/GlobalStyles";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";


function App() {
  return (
    <>
      <GlobalStyles/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/video/:id" element={<VideoPage/>}/>
          <Route path="/settings/info" element={<SettingsPage subpage={'personal_info'}/>}/>
          <Route path="/settings/videos" element={<SettingsPage subpage={'your_videos'}/>}/>
          <Route path="/settings/privacy" element={<SettingsPage subpage={'privacy'}/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="*" element={<Page404/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
