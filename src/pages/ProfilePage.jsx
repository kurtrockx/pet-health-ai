import Navbar from "../components/NavBar";
import React, { useState } from "react";

const ProfilePage = () => {
  const currUser = JSON.parse(localStorage.getItem("user"));
  const [showModal, setShowModal] = useState(false);
  const [petDetails, setPetDetails] = useState({
    petName: "",
    petType: "",
    breed: "",
    age: "",
    weight: "",
    gender: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleModalClose = () => {
    setShowModal(false);
    setPetDetails({
      petName: "",
      petType: "",
      breed: "",
      age: "",
      weight: "",
      gender: "",
    });
  };

  const handleAddPet = () => {
    console.log("Pet Details:", petDetails);
    handleModalClose();
  };

  return (
    <div>
      <Navbar />
      <div className="flex gap-4 min-h-[86dvh] max-w-[1400px] relative top-20 left-[50%] -translate-x-1/2 ">
        <div className="flex-1/4 min-w-80 px-4 py-6 bg-[#2b3d42] border border-[#3b5055] rounded-2xl">
          <h1 className="font-semibold text-xl ">
            {currUser ? currUser.username : "Welcome, Guest"}
          </h1>
          <p className="text-xs text-white/45">
            {currUser ? currUser.email : "Welcome, Guest"}
          </p>
          <h3 className="my-4">My Pets</h3>
          <div
            className="border border-[#6ddec0] text-[#6ddec0] hover:bg-[#6ddec0] hover:text-black duration-200 hover:-translate-y-1 cursor-pointer rounded-xl w-fit px-4 py-3 text-sm"
            onClick={() => setShowModal(true)}
          >
            + Add Pet
          </div>
          <div className="my-6 bg-white/20 h-[0.2px]"></div>
          <div className="text-[#203135] bg-[#6ddec0] rounded-xl text-center py-3 font-bold text-sm duration-200 hover:-translate-y-1 cursor-pointer">
            Edit Profile
          </div>
        </div>
        <div className="flex-3/4 flex gap-4 flex-col">
          <div className="flex-1/4 p-6 bg-[#2b3d42] border border-[#3b5055] rounded-2xl">
            <h1 className="text-3xl font-semibold">Personal Information</h1>
            <div className="my-3 bg-white/20 h-[0.2px]"></div>
            <div className="flex justify-between items-center gap-8 mt-6">
              <div className="flex-1/2 flex flex-col gap-2">
                <h3 className="font-medium text-[#6ddec0]">Full Name</h3>
                <div className="bg-[#213135] text-base px-4 py-2 rounded-lg border border-white/20">
                  {currUser.firstName + " " + currUser.lastName}
                </div>
              </div>
              <div className="flex-1/2 flex flex-col gap-2">
                <h3 className="font-medium text-[#6ddec0]">Email</h3>
                <div className="bg-[#213135] text-base px-4 py-2 rounded-lg border border-white/20">
                  {currUser.email}
                </div>
              </div>
            </div>
          </div>
          <div className="flex-3/4 bg-[#2b3d42] border border-[#3b5055] rounded-2xl"></div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex justify-center items-center z-100000">
          <div className="p-6 rounded-lg w-[50vw] bg-[#2b3d42]">
            <h2 className="text-xl font-semibold mb-4">Add Pet</h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label className="text-[#6ddec0] mb-1">Pet Name</label>
                <input
                  type="text"
                  name="petName"
                  value={petDetails.petName}
                  onChange={handleInputChange}
                  className="border border-[#3a5055] px-4 py-2 rounded-lg bg-[#213135]"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[#6ddec0] mb-1">Pet Type</label>
                <select
                  name="petType"
                  value={petDetails.petType}
                  onChange={handleInputChange}
                  className="border border-[#3a5055] px-4 py-2 rounded-lg bg-[#213135] text-white/70"
                >
                  <option value="">Select Pet Type</option>
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Bird">Bird</option>
                  <option value="Fish">Fish</option>
                  <option value="Reptile">Reptile</option>
                  <option value="Small Mammal">Small Mammal</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-[#6ddec0] mb-1">Breed (optional)</label>
                <input
                  type="text"
                  name="breed"
                  value={petDetails.breed}
                  onChange={handleInputChange}
                  className="border border-[#3a5055] px-4 py-2 rounded-lg bg-[#213135]"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[#6ddec0] mb-1">Age</label>
                <input
                  type="number"
                  name="age"
                  value={petDetails.age}
                  onChange={handleInputChange}
                  className="border border-[#3a5055] px-4 py-2 rounded-lg bg-[#213135]"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[#6ddec0] mb-1">Weight (kg/lbs)</label>
                <input
                  type="number"
                  name="weight"
                  value={petDetails.weight}
                  onChange={handleInputChange}
                  className="border border-[#3a5055] px-4 py-2 rounded-lg bg-[#213135]"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[#6ddec0] mb-1">Gender</label>
                <select
                  name="gender"
                  value={petDetails.gender}
                  onChange={handleInputChange}
                  className="border border-[#3a5055] px-4 py-2 rounded-lg bg-[#213135] text-white/70"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Unknown">Unknown</option>
                </select>
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <div
                className="px-4 py-2 rounded-lg border border-red-400 text-red-400 duration-200 hover:-translate-y-1 hover:text-white hover:bg-red-400 cursor-pointer"
                onClick={handleModalClose}
              >
                Cancel
              </div>
              <div
                className="px-4 py-2 bg-[#6ddec0] rounded-lg text-[#203135] font-semibold duration-200 hover:-translate-y-1 hover:brightness-70 cursor-pointer"
                onClick={handleAddPet}
              >
                Add Pet
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
