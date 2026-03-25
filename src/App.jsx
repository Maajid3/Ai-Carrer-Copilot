import InputBar from "./components/InputBar";
import Header from "./components/Header";
import Orb from "./components/Orb";
import { Route, Routes } from "react-router";
import AuthPage from "./components/AuthPage";
import AiChats from "./components/AiChats";
import DetailedChatView from "./components/DetailedChatView";

function App() {
  return (
    <main className="relative flex h-screen flex-col items-center w-full bg-[#080808] text-white font-nunito overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Orb
          hoverIntensity={2}
          rotateOnHover
          hue={0}
          forceHoverState={false}
          backgroundColor="#000000"
        />
      </div>

      <div className="relative z-10 flex h-full w-full flex-col items-center pointer-events-none px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex justify-center items-center pointer-events-auto w-full shrink-0">
          <Header />
        </div>
        <div className="mt-3 flex flex-1 min-h-0 w-full justify-center pointer-events-auto sm:mt-4 md:w-[55%] lg:w-2/5">
          <div className="flex h-full min-h-0 w-full flex-col items-center gap-2 overflow-hidden rounded-2xl border border-[#adadad6c] bg-[#92929216] px-2 py-2 backdrop-blur sm:px-3 sm:py-3">
            <Routes>
              <Route path="/" element={<InputBar />} />
              <Route path="login" element={<AuthPage />} />
              <Route path="chats" element={<AiChats />} />
              <Route path="chat-preview/:id" element={<DetailedChatView />} />
            </Routes>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
