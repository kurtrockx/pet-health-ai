import sideLogoBar from "../assets/sidelogobar.png";
import welcomePagePic from "../assets/welcomepagepic.png";

import '../components/css/1FrontPage.css'

export default function LandingPage() {
  return (
    <>
      <header>
        <nav className="navbar">
          <div className="logo">
            <img src={sideLogoBar} alt="PetHealth AI Logo" />
          </div>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#howitworks">How It Works</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#features">Explore Features</a></li>
          </ul>
        </nav>
      </header>

      <main id="home" className="hero">
        <div className="hero-text">
          <h1>Your AI-Powered Pet Care Companion</h1>
          <p>Smart, instant, and reliable pet health advice — anytime, anywhere. Let AI help you care for your pets with expert guidance, first-aid tips, and health monitoring.</p>
          <div className="hero-buttons">
            <a href="/Frontend/SignIn/SignIn.html" className="btn primary">Chat Now</a>
            <a href="#features" className="btn secondary">Explore Features</a>
          </div>
        </div>
        <div className="hero-image">
          <img src={welcomePagePic} alt="PetHealth AI Hero Image" />
        </div>
      </main>

      <section id="howitworks" className="info-section">
        <h2>How It Works</h2>
        <p>
          Getting started with PetHealth AI is easy and fast:
          <br /><br />
          <strong>1. Sign Up / Log In</strong> – Create your account or access your profile.<br />
          <strong>2. Add Pet Profile</strong> – Enter your pet’s info (name, species, age).<br />
          <strong>3. Start Chat</strong> – Type a question or describe a symptom (e.g., “My dog is vomiting”).<br />
          <strong>4. Receive Guidance</strong> – Get step-by-step first-aid instructions instantly.<br />
          <strong>5. Follow-Up Advice</strong> – Learn whether to monitor or visit a vet based on AI suggestions.
        </p>
      </section>

      <section id="about" className="info-section">
        <h2>About PetHealth AI</h2>
        <p>
          PetHealth AI is a smart assistant designed to support pet owners with first aid and health advice. Whether it’s a minor issue or a sudden emergency, our chatbot provides trustworthy guidance within seconds.
          <br /><br />
          Our goal is to empower pet parents with information that helps them act quickly, confidently, and with care. PetHealth AI is not a replacement for veterinarians, but it bridges the gap between uncertainty and action when your pet needs help.
        </p>
      </section>

      <section id="features" className="info-section">
        <h2>Explore Features</h2>
        <p>
          <strong>🐕 Pet Profile Management</strong><br />
          Store important details like breed, and age.<br /><br />

          <strong>🤖 AI Chatbot</strong><br />
          Get quick, reliable first aid tips from a conversational assistant.<br /><br />

          <strong>🕒 Timestamped Messages</strong><br />
          Every message includes a timestamp for clear record-keeping.<br /><br />

          <strong>🧠 First Aid Library</strong><br />
          Covers emergencies like choking, vomiting, bleeding, heatstroke, and more.<br /><br />

          <strong>🔒 Privacy-Focused</strong><br />
          Your pet data is secure and only accessible by you.
        </p>
      </section>
    </>
  );
}
