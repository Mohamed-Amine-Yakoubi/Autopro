"use client"
import { Loading } from "@/components/Loading";
import SideBar from "@/components/SideBar";
import { useSession } from "next-auth/react";

export default function ({ children }) {
  const { data: session, status } = useSession();

  if (status === "loading") return <div><Loading/></div>;
  return (
    <div className="flex flex-col md:flex-row items-center  my-10 mt-28"> {/* flex container */}
      {/* Sidebar */}
      <SideBar />
      {/* Content Area */}
      <div className="flex-1 p-4">
   
        {children}
      </div>
    </div>
  );
}
