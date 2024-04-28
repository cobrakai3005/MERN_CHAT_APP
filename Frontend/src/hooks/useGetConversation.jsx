import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useUser, setConversations } from "../Redux/userSlice";
import { useDispatch } from "react-redux";

export default function useGetConversation() {
  const [loading, setLoading] = useState(false);
  const { conversations } = useUser();

  const dispatch = useDispatch();
  useEffect(() => {
    const getConversation = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users");
        const data = await res.json();

        if (!data.success) {
          throw Error(data.message);
        }
        dispatch(setConversations(data?.data));
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getConversation();
  }, []);
  return { loading };
}
