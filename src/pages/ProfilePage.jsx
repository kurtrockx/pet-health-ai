import Navbar from "../components/NavBar";
import React, { useState, useEffect } from "react";

const ProfilePage = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const currUser = JSON.parse(localStorage.getItem("user"));
  const [pets, setPets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editProfile, setEditProfile] = useState({
    firstName: currUser?.firstName || "",
    lastName: currUser?.lastName || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [manage, setManage] = useState(false);

  const handleSaveEdit = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/pets/${selectedPet._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(selectedPet),
        }
      );

      if (!res.ok) throw new Error("Failed to update pet");

      const updatedPet = await res.json();

      setPets((prev) =>
        prev.map((p) => (p._id === updatedPet._id ? updatedPet : p))
      );
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating pet:", error);
    }
  };

  const handleDeletePet = async (petToDelete) => {
    const confirmDelete = confirm(
      `Are you sure you want to delete ${petToDelete.petName}?`
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `http://localhost:3000/api/pets/${petToDelete._id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Failed to delete pet");

      setPets(pets.filter((p) => p._id !== petToDelete._id));
    } catch (error) {
      console.error("Error deleting pet:", error);
    }
  };

  const handleSaveProfileChanges = async () => {
    if (editProfile.newPassword !== editProfile.confirmPassword) {
      alert("New passwords do not match.");
      return;
    }

    const currUser = JSON.parse(localStorage.getItem("user"));
    if (!currUser || !currUser.id) {
      alert("Logged-in user info missing. Please log in again.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/updateProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currUser.id, // Make sure your backend expects this!
          ...editProfile,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Server error: ${res.status} - ${errorText}`);
      }

      const data = await res.json();

      if (data && data.success && data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Profile updated successfully!");
        setShowProfileModal(false);
        window.location.reload();
      } else {
        throw new Error("Invalid response from server.");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      alert("Error updating profile: " + error.message);
    }
  };
  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    setEditProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [petImage, setPetImage] = useState(null);
  const [petDetails, setPetDetails] = useState({
    petName: "",
    petType: "",
    breed: "",
    age: "",
    weight: "",
    gender: "",
  });

  const fetchPets = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/pets?userId=${currUser.id}`
      );
      const data = await res.json();
      setPets(data.pets);
    } catch (err) {
      console.error("Error fetching pets:", err);
    }
  };

  useEffect(() => {
    if (currUser?.id) {
      fetchPets();
    }
  }, [currUser]);

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

  const handleAddPet = async () => {
    try {
      let imageUrl = null;

      if (petImage) {
        try {
          const formData = new FormData();
          formData.append("image", petImage);

          const res = await fetch(
            `https://api.imgbb.com/1/upload?key=5847a1fb342e1994812f748886598a1b`,
            {
              method: "POST",
              body: formData,
            }
          );

          const data = await res.json();
          if (!data.success) {
            console.error("Image upload failed:", data);
            alert("Image upload failed. Try again.");
          } else {
            imageUrl = data.data.url;
          }
        } catch (uploadError) {
          console.error("Image upload error:", uploadError);
          alert("An error occurred while uploading the image.");
        }
      }

      const response = await fetch("http://localhost:3000/api/addPet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...petDetails,
          userId: currUser.id,
          imageUrl, // ✅ Send image URL to backend
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("✅ Pet added:", result.pet);
      } else {
        console.warn("⚠️ Failed to add pet:", result.message);
      }

      handleModalClose();
    } catch (err) {
      console.error("Error adding pet:", err);
    }
  };

  const [highlightedPet, setHighlightedPet] = useState(null);

  const handlePetSelection = (petName) => {
    setHighlightedPet(petName);
    setTimeout(() => setHighlightedPet(null), 2000); // Remove highlight after 2 seconds
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col lg:flex-row gap-4 min-h-[86dvh] max-w-[1400px] relative top-20 left-1/2 -translate-x-1/2 px-4 lg:px-0">
        <div className="flex-[1] min-w-80 px-4 py-6 bg-[#2b3d42] border border-[#3b5055] rounded-2xl">
          <h1 className="font-semibold text-xl lg:text-2xl">
            {currUser ? currUser.username : "Welcome, Guest"}
          </h1>
          <p className="text-xs text-white/45">
            {currUser ? currUser.email : "Welcome, Guest"}
          </p>
          <h3 className="my-4 text-lg">My Pets</h3>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pets.length === 0 ? (
              <p className="text-white/40 text-sm italic col-span-2">
                No pets added yet.
              </p>
            ) : (
              pets.map((pet) => (
                <div
                  key={pet._id || pet.id || pet.petName}
                  className={`rounded-[100%] overflow-hidden border-2 ${
                    highlightedPet === pet.petName
                      ? "border-[#fb7a61] shadow-[0_0_1rem_#fb7a61]"
                      : "border-[#3b5055]"
                  } hover:border-[#fb7a61] hover:shadow-[0_0_1rem_#fb7a61] duration-200 cursor-pointer bg-[#213135] text-sm size-20`}
                  onClick={() => handlePetSelection(pet.petName)}
                >
                  {pet.imageUrl && (
                    <img
                      src={pet.imageUrl}
                      alt={pet.petName}
                      className="object-cover min-h-full"
                    />
                  )}
                </div>
              ))
            )}
          </div>

          <div
            className="border border-[#6ddec0] text-[#6ddec0] hover:bg-[#6ddec0] hover:text-black duration-200 hover:-translate-y-1 cursor-pointer rounded-xl w-fit px-4 py-3 text-sm mt-4"
            onClick={() => setShowModal(true)}
          >
            + Add Pet
          </div>

          <div className="my-6 bg-white/20 h-[0.2px]"></div>

          <div
            onClick={() => {
              setShowProfileModal(true);
            }}
            className="text-[#203135] bg-[#6ddec0] rounded-xl text-center py-3 font-bold text-sm duration-200 hover:-translate-y-1 cursor-pointer"
          >
            Edit Profile
          </div>
        </div>

        <div className="flex-[3] flex flex-col gap-4">
          <div className="p-6 bg-[#2b3d42] border border-[#3b5055] rounded-2xl">
            <h1 className="text-2xl lg:text-3xl font-semibold">
              Personal Information
            </h1>
            <div className="my-3 bg-white/20 h-[0.2px]"></div>
            <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mt-6">
              <div className="flex-1 flex flex-col gap-2">
                <h3 className="font-medium text-[#6ddec0]">Full Name</h3>
                <div className="bg-[#213135] text-base px-4 py-2 rounded-lg border border-white/20">
                  {currUser?.firstName + " " + currUser?.lastName}
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <h3 className="font-medium text-[#6ddec0]">Email</h3>
                <div className="bg-[#213135] text-base px-4 py-2 rounded-lg border border-white/20">
                  {currUser?.email}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#2b3d42] border border-[#3b5055] rounded-2xl h-full p-6">
            {pets.length === 0 ? (
              <p className="text-white/40 text-sm italic">No pets added yet.</p>
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <div className="text-xl lg:text-2xl font-bold">My Pets</div>
                  <div
                    onClick={() => setManage((m) => !m)}
                    className="border border-[#6ddec0] text-[#6ddec0] py-2 px-4 text-xs rounded-2xl hover:bg-[#6ddec0] duration-200 hover:text-[#2b3d42] cursor-pointer hover:-translate-y-1 font-medium"
                  >
                    Manage
                  </div>
                </div>
                <div className="my-6 bg-white/20 h-[0.2px]"></div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {pets.map((pet) => (
                    <div
                      key={pet._id || pet.id || pet.petName}
                      className={`p-3 rounded-lg duration-100 border ${
                        highlightedPet === pet.petName
                          ? "border-[#fb7a61] shadow-[0_0_1rem_#fb7a61]"
                          : "border-[#3b5055]"
                      } bg-[#213135] text-sm relative hover:border-[#6ddec0] duration-400`}
                    >
                      {manage && (
                        <div className="flex justify-end right-2 top-2 absolute mt-3 gap-2">
                          <div
                            className="text-xs px-2 py-1 rounded-md border hover:bg-[#6ddec0] hover:text-[#203135] duration-200 cursor-pointer hover:-translate-y-1 border-[#6ddec0] text-[#6ddec0] text-shadow-sm font-semibold"
                            onClick={() => {
                              setSelectedPet(pet);
                              setShowEditModal(true);
                            }}
                          >
                            Edit
                          </div>
                          <div
                            className="text-xs px-2 py-1 rounded-md border hover:bg-red-400 hover:text-red-900 duration-200 cursor-pointer hover:-translate-y-1 border-red-400 text-red-400 text-shadow-sm font-semibold"
                            onClick={() => handleDeletePet(pet)}
                          >
                            Delete
                          </div>
                        </div>
                      )}

                      {pet.imageUrl && (
                        <img
                          src={pet.imageUrl}
                          alt={pet.petName}
                          className="w-full h-40 object-cover rounded-md mb-2"
                        />
                      )}
                      <div className="font-semibold rounded-2xl bg-[#6ddec0] w-fit px-4 py-2 text-[#213135]">
                        {pet.petType}
                      </div>
                      <div className="font-semibold text-white my-2">
                        {pet.petName}
                      </div>
                      <div className="text-white/40 text-xs my-1">
                        <span className="font-semibold text-white/60">
                          Breed:
                        </span>{" "}
                        {pet.breed || "Unknown Breed"}
                      </div>
                      <div className="text-white/40 text-xs my-1">
                        <span className="font-semibold text-white/60">
                          Age:
                        </span>{" "}
                        {pet.age || "?"} years
                      </div>
                      <div className="text-white/40 text-xs my-1">
                        <span className="font-semibold text-white/60">
                          Weight:
                        </span>{" "}
                        {pet.weight || "?"} kg
                      </div>
                      <div className="text-white/40 text-xs my-1">
                        <span className="font-semibold text-white/60">
                          Gender:
                        </span>{" "}
                        {pet.gender || "?"}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[100000]">
          <div className="p-6 rounded-lg w-[50vw] bg-[#2b3d42] max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Add Pet</h2>
            <div className="flex flex-col gap-4">
              {[
                { label: "Pet Name", name: "petName", type: "text" },
                { label: "Breed (optional)", name: "breed", type: "text" },
                { label: "Age", name: "age", type: "number" },
                { label: "Weight (kg/lbs)", name: "weight", type: "number" },
              ].map(({ label, name, type }) => (
                <div key={name} className="flex flex-col">
                  <label className="text-[#6ddec0] mb-1">{label}</label>
                  <input
                    type={type}
                    name={name}
                    value={petDetails[name]}
                    onChange={handleInputChange}
                    className="border border-[#3a5055] px-4 py-2 rounded-lg bg-[#213135]"
                  />
                </div>
              ))}

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

              <label className="text-[#6ddec0] mt-1">
                Upload Image (optional)
              </label>
              <input
                className="border border-white/40 text-white/80 cursor-pointer hover:brightness-75"
                type="file"
                accept="image/*"
                onChange={(e) => setPetImage(e.target.files[0])}
              />
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
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[100000]">
          <div className="p-6 rounded-lg w-[50vw] bg-[#2b3d42] max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label className="text-[#6ddec0] mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={editProfile.firstName}
                  onChange={handleProfileInputChange}
                  className="border border-[#3a5055] px-4 py-2 rounded-lg bg-[#213135]"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[#6ddec0] mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={editProfile.lastName}
                  onChange={handleProfileInputChange}
                  className="border border-[#3a5055] px-4 py-2 rounded-lg bg-[#213135]"
                />
              </div>

              <div className="my-2 border-t border-white/10"></div>

              <h3 className="text-[#6ddec0] font-semibold text-lg">
                Change Password
              </h3>

              <div className="flex flex-col">
                <label className="text-[#6ddec0] mb-1">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={editProfile.currentPassword}
                  onChange={handleProfileInputChange}
                  className="border border-[#3a5055] px-4 py-2 rounded-lg bg-[#213135]"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[#6ddec0] mb-1">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={editProfile.newPassword}
                  onChange={handleProfileInputChange}
                  className="border border-[#3a5055] px-4 py-2 rounded-lg bg-[#213135]"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[#6ddec0] mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={editProfile.confirmPassword}
                  onChange={handleProfileInputChange}
                  className="border border-[#3a5055] px-4 py-2 rounded-lg bg-[#213135]"
                />
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <div
                className="px-4 py-2 rounded-lg border border-red-400 text-red-400 duration-200 hover:-translate-y-1 hover:text-white hover:bg-red-400 cursor-pointer"
                onClick={() => setShowProfileModal(false)}
              >
                Cancel
              </div>
              <div
                className="px-4 py-2 bg-[#6ddec0] rounded-lg text-[#203135] font-semibold duration-200 hover:-translate-y-1 hover:brightness-70 cursor-pointer"
                onClick={handleSaveProfileChanges}
              >
                Save Changes
              </div>
            </div>
          </div>
        </div>
      )}
      {showEditModal && selectedPet && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[100000]">
          <div className="p-6 rounded-lg w-[50vw] bg-[#2b3d42] max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Edit Pet</h2>

            <div className="flex flex-col gap-4">
              {[
                { label: "Pet Name", name: "petName", type: "text" },
                { label: "Breed", name: "breed", type: "text" },
                { label: "Age", name: "age", type: "number" },
                { label: "Weight", name: "weight", type: "number" },
              ].map(({ label, name, type }) => (
                <div key={name} className="flex flex-col">
                  <label className="text-[#6ddec0] mb-1">{label}</label>
                  <input
                    type={type}
                    name={name}
                    value={selectedPet[name] || ""}
                    onChange={(e) =>
                      setSelectedPet({ ...selectedPet, [name]: e.target.value })
                    }
                    className="border border-[#3a5055] px-4 py-2 rounded-lg bg-[#213135]"
                  />
                </div>
              ))}

              <div className="flex flex-col">
                <label className="text-[#6ddec0] mb-1">Pet Type</label>
                <select
                  name="petType"
                  value={selectedPet.petType}
                  onChange={(e) =>
                    setSelectedPet({ ...selectedPet, petType: e.target.value })
                  }
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
                <label className="text-[#6ddec0] mb-1">Gender</label>
                <select
                  name="gender"
                  value={selectedPet.gender}
                  onChange={(e) =>
                    setSelectedPet({ ...selectedPet, gender: e.target.value })
                  }
                  className="border border-[#3a5055] px-4 py-2 rounded-lg bg-[#213135] text-white/70"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Unknown">Unknown</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <div
                className="px-4 py-2 rounded-lg border border-red-400 text-red-400 duration-200 hover:-translate-y-1 hover:text-white hover:bg-red-400 cursor-pointer"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </div>
              <div
                className="px-4 py-2 bg-[#6ddec0] rounded-lg text-[#203135] font-semibold duration-200 hover:-translate-y-1 hover:brightness-70 cursor-pointer"
                onClick={handleSaveEdit}
              >
                Save Changes
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
