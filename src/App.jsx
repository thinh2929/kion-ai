import "./App.css";
import { useState, useRef, useEffect } from "react";
import Header from "./components/ui/Header";
import MemeTracker from "./pages/MemeTracker";
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import SideBar from "./components/ui/SideBar";

function App() {
  const [emotion, setEmotion] = useState("");
  const [openSideBar, setOpenSideBar] = useState(false);

  return (
    <div className="w-screen h-screen bg-gray-950 flex flex-col">
      <Header openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />
      {openSideBar && <SideBar />}
      <Routes>
        <Route path="/" element={<MemeTracker emotion={emotion} setEmotion={setEmotion} />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
