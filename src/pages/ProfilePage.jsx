import Navbar from "../components/NavBar";

import React, { useState, useEffect } from "react";

const ProfilePage = () => {
  const currUser = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <Navbar />
      <div className="flex gap-4 min-h-[86dvh] max-w-[1400px] relative top-20 left-[50%] -translate-x-1/2 ">
        <div className="flex-1/4 min-w-80 p-4 bg-[#2b3d42] border border-[#3b5055] rounded-2xl">
          <h1 className="font-semibold text-xl ">
            {currUser ? currUser.username : "Welcome, Guest"}
          </h1>
          <p className="text-xs text-white/45">
            {currUser ? currUser.email : "Welcome, Guest"}
          </p>
          <h3 className="my-4">My Pets</h3>
          <div className="border border-[#6ddec0] text-[#6ddec0] hover:bg-[#6ddec0] hover:text-black duration-200 hover:-translate-y-1 cursor-pointer rounded-xl w-fit px-4 py-3 text-sm">
            + Add Pet
          </div>
          <div className="my-6 bg-white/20 h-[0.2px]"></div>
          <div className="text-[#203135] bg-[#6ddec0] rounded-xl text-center py-3 font-bold text-sm duration-200 hover:-translate-y-1 cursor-pointer">
            Edit Profile
          </div>
        </div>
        <div className="flex-3/4 bg-[#2b3d42] border border-[#3b5055] rounded-2xl"></div>
      </div>
    </div>
  );
};

export default ProfilePage;
