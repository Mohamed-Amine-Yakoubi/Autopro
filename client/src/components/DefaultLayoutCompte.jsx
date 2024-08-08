"use client";
import React, { useState } from "react";

import NavbarDash from "./NavbarDash";
import SideBarCompte from "./SideBarCompte";

export default function DefaultLayoutCompte({ children }) {
  const [openSideBar, setOpenSideBar] = useState(true);

  return (
    <div className=" ">
      <div className="flex    justify-center   flex-row lg:space-x-8  my-10   lg:mx-52 ">
        <div
          className={`lg:w-64 mb-[500px] lg:flex-shrink-0 ${
            openSideBar ? "block" : "hidden"
          }`}
        >
          <SideBarCompte openSideBar={openSideBar} />
        </div>
        <div className={`flex flex-1 ${openSideBar ? "ml-64" : "ml-0"}`}>
          <main className="w-full">
            {/* Navbar */}
            <NavbarDash
              openSideBar={openSideBar}
              setOpenSideBar={setOpenSideBar}
            />

            {/* Content */}
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
