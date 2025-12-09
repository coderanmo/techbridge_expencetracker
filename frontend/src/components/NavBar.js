import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { BsSendFill } from "react-icons/bs";
import { HiMenu, HiX } from "react-icons/hi";
import LoadingBar from "react-top-loading-bar";
import { sendEmail } from "../utils/renders";

function NavBar({ data }) {
  const [isPopup, setIsPopup] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const ref = useRef(null);
  const navigate = useNavigate();

  const logoutHandle = () => {
    try {
      ref.current.staticStart();
      localStorage.removeItem("User");
      toast.success("Logout Successfully!!");
      ref.current.complete();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="sticky top-0 left-0 z-50 w-full bg-neutral-950 shadow-md">
      <LoadingBar color="orange" ref={ref} />

      <div className="flex items-center justify-between px-4 py-4 md:px-10">

        <div className="text-white font-bold font-Handjet tracking-wide
          text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          <span className="text-blue-500">TechBridge Expense</span> Tracker
        </div>

        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? <HiX /> : <HiMenu />}
        </button>

        <div className="hidden md:flex items-center gap-6">

          <button
            onClick={() => setIsPopup(true)}
            className="px-4 sm:px-6 py-2 sm:py-3 
              bg-neutral-800 text-white font-semibold rounded-xl border border-gray-600
              text-sm sm:text-base lg:text-lg"
          >
            Send Email
          </button>

          <button
            onClick={logoutHandle}
            className="px-5 sm:px-7 py-2 sm:py-3 
              rounded-full border-2 border-purple-500 
              text-purple-400 font-semibold 
              hover:bg-purple-600 hover:text-white transition
              text-sm sm:text-base lg:text-lg"
          >
            Logout
          </button>
        </div>
      </div>

      {mobileMenu && (
        <div className="md:hidden bg-neutral-900 px-5 py-4 space-y-4 text-white">

          <button
            onClick={() => setIsPopup(true)}
            className="w-full py-3 bg-neutral-800 rounded-lg 
              text-center font-semibold 
              text-base sm:text-lg"
          >
            Send Email
          </button>

          <button
            onClick={logoutHandle}
            className="w-full py-3 border border-purple-500 rounded-lg
              text-purple-300 font-semibold
              text-base sm:text-lg"
          >
            Logout
          </button>
        </div>
      )}

      {isPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
          <div className="bg-neutral-900 w-full max-w-sm p-6 rounded-2xl text-white shadow-xl relative">

            {/* Close Button */}
            <button
              onClick={() => setIsPopup(false)}
              className="absolute top-2 right-2 text-red-500 text-xl"
            >
              ✕
            </button>

            <h2 className="text-lg sm:text-xl font-bold text-center mb-3">
              Get Monthly Report
            </h2>

            {/* INPUT ROW */}
            <div className="flex gap-3 mt-4">
              <input
                type="email"
                placeholder="Enter Email"
                onChange={(e) => setUserEmail(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg text-black outline-none
                  text-sm sm:text-base"
              />

              <button
                onClick={() => sendEmail(userEmail, data)}
                className="bg-indigo-600 px-4 py-2 rounded-lg text-white
                  text-lg"
              >
                <BsSendFill />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-center mt-2 opacity-80">
              ** You'll receive your monthly expenses **
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
