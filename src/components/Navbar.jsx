import { Link } from "react-router-dom";
import petHealthLogo from "../assets/sidelogobar.png";

export default function Navbar() {
  return (
    <header>
      <nav className="navbar">
        <div className="logo">
          <Link to="/welcome">
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
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
