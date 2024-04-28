import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser, useUser } from "../Redux/userSlice";
import { SocketContext } from "../context/SocketContext";

export default function Conversation({ conversation }) {
  const dispatch = useDispatch();
  const { selectedUser, user } = useUser();
  const { onlineUsers } = useContext(SocketContext);

  const selectThisUser = (user) => {
    dispatch(setSelectedUser(user));
  };
  const isOnline = onlineUsers.includes(conversation._id);
  // console.log(isOnline);

  return (
    <div
      className=" flex flex-col"
      onClick={() => selectThisUser(conversation)}
    >
      <div
        className={`flex gap-2 items-center hover:bg-slate-500 rounded-xl p-2 py-4 cursor-pointer ${
          selectedUser?._id === conversation?._id ? "bg-gray-800" : ""
        }`}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={`${conversation?.profilePic}`} alt="user avatar" />
          </div>
        </div>

        <div className="flex fle-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation?.fullName} </p>
            <span className="text-xl ">😡</span>
          </div>
        </div>
      </div>

      <div className="divider my-0 py-0 h-1"></div>
    </div>
  );
}
