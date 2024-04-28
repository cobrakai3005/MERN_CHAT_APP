import React, { useContext, useEffect, useRef } from "react";
// import UserContext from "../context/UserContext";
import { useUser } from "../Redux/userSlice";

export default function Message({ message }) {
  const { selectedUser, user } = useUser();
  const shakeClase = message.shouldShake ? "shake" : "";

  const scroll = useRef();
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <div
      className={`chat ${
        message?.senderId === user._id ? "chat-end" : "chat-start"
      } my-3`}
      ref={scroll}
    >
      <div className="chat-image avatar ">
        <div className="w-10 rounded-full">
          <img
            src={
              message?.senderId === user._id
                ? `${user?.profilePic}`
                : `${selectedUser?.profilePic}`
            }
            alt="Tailwind css chaht bubble component"
          />
        </div>
      </div>
      <div
        className={`chat-bubble ${shakeClase} text-white ${
          message?.senderId === user._id ? "bg-gray-700" : "bg-gray-400"
        } `}
      >
        {message?.message}
      </div>
    </div>
  );
}
