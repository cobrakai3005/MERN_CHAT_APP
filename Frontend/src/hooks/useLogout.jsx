import { useContext, useState } from "react";
import toast from "react-hot-toast";

import {
  useUser,
  setUser,
  setConversations,
  setSelectedUser,
} from "../Redux/userSlice";
import { setMessages } from "../Redux/messageSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.success) {
        localStorage.removeItem("chat-user", null);
        navigate("/login");
        dispatch(setUser(null));
        dispatch(setConversations([]));
        dispatch(setMessages(""));
        dispatch(setSelectedUser(null));
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};
