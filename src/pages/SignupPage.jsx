import React, { useState, useEffect } from "react";
import sidelogo from "../assets/sidelogo.png";
import catMascot from "../assets/Catmascot.png";
import eyeOpen from "../assets/eye.png";
import eyeClose from "../assets/eye-off.png";
import { Link, useNavigate } from "react-router-dom";
import "../components/css/SignUp.css";

const terms = {
  title: "Terms & Conditions",
  message: [
    "By using PetHealth Helper, you agree to the following terms and conditions:",
    "1. PetHealth Helper is an AI-powered assistant designed to provide basic pet health information and first-aid guidance for minor pet health concerns.",
    "2. The information provided through our service is for general informational purposes only and is not intended to replace professional veterinary advice, diagnosis, or treatment.",
    "3. Always consult with a qualified veterinarian regarding any questions or concerns about your pet's health condition.",
    "4. PetHealth Helper is not liable for any decisions made based on the information provided through our service.",
    "5. Your personal information will be handled in accordance with our Privacy Policy.",
  ],
};

console.log(terms.message);
const privacy = {
  title: "Privacy Notice",
  message: [
    "PetHealth Helper is committed to protecting your privacy:",
    "1. We collect personal information such as your name, email address, and information about your pets to provide and improve our service.",
    "2. Your information is stored securely and will not be shared with third parties without your consent, except as required by law.",
    "3. We use cookies and similar technologies to enhance your experience and analyze usage patterns.",
    "4. You have the right to access, correct, or delete your personal information at any time.",
    "5. By using PetHealth Helper, you consent to the collection and use of information as described in this Privacy Policy.",
  ],
};

export default function SignupPage() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

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
        "You must accept the Terms and Conditions and Privacy Policy to continue."
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
        <div className="logo relative">
          <img src={sidelogo} alt="PetHealth Helper" />
          <h1 className="font-bold">PETHEALTH HELPER</h1>
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
          <div className="mascot absolute bottom-0">
            <img src={catMascot} alt="Cat Mascot" />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="right-section">
        <div className="form-container">
          <h2 className="relative top-2.5 font-bold">Create Account</h2>
          <form id="signupForm" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label
                  className="text-[12px] text-[#555] max-2xl:text-xs "
                  htmlFor="lastName"
                >
                  Last Name*
                </label>
                <input
                  className="border border-[#ccc] max-h-8"
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label
                  className="text-[12px] text-[#555] max-2xl:text-xs "
                  htmlFor="firstName"
                >
                  First Name*
                </label>
                <input
                  className="border border-[#ccc] max-h-8"
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label
                  className="text-[12px] text-[#555] max-2xl:text-xs "
                  htmlFor="middleName"
                >
                  Middle Name
                </label>
                <input
                  className="border border-[#ccc] max-h-8"
                  type="text"
                  id="middleName"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label
                  className="text-[12px] text-[#555] max-2xl:text-xs "
                  htmlFor="ext"
                >
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
              <label
                className="text-[12px] text-[#555] max-2xl:text-xs "
                htmlFor="email"
              >
                Email Address*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border border-[#ccc] max-h-8"
              />
            </div>
            <div className="form-group">
              <label
                className="text-[12px] text-[#555] max-2xl:text-xs "
                htmlFor="username"
              >
                Username*
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="border border-[#ccc] max-h-8"
              />
            </div>
            <div className="form-group">
              <label
                className="text-[12px] text-[#555] max-2xl:text-xs "
                htmlFor="password"
              >
                Password*
              </label>
              <div className="password-container">
                <input
                  className="border border-[#ccc] max-h-8"
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <div
                  type="button"
                  className="password-toggle-signup"
                  onClick={() => togglePasswordVisibility("password")}
                >
                  <img
                    src={passwordVisible ? eyeClose : eyeOpen}
                    alt={passwordVisible ? "Hide" : "Show"}
                  />
                </div>
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
                className="border border-[#ccc] max-h-8 text-black"
              />
              <button
                type="button"
                className="password-toggle-signup"
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
                  className="border border-[#ccc] max-h-8"
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  required
                />
                <label className="text-[12px] text-[#555] max-2xl:text-xs ">
                  I agree to the{" "}
                  <a
                    h
                    onClick={() => {
                      setModalOpen(true), setModalContent(terms);
                    }}
                  >
                    Terms and Conditions
                  </a>
                  .
                </label>
              </div>
              <div className="checkbox">
                <input
                  className="border border-[#ccc] max-h-8"
                  type="checkbox"
                  name="privacyAccepted"
                  checked={formData.privacyAccepted}
                  onChange={handleChange}
                  required
                />
                <label className="text-[12px] text-[#555] max-2xl:text-xs ">
                  I agree to the{" "}
                  <a
                    onClick={() => {
                      setModalOpen(true), setModalContent(privacy);
                    }}
                  >
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>
            </div>
            <button type="submit" className="btn-primary">
              Continue
            </button>
            <div className="login-link relative bottom-3.5">
              Already have account? <Link to={"/signin"}>Log in</Link>
            </div>
          </form>
        </div>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 min-w-screen min-h-screen overflow-hidden bg-black/50 z-100 flex justify-center items-center">
          <div className="max-w-[50vw] flex flex-col gap-4 max-h-[80vh] bg-white text-black absolute aspect-square py-8 px-6 rounded-2xl">
            <div
              className="absolute top-7.5 right-8 cursor-pointer"
              onClick={() => {
                setModalOpen(false);
              }}
            >
              ✖
            </div>
            <h1 className="font-bold text-2xl text-[#56938a] text-center">
              {modalContent.title}
            </h1>
            {modalContent?.message.map((msg) => {
              return (
                <p className="text-sm text-[#535353] text-justify">{msg}</p>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
