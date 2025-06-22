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
    <header className="fixed top-0 left-0 w-full bg-[#203134] shadow-md z-50">
      <nav className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <Link to="/home">
            <img
              src={petHealthLogo}
              alt="PetHealth AI Logo"
              className="h-10 w-auto b"
            />
          </Link>
        </div>
        <ul className="flex items-center space-x-4">
          <li>
            <Link
              to="/chat"
              className="text-white text-sm hover:bg-[#294344] hover:text-[#59cabc] px-3 py-1.5 rounded-2xl transition"
            >
              Chat
            </Link>
          </li>
          <li>
            <Link
              to="/guidance"
              className="text-white text-sm hover:bg-[#294344] hover:text-[#59cabc] px-3 py-1.5 rounded-2xl transition"
            >
              Guidance
            </Link>
          </li>
          <li>
            {loggedInUser && (
              <Link
                to="/profile"
                className="text-white text-sm hover:bg-[#294344] hover:text-[#59cabc] px-3 py-1.5 rounded-2xl transition"
              >
                Profile
              </Link>
            )}
          </li>
          {loggedInUser ? (
            <div
              onClick={handleLogout}
              className="text-black px-4 py-2 rounded-3xl bg-[#6ddec0] transition cursor-pointer duration-200 hover:brightness-90 text-sm"
            >
              Logout
            </div>
          ) : (
            <div
              onClick={gotoSignin}
              className="text-black px-4 py-2 rounded-3xl bg-[#6ddec0] transition cursor-pointer duration-200 hover:brightness-90 text-sm"
            >
              Sign In
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
}
