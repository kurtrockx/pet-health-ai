import sideLogoBar from "../assets/sidelogobar.png";
import welcomePagePic from "../assets/welcomepagepic.png";

export default function LandingPage() {
  return (
    <>
      <header className="w-full bg-gray-800 text-white">
        <nav className="w-full flex items-center justify-between p-4">
          <div className="flex items-center">
            <img src={sideLogoBar} alt="PetHealth AI Logo" className="h-12" />
          </div>
          <ul className="flex space-x-6 text-sm font-medium">
            <li>
              <a href="#home" className="hover:text-gray-300">
                Home
              </a>
            </li>
            <li>
              <a href="#howitworks" className="hover:text-gray-300">
                How It Works
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-gray-300">
                About
              </a>
            </li>
            <li>
              <a href="#features" className="hover:text-gray-300">
                Explore Features
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main id="home" className="bg-gray-100 py-16">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="text-center md:text-left md:w-1/2 space-y-6">
            <h1 className="text-4xl font-bold text-gray-800">
              Your AI-Powered Pet Care Companion
            </h1>
            <p className="text-gray-600">
              Smart, instant, and reliable pet health advice — anytime,
              anywhere. Let AI help you care for your pets with expert guidance,
              first-aid tips, and health monitoring.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href="/Frontend/SignIn/SignIn.html"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Chat Now
              </a>
              <a
                href="#features"
                className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              >
                Explore Features
              </a>
            </div>
          </div>
          <div className="mt-8 md:mt-0 md:w-1/2">
            <img
              src={welcomePagePic}
              alt="PetHealth AI Hero Image"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </main>

      <section id="howitworks" className="py-16 bg-white">
        <div className="container mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">How It Works</h2>
          <p className="text-gray-600 leading-relaxed">
            Getting started with PetHealth AI is easy and fast:
            <br />
            <br />
            <strong>1. Sign Up / Log In</strong> – Create an account or log in.
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
            <strong>5. Follow-Up Advice</strong> – Learn whether to monitor or
            visit a vet based on AI suggestions.
          </p>
        </div>
      </section>

      <section id="about" className="py-16 bg-gray-100">
        <div className="container mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">
            About PetHealth AI
          </h2>
          <p className="text-gray-600 leading-relaxed">
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
        </div>
      </section>

      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">Explore Features</h2>
          <p className="text-gray-600 leading-relaxed">
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
        </div>
      </section>
    </>
  );
}
