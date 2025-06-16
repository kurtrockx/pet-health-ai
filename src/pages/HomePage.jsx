import Navbar from "../components/NavBar";
import "../components/css/homepage.css";
import petHealthChar from "../assets/pethealthchar.png";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <main className="main-content">
        <div className="left-side">
          <div className="chat-bubble">
            Hello [User name]! I'm <span className="tailo">Tailo</span>, your{" "}
            <span className="assistant">PetHealth assistant</span>. I'm here to
            help you with first-aid guidance and home remedies for your pet.
            Let's keep them happy and healthy!
          </div>
          <div className="chat-bubble">
            How's your pet doing today? I'm here to help with any concerns you
            have.
          </div>
          <div className="button-group">
            <a href="/Frontend/QuickGuidance/QuickGuidance.html">
              <button>Quick Guidance</button>
            </a>
            <a href="/Frontend/PetChat/PetChat.html">
              <button>Talk with Tailo</button>
            </a>
          </div>
        </div>
        <div className="right-side">
          <img src={petHealthChar} alt="Pet Mascot" className="mascot" />
        </div>
      </main>
    </div>
  );
}
