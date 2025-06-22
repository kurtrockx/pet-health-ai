import Navbar from "../components/NavBar";
import "../components/css/homepage.css";
import petHealthChar from "../assets/enhancedLogo.png";
import { Link } from "react-router-dom";

export default function HomePage() {
  const currUser = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="overflow-y-hidden">
      <Navbar />
      <main className="main-content">
        <div className="left-side">
          <div className="chat-bubble">
            Hello <strong>{currUser?.username || "USER"}</strong>! I'm{" "}
            <span className="tailo">Tailo</span>, your{" "}
            <span className="assistant">PetHealth assistant</span>. I'm here to
            help you with first-aid guidance and home remedies for your pet.
            Let's keep them happy and healthy!
          </div>
          <div className="chat-bubble">
            How's your pet doing today? I'm here to help with any concerns you
            have.
          </div>
          <div className="button-group">
            <Link to={"/guidance"}>
              <button>Quick Guidance</button>
            </Link>
            <Link to={"/chat"}>
              <button>Talk with Tailo</button>
            </Link>
          </div>
        </div>
        <div className="right-side">
          <img src={petHealthChar} alt="Pet Mascot" className="mascot" />
        </div>
      </main>
    </div>
  );
}
