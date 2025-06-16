import React, { useState } from "react";
import petHealthLogo from "../assets/Pethealthlogo.png";
import eyeOpenIcon from "../assets/eye.png";
import eyeCloseIcon from "../assets/eye-off.png";
import { Link } from "react-router-dom";

import '../components/css/SignIn.css'

export default function SigninPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="container">
      <div className="login-form">
        <div className="logo">
          <img src={petHealthLogo} alt="Pet Health Logo" />
        </div>
        <form id="loginForm">
          <div className="form-group">
            <p>E-mail Address</p>
            <input
              type="text"
              id="username"
              placeholder="Enter your email"
              required
            />
            <span className="error-message" id="username-error"></span>
          </div>
          <div className="form-group">
            <p>Password</p>
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              id="passwordToggle"
              className="password-toggle"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? (
                <img src={eyeCloseIcon} alt="Hide" className="eye-close" />
              ) : (
                <img src={eyeOpenIcon} alt="Show" className="eye-open" />
              )}
            </button>
            <span className="error-message" id="password-error"></span>
          </div>
          <div className="forgot-password">
            <a href="/Frontend/ForgotPassword/ForgotPassword.html">
              Forgot Password?
            </a>
          </div>
          <button type="submit" id="login-btn">
            Sign In
          </button>
          <div className="signup-link">
            <span>Don't have an account? </span>
            <Link to={"/signup"}>Sign Up!</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
