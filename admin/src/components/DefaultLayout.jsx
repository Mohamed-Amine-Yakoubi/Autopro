"use client";
import React, { useState } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DefaultLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden justify-center">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <main className=" ">
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <Navbar  />
              <div className="mt-6" >
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>

    
    </>
  );
}
