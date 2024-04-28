import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(localStorage.getItem("chat-user")) || null,
    selectedUser: null,
    conversations: "",
  },

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setConversations: (state, action) => {
      state.conversations = action.payload;
    },
  },
});
export const { setSelectedUser, setUser, setConversations } = userSlice.actions;

export const useUser = () => {
  const { user, selectedUser, conversations } = useSelector(
    (state) => state.user
  );
  return { user, selectedUser, conversations };
  

};

export default userSlice.reducer;
