import React, { useState } from "react";

import { toast } from "react-hot-toast";
import { useUser } from "../Redux/userSlice";
import { setMessages } from "../Redux/messageSlice";
import { useDispatch, useSelector } from "react-redux";

export default function useSendMessage() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.message);
  const { selectedUser } = useUser();
  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/messages/send/${selectedUser._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      console.log(data);

      dispatch(setMessages([...messages, data?.newMessage]));
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, sendMessage };
}
