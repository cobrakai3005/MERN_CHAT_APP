import { createContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useUser } from "../Redux/userSlice";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { user } = useUser();
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (user) {
      const socket = io("http://localhost:5000", {
        query: {
          userId: user._id,
        },
      });

      setSocket(socket);

      socket.on("getOnlineUsers", (onlineUsers) => {
        setOnlineUsers(onlineUsers);
      });

      return () => {
        socket.close();
        setSocket(null);
      };
    } else {
      if (socket) {
        setSocket(null);
        socket.close();
      }
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
