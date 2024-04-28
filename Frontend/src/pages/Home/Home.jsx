import React, { useContext, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import MessageContainer from "../../messages/MessageContainer";
import UserContext from "../../context/UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useUser } from "../../Redux/userSlice";
import { setUser } from "../../Redux/userSlice";

export default function Home() {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
  }, [user, setUser]);
  return (
    <div className="flex sm:w-full md:w-[80%] h-[680px] mx-auto   rounded overflow-hidden bg-gray-400 bg-clip-padding border-filter backdrop-blur-lg bg-opacity-0">
      <Sidebar />
      <MessageContainer />
    </div>
  );
}
