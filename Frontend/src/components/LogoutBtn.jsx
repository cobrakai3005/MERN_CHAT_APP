import React from "react";
import { BiLogOut } from "react-icons/bi";
import { useLogout } from "../hooks/useLogout";

export default function LogoutBtn() {
  const { loading, logout } = useLogout();
  return (
    <div className="mt-auto">
      {loading ? (
        <span className="loading loading-spinner"></span>
      ) : (
        <BiLogOut
          onClick={async () => await logout()}
          className="w-6 h-6 cursor-pointer"
        />
      )}
    </div>
  );
}
