import React from "react";
import Message from "./Message";
import useGetMessages from "../hooks/useGetMessages";
import { useSelector } from "react-redux";

export default function Messages() {
  const { loading } = useGetMessages();
  const { messages } = useSelector((state) => state.message);

  return (
    <div className="px-4 flex-1 overflow-auto ">
      {messages.length === 0 && (
        <p className=" text-center text-md tet-white font-mono">
          Start conversation with your friend
        </p>
      )}
      {messages.length > 0 &&
        messages.map((msg) => <Message key={msg?._id} message={msg} />)}
    </div>
  );
}
