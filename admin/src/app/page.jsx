"use client";

import { useEffect, useState } from "react";
 
import Signin from "./Signin/page";
import { useSession } from "next-auth/react";
import { Loading } from "@/components/Loading";
import Dashboard from "./Dashboard/page";
import DefaultLayout from "@/components/DefaultLayout";
 

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "loading") {
      setLoading(false);
    }
  }, [status]);

  if (loading) return <Loading />;

  return <div>{session && session.user ? <Dashboard /> : <Signin />}</div>;
}
