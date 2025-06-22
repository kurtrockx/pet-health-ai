import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import petHealthLogo from "../assets/Pethealthlogo.png";
import eyeOpenIcon from "../assets/eye.png";
import eyeCloseIcon from "../assets/eye-off.png";
import "../components/css/SignIn.css";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const currUser = localStorage.getItem("user");
  useEffect(() => {
    if (currUser) navigate("/home");
  }, [currUser, navigate]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/home"); // or use window.location.href
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("An error occurred during login.");
    }
  };

  return (
    <div className="signin-container">
      <div className="container">
        <div className="login-form">
          <div className="logo-signin">
            <img
              src={petHealthLogo}
              alt="PetHealth Logo"
              className="min-w-48 min-h-48"
            />
          </div>
          <form id="loginForm" onSubmit={handleSubmit}>
            <div className="form-group">
              <p>E-mail Address</p>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="bg-white text-black"
              />
            </div>
            <div className="form-group">
              <p>Password</p>
              <div className="password-input-wrapper">
                <input
                  type={passwordVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="bg-white text-black"
                />
                <button
                  type="button"
                  id="passwordToggle"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                >
                  <img
                    src={passwordVisible ? eyeCloseIcon : eyeOpenIcon}
                    alt={passwordVisible ? "Hide" : "Show"}
                    className={passwordVisible ? "eye-close" : "eye-open"}
                  />
                </button>
              </div>
            </div>
            <div className="forgot-password">
              <Link to="/forgot">Forgot Password?</Link>
            </div>
            <button type="submit" id="login-btn">
              Sign In
            </button>
            <div className="signup-link signup-dont">
              <span>Don't have an account? </span>
              <Link to="/signup">Sign Up!</Link>
            </div>
            <div className="signup-link">
              <Link to="/" className="text-xs">
                Go Back to Landing Page?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
