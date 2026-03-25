import supabaseClient from "../api/supabaseClient";
import logo from "/logo.svg";
import googleIcon from "../assets/google.svg";
import { useState } from "react";

export default function AuthPage() {
  const [providerError, setProviderError] = useState(false);
  const handleGoogleLogin = async () => {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) setProviderError(true);
    if (data) setProviderError(false);
  };

  return (
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
  );
}
