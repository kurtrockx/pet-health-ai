import { Link, useNavigate } from "react-router-dom";
import petHealthLogo from "../assets/sidelogobar.png";

export default function Navbar() {
  const loggedInUser = localStorage.getItem("user");
  const navigate = useNavigate();

  function gotoSignin() {
    navigate("/signin");
  }

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/");
  }

  return (
    <header>
      <nav className="navbar">
        <div className="logo">
          <Link to="/home">
            <img src={petHealthLogo} alt="PetHealth AI Logo" />
          </Link>
        </div>
        <ul className="topbar">
          <li>
            <Link to="/chat">Chat</Link>
          </li>
          <li>
            <Link to="/guidance">Guidance</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          {loggedInUser ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <button onClick={gotoSignin}>Sign In</button>
          )}
        </ul>
      </nav>
    </header>
  );
}
