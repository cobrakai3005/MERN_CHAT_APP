import React, { useContext, useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";

import useGetConversation from "../hooks/useGetConversation";
import { useUser } from "../Redux/userSlice";

function MessageContainer() {
  const { user, selectedUser } = useUser();

  return (
    <div className="md:flex-[0.6] sm:flex-[0.8] flex flex-col ">
      {!selectedUser ? (
        <NoChatSelected fullName={user?.fullName} />
      ) : (
        <>
          {/* Header */}
          <div className="bg-slate-500 px-4 py-2 mb-2 ">
            <span className="label-text">To: </span>{" "}
            <span className="text-gray-900  font-bold">
              {selectedUser?.fullName}
            </span>
          </div>

          {/* Message */}
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
}

export default MessageContainer;

const NoChatSelected = ({ fullName }) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
