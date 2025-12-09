import React, { useEffect, useState, useRef } from "react";
import { axiosClient } from "../utils/axiosClient";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

function Signup() {
  document.title = "TechBridge | SignUp";
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    if (localStorage.getItem("User")) {
      navigate("/");
    }
  }, [navigate]);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      ref.current.staticStart();
      await axiosClient.post("/auth/signup", {
        username,
        email,
        password,
      });
      toast.success("Registered Successfully!!");
      ref.current.complete();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 
                    w-full min-h-screen flex flex-col md:flex-row items-center justify-center relative">
      <LoadingBar color="orange" ref={ref} />

      <div className="hidden md:flex w-1/2 h-full flex-col justify-center pl-16">
        <h1 className="text-yellow-400 font-extrabold tracking-tight 
                       text-4xl lg:text-6xl xl:text-7xl">
          TechBridge
        </h1>

        <h2 className="text-white font-bold tracking-tight 
                       text-3xl lg:text-5xl xl:text-6xl leading-tight mt-3">
          Manage Your  
          <span className="text-yellow-400"> Expenses</span>
          <br /> Effortlessly
        </h2>

        <p className="text-gray-300 text-lg mt-4 w-4/5">
          A simple, clean & powerful expense tracker built by TechBridge to help you
          stay in control of your money.
        </p>
      </div>

      <div className="w-full md:w-1/2 flex justify-center items-center p-6">
        <div
          className="backdrop-blur-xl bg-white/10 border border-white/20
                      rounded-3xl shadow-2xl p-8 sm:p-10 w-full max-w-md flex flex-col gap-6"
        >
          <h1 className="text-yellow-400 lg:text-3xl text-[25px] font-extrabold text-center md:hidden">
            TechBridge
          </h1>

          <h2 className="text-white text-2xl sm:text-4xl  font-bold text-center">
            Create Account
          </h2>

          <input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full h-12 px-4 rounded-xl bg-white/20 text-white placeholder-gray-300
                       focus:bg-white/30 transition-all outline-none"
          />

          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 px-4 rounded-xl bg-white/20 text-white placeholder-gray-300
                       focus:bg-white/30 transition-all outline-none"
          />

          <input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-12 px-4 rounded-xl bg-white/20 text-white placeholder-gray-300
                       focus:bg-white/30 transition-all outline-none"
          />

          <button
            onClick={submitForm}
            className="w-full h-12 rounded-xl bg-yellow-500 text-black font-bold text-lg
                       hover:bg-yellow-400 transition-all"
          >
            Sign Up
          </button>

          <p className="text-gray-200 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-yellow-400 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
