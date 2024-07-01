"use client";
import { Loading } from "@/components/Loading";
import SideBar from "@/components/SideBar";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { getStoreByUserID } from "../lib/Magasin";
import { useEffect } from "react";
import { initializeStore } from "../redux/slices/storeSlice";

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
    <div className="flex flex-col md:flex-row   my-10 mt-28  mx-12">
      {" "}
      {/* flex container */}
      {/* Sidebar */}
      <SideBar />
      {/* Content Area */}
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
}
