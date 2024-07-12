"use client";
import React, { useState } from "react";

import Sidebar from "./Sidebar";
 
import NavbarDash from "./NavbarDash";

export default function DefaultLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className=" mx-8 my-24">
      <div className="flex h-screen  justify-center space-x-6 ">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="relative flex flex-1 flex-col   overflow-x-hidden">
          <main className=" ">
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <NavbarDash  />
              <div className="mt-6" >
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
      </div>

    
    </>
  );
}
