"use client";
import DefaultLayoutCompte from "@/components/DefaultLayoutCompte";
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
 
      <DefaultLayoutCompte>{children}</DefaultLayoutCompte>
    </div>
  );
}
