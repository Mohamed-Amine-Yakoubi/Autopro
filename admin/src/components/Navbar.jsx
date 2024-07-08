"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoNotifications } from "react-icons/io5";
import { FaFacebookMessenger } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const router = useRouter();

  const [currentRoute, setCurrentRoute] = useState("Dashboard");
  const pathname = usePathname();

  useEffect(() => {
    const route = pathname.split("/").pop(); // Extract the last part of the pathname
    setCurrentRoute(route ? route : "Dashboard");
  }, [pathname]);
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="ml-[6px]">
        <div className="h-6 w-[224px] pt-1">
          <Link
            className="text-[14px] font-normal text-navy-700 hover:underline text-gray-400  "
            href=" "
          >
            Dashboard
            <span className="mx-1 text-[14px] text-darkColor"> / </span>
          </Link>
          <Link
            className="text-[14px] font-normal capitalize text-navy-700 hover:underline  text-darkColor"
            href="#"
          >
            {currentRoute}
          </Link>
        </div>
        <p className="shrink text-[18px] mt-3 mb-5 capitalize text-navy-700 text-darkColor">
          <Link
            href="#"
            className="font-bold capitalize hover:text-navy-700 text-darkColor"
          >
            {currentRoute}
          </Link>
        </p>
      </div>
      <div className=" flex items-center space-x-5">
        <IoNotifications className="text-[20px] text-textColor" />
        <FaFacebookMessenger className="text-[18px] text-textColor" />
        <button
          className="flex items-center space-x-1 text-textColor"
          onClick={() => {
            signOut({
              callbackUrl: "/Signin",
            });
          }}
        >
          <IoMdLogOut className="text-[20px]" />
          <span className="font-semibold text-[14px]">Déconnecter</span>
        </button>
      </div>
    </div>
  );
};
export default Navbar;
