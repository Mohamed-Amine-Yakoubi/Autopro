"use client";

import DefaultLayout from "@/components/DefaultLayout";
import { Loading } from "@/components/Loading";

import { useSession } from "next-auth/react";

export default function ({ children }) {
  const { data: session, status } = useSession();

  if (status === "loading")
    return (
      <div>
        <Loading />
      </div>
    );
  return (
    <div>
      <DefaultLayout>{children}</DefaultLayout>
    </div>
  );
}
