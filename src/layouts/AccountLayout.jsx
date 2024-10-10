import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

export const AccountLayout = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/account") {
      window.location.href = "/account/profile";
    }
  });
  return (
    <>
      <div className="w-full max-w-7xl mx-auto flex flex-col mt-[60px] gap-y-16">
        <h1 className="text-center text-5xl/[60px] font-semibold font-bricolage">
          Account
        </h1>
        <div>
          <div className="font-bricolage  text-[#B3B3B3] shadow-none bg-white rounded-none border-b w-full p-0 flex sm:text-2xl">
            <NavLink
              className={({ isActive }) => {
                return cn(
                  isActive
                    ? "text-primary border-b border-b-primary"
                    : "text-[#B3B3B3] hover:text-primary border-b hover:border-b-primary border-b-transparent",
                  "px-5 py-2 transition-all"
                );
              }}
              to="profile"
            >
              Profile
            </NavLink>
            <NavLink
              className={({ isActive }) => {
                return cn(
                  isActive
                    ? "text-primary border-b border-b-primary"
                    : "text-[#B3B3B3] hover:text-primary border-b hover:border-b-primary border-b-transparent",
                  "px-5 py-2 transition-all"
                );
              }}
              to="my-cards"
            >
              Cards
            </NavLink>
            <NavLink
              className={({ isActive }) => {
                return cn(
                  isActive
                    ? "text-primary border-b border-b-primary"
                    : "text-[#B3B3B3] hover:text-primary border-b hover:border-b-primary border-b-transparent",
                  "px-5 py-2 transition-all"
                );
              }}
              to="my-bundles"
            >
              Bundles
            </NavLink>
            <NavLink
              className={({ isActive }) => {
                return cn(
                  isActive
                    ? "text-primary border-b border-b-primary"
                    : "text-[#B3B3B3] hover:text-primary border-b hover:border-b-primary border-b-transparent",
                  "px-5 py-2 transition-all"
                );
              }}
              to="setting"
            >
              Account Setting
            </NavLink>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};
