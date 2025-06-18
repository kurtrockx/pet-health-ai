import { BrowserRouter, Route, Routes, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import PageNotFound from "./pages/PageNotFound";
import LandingPage from "./pages/LandingPage";
import ChatPage from "./pages/ChatPage";
import ProfilePage from "./pages/ProfilePage";
import GuidancePage from "./pages/GuidancePage";

function PageTitleSetter() {
  const location = useLocation();

  useEffect(() => {
    const route = location.pathname.replace("/", "") || "Landing";
    document.title = `${route.charAt(0).toUpperCase() + route.slice(1)} Page`;
  }, [location]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <PageTitleSetter />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/Signin" element={<SigninPage />} />
        <Route path="/Signup" element={<SignupPage />} />
        <Route path="/Chat" element={<ChatPage />} />
        <Route path="/Profile" element={<ProfilePage />} />
        <Route path="/Guidance" element={<GuidancePage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
