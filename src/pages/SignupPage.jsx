import React, { useState, useEffect } from "react";
import sidelogo from "../assets/sidelogo.png";
import catMascot from "../assets/Catmascot.png";
import eyeOpen from "../assets/eye.png";
import eyeClose from "../assets/eye-off.png";
import { Link, useNavigate } from "react-router-dom";
import "../components/css/SignUp.css";

export default function SignupPage() {

    const navigate = useNavigate();

    const currUser = localStorage.getItem("user");
    useEffect(() => {
      if (currUser) navigate("/home");
    }, [currUser, navigate]);
  
  
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    middleName: "",
    ext: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
    privacyAccepted: false,
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Example: Password must be at least 8 characters, contain a number, and a special character
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(formData.password)) {
      alert(
        "Password must be at least 8 characters long, contain at least one number, and one special character."
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!formData.termsAccepted || !formData.privacyAccepted) {
      alert(
        "You must accept the Terms and Services and Privacy Policy to continue."
      );
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Account created successfully!");
        window.location.href = "/signin";
      } else {
        alert(data.error || "Registration failed.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong.");
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setPasswordVisible((prev) => !prev);
    } else if (field === "confirmPassword") {
      setConfirmPasswordVisible((prev) => !prev);
    }
  };

  return (
    <div className="container">
      {/* Left Section */}
      <div className="left-section">
        <div className="logo">
          <img src={sidelogo} alt="PetHealth Helper" />
          <h1>PETHEALTH HELPER</h1>
        </div>
        <div className="welcome-content">
          <h2>Sign Up!</h2>
          <p>
            Welcome to PetHealth Helper! Your AI-powered pet care assistant is
            here to provide first-aid guidance for minor pet health emergencies.
            Remember, this chatbot does not replace a veterinarian for serious
            concerns. Always consult a professional. Enjoy exploring our
            features!
          </p>
          <div className="mascot">
            <img src={catMascot} alt="Cat Mascot" />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="right-section">
        <div className="form-container">
          <h2>Create Account</h2>
          <form id="signupForm" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="text-[12px] text-[#555] max-2xl:text-xs " htmlFor="lastName">
                  Last Name*
                </label>
                <input
                  className="border border-[#ccc]"
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="text-[12px] text-[#555] max-2xl:text-xs " htmlFor="firstName">
                  First Name*
                </label>
                <input
                  className="border border-[#ccc]"
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="text-[12px] text-[#555] max-2xl:text-xs " htmlFor="middleName">
                  Middle Name
                </label>
                <input
                  className="border border-[#ccc]"
                  type="text"
                  id="middleName"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="text-[12px] text-[#555] max-2xl:text-xs " htmlFor="ext">
                  Ext.
                </label>
                <select
                  id="ext"
                  name="ext"
                  value={formData.ext}
                  onChange={handleChange}
                >
                  <option value="" selected>
                    None
                  </option>
                  {["Jr.", "Sr.", "II", "III", "IV"].map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="text-[12px] text-[#555] max-2xl:text-xs " htmlFor="email">
                Email Address*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border border-[#ccc]"
              />
            </div>
            <div className="form-group">
              <label className="text-[12px] text-[#555] max-2xl:text-xs " htmlFor="username">
                Username*
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="border border-[#ccc]"
              />
            </div>
            <div className="form-group">
              <label className="text-[12px] text-[#555] max-2xl:text-xs " htmlFor="password">
                Password*
              </label>
              <div className="password-container">
                <input
                  className="border border-[#ccc]"
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => togglePasswordVisibility("password")}
                >
                  <img
                    src={passwordVisible ? eyeClose : eyeOpen}
                    alt={passwordVisible ? "Hide" : "Show"}
                  />
                </button>
              </div>
            </div>
            <div className="form-group"></div>
            <label
              className="text-[12px] text-[#555] max-2xl:text-xs "
              htmlFor="confirmPassword"
            >
              Confirm Password*
            </label>
            <div className="password-container">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="border border-[#ccc] text-black"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => togglePasswordVisibility("confirmPassword")}
              >
                <img
                  src={confirmPasswordVisible ? eyeClose : eyeOpen}
                  alt={confirmPasswordVisible ? "Hide" : "Show"}
                />
              </button>
            </div>
            <div className="checkbox-group">
              <div className="checkbox">
                <input
                  className="border border-[#ccc]"
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  required
                />
                <label className="text-[12px] text-[#555] max-2xl:text-xs ">
                  I agree to the <a href="/terms">Terms and Services</a>.
                </label>
              </div>
              <div className="checkbox">
                <input
                  className="border border-[#ccc]"
                  type="checkbox"
                  name="privacyAccepted"
                  checked={formData.privacyAccepted}
                  onChange={handleChange}
                  required
                />
                <label className="text-[12px] text-[#555] max-2xl:text-xs ">
                  I agree to the <a href="/privacy">Privacy Policy</a>.
                </label>
              </div>
            </div>
            <button type="submit" className="btn-primary">
              Continue
            </button>
            <div className="login-link">
              Already have account? <Link to={"/signin"}>Log in</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
