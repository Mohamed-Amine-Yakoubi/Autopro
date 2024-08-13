"use client";

import { useSession } from "next-auth/react";

import { useEffect, useState } from "react";

import { Loading } from "@/components/Loading";

import Home_Dashboard from "./Home_Dashboard/page";

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
      <Home_Dashboard />
    </div>
  );
};
export default Dashboard;
