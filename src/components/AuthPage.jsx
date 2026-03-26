import supabaseClient from "../api/supabaseClient";
import logo from "/logo.svg";
import googleIcon from "../assets/google.svg";
import { useState } from "react";
import { useLocation } from "react-router";

export default function AuthPage() {
  const [providerError, setProviderError] = useState(false);
  const handleGoogleLogin = async () => {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) setProviderError(true);
    if (data) setProviderError(false);
  };

  const location = useLocation();
  const message = location.state?.message;

  return (
    <>
      <div>
        {" "}
        {message && (
          <p className="bg-[#ff00002c] px-2 py-1 flex items-center gap-2 rounded-2xl border border-white/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 36 36"
            >
              <title xmlns="">alert-line</title>
              <path
                fill="currentColor"
                d="M18 2.5c-8.82 0-16 6.28-16 14s7.18 14 16 14a18 18 0 0 0 4.88-.68l5.53 3.52a1 1 0 0 0 1.54-.84v-6.73a13 13 0 0 0 4-9.27C34 8.78 26.82 2.5 18 2.5m10.29 22.11a1 1 0 0 0-.32.73v5.34l-4.38-2.79a1 1 0 0 0-.83-.11a16 16 0 0 1-4.76.72c-7.72 0-14-5.38-14-12s6.28-12 14-12s14 5.38 14 12a11.08 11.08 0 0 1-3.71 8.11"
                className="clr-i-outline clr-i-outline-path-1"
              />
              <path
                fill="currentColor"
                d="M18 20.63a1 1 0 0 0 1-1V8.48a1 1 0 1 0-2 0v11.13a1 1 0 0 0 1 1.02"
                className="clr-i-outline clr-i-outline-path-2"
              />
              <circle
                cx="18"
                cy="24.04"
                r="1.33"
                fill="currentColor"
                className="clr-i-outline clr-i-outline-path-3"
              />
              <path fill="none" d="M0 0h36v36H0z" />
            </svg>
            {message}
          </p>
        )}
      </div>
      <div className="bg-gray-800/20 backdrop-blur-2xl rounded-2xl border border-white/10 w-[70%]  h-1/2 mt-20 flex flex-col justify-around items-center hover:bg-linear-to-r from-[#00d0ff14] via-[#a200ff53] to-[#00fbff0c] ">
        <h2>Ai Carrer Copilot</h2>
        <img className="w-1/2 h-1/2" src={logo} alt="logo" />
        <div className="p-[0.17em] bg-linear-to-r from-[#f00] via-[#2bff00] to-[#007bff] rounded-3xl transition-transform duration-400 hover:-translate-y-1">
          <button
            className="flex items-center gap-2 bg-white rounded-2xl px-4 py-1 text-black cursor-pointer "
            onClick={handleGoogleLogin}
          >
            <img src={googleIcon} alt="login with google" />
            Login with google
          </button>
        </div>
        {providerError ? (
          <span>Something Went Wrong! Please try again</span>
        ) : null}
      </div>
    </>
  );
}
