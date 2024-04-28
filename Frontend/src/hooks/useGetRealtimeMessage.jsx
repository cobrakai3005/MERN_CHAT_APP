import React, { useContext, useEffect } from "react";
import { SocketContext } from "../context/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../Redux/messageSlice";
import notificationSound from "../assets/sounds/notification.mp3";

export default function useGetRealtimeMessage() {
  const { socket } = useContext(SocketContext);
  const { messages } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    socket?.on("newMessage", (msg) => {
      msg.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      dispatch(setMessages([...messages, msg]));
    });
    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);
  return <div>useGetRealtimeMessage</div>;
}
