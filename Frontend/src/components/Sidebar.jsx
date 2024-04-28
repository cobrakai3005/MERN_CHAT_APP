import React from "react";
import SearchInput from "./SearchInput";

import Conversations from "./Conversations";
import LogoutBtn from "./LogoutBtn";

export default function Sidebar() {
  return (
    <div className="border-r border-slate-400 p-4 md:flex-[0.4] sm:flex-[0.2] flex flex-col">
      <SearchInput />
      <div className="divider px-3"></div>
      <Conversations />
      <LogoutBtn />
    </div>
  );
}
