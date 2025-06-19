import { Link } from "react-router-dom";
import sideLogoBar from "../assets/sidelogobar.png";
import welcomePagePic from "../assets/welcomepagepic.png";

import "../components/css/1FrontPage.css";

export default function LandingPage() {
  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-[#203134] shadow-md z-50">
        <nav className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <a href="#home">
              <img
                src={sideLogoBar}
                alt="PetHealth AI Logo"
                className="h-10 w-auto b"
              />
            </a>
          </div>
          <ul className="flex items-center space-x-4">
            <li>
              <a
                href="#home"
                className="text-white text-sm hover:bg-[#294344] hover:text-[#59cabc] px-3 py-1.5 rounded-2xl transition"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#how"
                className="text-white text-sm hover:bg-[#294344] hover:text-[#59cabc] px-3 py-1.5 rounded-2xl transition"
              >
                How It Works
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="text-white text-sm hover:bg-[#294344] hover:text-[#59cabc] px-3 py-1.5 rounded-2xl transition"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#explore"
                className="text-white text-sm hover:bg-[#294344] hover:text-[#59cabc] px-3 py-1.5 rounded-2xl transition"
              >
                Explore Features
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <div className="px-20 mt-300">
        <main
          className="flex relative items-center justify-between mt-200 gap-20"
          id="home"
        >
          <div className="flex flex-col gap-4 relative top-40">
            <h1 className="text-[#62ddbe] text-3xl font-bold w-max">
              Your AI-Powered Pet Care Companion
            </h1>
            <p className="text-sm max-w-2xl text-justify">
              Smart, instant, and reliable pet health advice — anytime,
              anywhere. Let AI help you care for your pets with expert guidance,
              first-aid tips, and health monitoring.
            </p>
            <div className="flex gap-4">
              <Link
                to={"/chat"}
                className="bg-[#f6b47c] text-black px-4 py-3 rounded-2xl shadow-[0_0_20px_#f6b47c] hover:bg-[#f6b47c] hover:text-black cursor-pointer duration-200 hover:-translate-y-1"
              >
                Chat Now
              </Link>
              <a
                className="border-2 border-[#f6b47c] flex justify-center items-center px-4 py-3 text-[#f6b47c] rounded-2xl duration-200 hover:-translate-y-1 cursor-pointer hover:bg-[#f6b47c] hover:text-black"
                href="#features"
              >
                Explore Features
              </a>
            </div>
          </div>
          <div>
            <img
              src={welcomePagePic}
              alt="PetHealth AI Hero Image"
              className="max-w-2xl mt-40"
            />
          </div>
        </main>

        <section className="space-y-2 mb-40 max-w-3xl text-justify" id="how">
          <h2 className="text-[#62ddbe] text-2xl font-bold">How It Works</h2>
          <p>
            Getting started with PetHealth AI is easy and fast:
            <br />
            <br />
            <strong>1. Sign Up / Log In</strong> – Create your account or access
            your profile.
            <br />
            <strong>2. Add Pet Profile</strong> – Enter your pet’s info (name,
            species, age).
            <br />
            <strong>3. Start Chat</strong> – Type a question or describe a
            symptom (e.g., “My dog is vomiting”).
            <br />
            <strong>4. Receive Guidance</strong> – Get step-by-step first-aid
            instructions instantly.
            <br />
            <strong id="about">5. Follow-Up Advice</strong> – Learn whether to
            monitor or visit a vet based on AI suggestions.
          </p>
        </section>

        <section className="space-y-2 pb-40 max-w-3xl text-justify">
          <h2 className="text-[#62ddbe] text-2xl font-bold">
            About PetHealth AI
          </h2>
          <p>
            PetHealth AI is a smart assistant designed to support pet owners
            with first aid and health advice. Whether it’s a minor issue or a
            sudden emergency, our chatbot provides trustworthy guidance within
            seconds.
            <br />
            <br />
            Our goal is to empower pet parents with information that helps them
            act quickly, confidently, and with care. PetHealth AI is not a
            replacement for veterinarians, but it bridges the gap between
            uncertainty and action when your pet needs help.
          </p>
        </section>

        <section
          className="space-y-2 pb-40 max-w-3xl text-justify"
          id="explore"
        >
          <h2 className="text-[#62ddbe] text-2xl font-bold">
            Explore Features
          </h2>
          <p>
            <strong>🐕 Pet Profile Management</strong>
            <br />
            Store important details like breed, and age.
            <br />
            <br />
            <strong>🤖 AI Chatbot</strong>
            <br />
            Get quick, reliable first aid tips from a conversational assistant.
            <br />
            <br />
            <strong>🕒 Timestamped Messages</strong>
            <br />
            Every message includes a timestamp for clear record-keeping.
            <br />
            <br />
            <strong>🧠 First Aid Library</strong>
            <br />
            Covers emergencies like choking, vomiting, bleeding, heatstroke, and
            more.
            <br />
            <br />
            <strong>🔒 Privacy-Focused</strong>
            <br />
            Your pet data is secure and only accessible by you.
          </p>
        </section>
      </div>
    </>
  );
}
