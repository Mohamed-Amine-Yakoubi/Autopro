"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
 

 
import { useRouter } from "next/navigation";
const NavbarDash = () => {
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
        <div className="h-6 w-[224px]  ">
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
    
    </div>
  );
};
export default NavbarDash;
