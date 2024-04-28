import React from "react";
import Conversation from "./Conversation";
import useGetConversation from "../hooks/useGetConversation";
import { useUser } from "../Redux/userSlice";

export default function Conversations() {
  const { loading } = useGetConversation();
  const { conversations } = useUser();

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {loading ? <span className="loading loading-spinner"></span> : null}

      {conversations &&
        conversations.map((convo, idx) => (
          <Conversation
            key={convo._id}
            conversation={convo}
            lastIdx={idx === convo.length - 1}
          />
        ))}
    </div>
  );
}
