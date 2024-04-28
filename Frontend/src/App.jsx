import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="flex flex-col justify-center items-center h-screen p-4">
      <Home />
    </div>
  );
}

export default App;
