import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className="flex flex-col w-[90%] sm:w-full mx-auto">
      <Toaster position="top-center" />
      <div className="flex flex-col justify-center items-center h-screen p-4">
        <Outlet />
      </div>
    </div>
  );
}
