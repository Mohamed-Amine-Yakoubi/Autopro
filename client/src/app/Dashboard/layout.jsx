"use client";
import { Loading } from "@/components/Loading";
import SideBar from "@/components/SideBar";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { getStoreByUserID } from "../lib/Magasin";
import { useEffect } from "react";
import { initializeStore } from "../redux/slices/storeSlice";
import DefaultLayout from "@/components/DefaultLayout";

export default function ({ children }) {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if (session) {
      getStoreByUserID(session.user.id_user).then((item) => {
        dispatch(initializeStore(item));
      });
    }
  }, [dispatch]);
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
