"use client";
import Header from "@/components/Header";
import { Loading } from "@/components/Loading";

import SideBarCompte from "@/components/SideBarCompte";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ({ children }) {
 
  const router = useRouter();
  const { data: session, status } = useSession();
 
  if (status === "loading")
    return (
      <div>
        <Loading />
      </div>
    );
  return (
    <div>
      <div>
        <Header Title={`Compte`}  pageTitle={"commande"}  />
      </div>

      <div className="flex flex-col md:flex-row lg:space-x-8  my-10   lg:mx-52  ">
        {" "}
        {/* flex container */}
        {/* Sidebar */}
        <SideBarCompte />
        {/* Content Area */}
        <div className="flex-1 p-4">{children}</div>
      </div>
    </div>
  );
}
