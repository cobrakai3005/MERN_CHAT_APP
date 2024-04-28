import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { useUser, setSelectedUser } from "../Redux/userSlice";
import { setMessages } from "../Redux/messageSlice";
import { useDispatch } from "react-redux";

export default function useGetMessages() {
  const [loading, setLoading] = useState(false);
  const { user, selectedUser } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/messages/${selectedUser._id}`);
        const data = await res.json();

        dispatch(setMessages(data));
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (selectedUser?._id) getMessages();
  }, [selectedUser._id, setSelectedUser]);

  return { loading };
}
