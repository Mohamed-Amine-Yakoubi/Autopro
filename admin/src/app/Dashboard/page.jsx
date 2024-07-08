"use client";

import { useSession } from "next-auth/react";

import { useEffect, useState } from "react";

import { Loading } from "@/components/Loading";
import Home from "./Home/page";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status !== "loading") {
      setLoading(false);
    }
  }, [status]);
  if (loading) return <Loading />;

  return (
    <div>
      {" "}
      <Home />
    </div>
  );
};
export default Dashboard;
