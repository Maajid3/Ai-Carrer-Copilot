import supabaseClient from "../api/supabaseClient";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useUserContext } from "../context/useUserContext";

export default function Header() {
  const navigate = useNavigate();

  const { user, isLoading, isError } = useUserContext();
  const [signOutLoading, setSignOutLoading] = useState(false);

  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "User";

  const firstName = displayName.split(" ")[0];
  const initials = firstName.slice(0, 1).toUpperCase();
  const avatarUrl = user?.identities[0]?.identity_data?.avatar_url;

  const handleCheckLog = () => {
    if (isLoading) return;

    if (!user) {
      alert("Please Sign in");
      navigate("/login");
      return;
    }

    navigate("/chats");
  };

  const handleSignOut = async () => {
    setSignOutLoading(true);
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      alert("something went wrong")
    }

    setSignOutLoading(false);
  };

  return (
    <>
      <header className="flex w-full max-w-5xl flex-wrap items-center justify-between gap-y-2 rounded-3xl border border-[#adadad6c] bg-[#92929216] px-2.5 py-2 font-koltav backdrop-blur sm:px-4 sm:py-3">
        <div className="flex min-w-0 items-center gap-2">
          <img
            src="./logo.svg"
            alt="App logo"
            className="h-6 w-6 shrink-0 object-cover cursor-pointer sm:h-8 sm:w-8"
          />
          <p
            className="truncate bg-linear-to-r from-white via-[#5c9dff] to-[#47ffd7] bg-clip-text text-[0.62rem] text-transparent sm:text-[0.82rem] md:text-[0.9rem] cursor-pointer"
            onClick={() => navigate("/")}
          >
            AI Career Copilot
          </p>
        </div>
        <div className="ml-auto flex min-w-0 items-center gap-1 text-[0.7rem] outline-none sm:gap-2 sm:text-[0.85rem]">
          <button
            type="button"
            className="flex items-center gap-1 rounded-xl px-2 py-1 text-[0.58rem] transition-colors hover:bg-white/8 sm:px-2.5 sm:py-1.5 sm:text-[0.85rem]"
            onClick={handleCheckLog}
          >
            <span className="hidden sm:inline">Chats</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4 shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
              />
            </svg>
          </button>
          {isLoading ? (
            <span className="animate-pulse delay-100 text-[0.58rem] sm:text-[0.7rem]">
              Loading...
            </span>
          ) : user ? (
            <div className="flex min-w-0 items-center gap-1 rounded-2xl border border-white/10 bg-white/5 px-1.5 py-1 sm:gap-2 sm:px-2.5 sm:py-1.5">
              <div className="h-7 w-7 shrink-0 overflow-hidden rounded-full border border-cyan-300/25 sm:h-9 sm:w-9">
                {avatarUrl ? (
                  <img
                    className="h-full w-full rounded-full object-cover"
                    src={avatarUrl}
                    alt="user profile image"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-cyan-500/20 text-[0.7rem] font-bold text-cyan-100">
                    {initials}
                  </div>
                )}
              </div>
              <div className="hidden leading-tight sm:block">
                <span className="text-[0.55rem] text-neutral-300 sm:text-[0.62rem]">
                  Hello,
                </span>
                <p className="max-w-28 truncate text-[0.62rem] font-semibold text-cyan-100 sm:text-[0.78rem]">
                  {firstName}!
                </p>
              </div>
              <button
                className="rounded-xl border border-red-300/25 bg-red-500/15 px-2 py-1 text-[0.5rem] uppercase tracking-[0.08em] text-red-100 transition-colors hover:bg-red-500/25 disabled:opacity-60 sm:text-[0.6rem]"
                onClick={handleSignOut}
                disabled={signOutLoading}
              >
                {signOutLoading ? (
                  "..."
                ) : (
                  <span>
                    <span className="sm:hidden">Out</span>
                    <span className="hidden sm:inline">Logout</span>
                  </span>
                )}
              </button>
            </div>
          ) : (
            <button
              className="rounded-xl px-2 py-1 text-[0.58rem] hover:bg-white/8 cursor-pointer sm:px-2.5 sm:py-1.5 sm:text-[0.85rem]"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>
      </header>
    </>
  );
}
