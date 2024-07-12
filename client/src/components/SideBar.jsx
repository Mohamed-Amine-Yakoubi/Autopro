"use client";
import { getStoreByUserID } from "@/app/lib/Magasin";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ImProfile } from "react-icons/im";
import { FaShoppingBasket } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { BsFillChatDotsFill, BsFillSendExclamationFill } from "react-icons/bs";

const SideBar = () => {
  const { data: session, status } = useSession();
  const [store, setStore] = useState([]);

  const magasin = useSelector((state) => state.store);
  useEffect(() => {
    if (status === "authenticated") {
      getStoreByUserID(session.user.id_user).then((store) => {
        setStore(store);
      });
    }
  }, [status, session]); // Re-run the effect if status or session changes

  if (status === "authenticated") {
    return (
      <div className="h-[520px] w-64 md:mb-28  bg-gray-100 text-iconColor   rounded-lg">
        {magasin.items.map((item) => (
          <div key={item.id_magasin}>
            <div className="flex  py-10 px-4 flex-col items-center justify-center">
              <Image
                src={item.Logo_magasin}
                className="rounded-full bg-white border-2  border-gray-200 "
                width={80}
                height={80}
                alt="alt"
              />
              <p className="mt-3 text-[14px]   font-semibold ">
                {item.Libelle_magasin}
              </p>
            </div>
            <ul className="px-5   ">
              <li className="px-4 py-4 hover:bg-greenColor hover:text-white flex items-center space-x-3 rounded-md">
                {" "}
                <AiFillDashboard className="  text-[20px]" />
                <Link href="/Dashboard" className="font-poppins text-[14px]">
                  Dashboard
                </Link>
              </li>
              <li className="p-4 hover:bg-greenColor hover:text-white flex items-center space-x-3 rounded-md">
                {" "}
                <FaBoxOpen className="  text-[20px]" />
                <Link
                  href="/Dashboard/Articles"
                  className="font-poppins text-[14px]"
                >
                  Mes Articles
                </Link>
              </li>
              <li className="p-4 hover:bg-greenColor hover:text-white flex items-center space-x-3 rounded-md">
                <ImProfile className="  text-[20px]" />
                <Link
                  href="/Dashboard/Information"
                  className="font-poppins text-[14px]"
                >
                  Mes Information
                </Link>
              </li>
              <li className="p-4 hover:bg-greenColor hover:text-white flex items-center space-x-3 rounded-md">
                <FaShoppingBasket className=" or text-[20px]" />
                <Link
                  href="/Dashboard/CommandeClient"
                  className="font-poppins text-[14px]"
                >
                  Commande Client
                </Link>
              </li>
              <li className="p-4 hover:bg-greenColor hover:text-white flex items-center space-x-3 rounded-md">
                <BsFillSendExclamationFill className=" or text-[20px]" />
                <Link
                  href="/Dashboard/Reclamations"
                  className="font-poppins text-[14px]"
                >
                  Reclamations
                </Link>
              </li>
              <li className="p-4 hover:bg-greenColor hover:text-white flex items-center space-x-3 rounded-md">
                <BsFillChatDotsFill className=" or text-[20px]" />
                <Link
                  href="/Dashboard/Messages"
                  className="font-poppins text-[14px]"
                >
                  Messages
                </Link>
              </li>
            </ul>
          </div>
        ))}
      </div>
    );
  }
  // Handle other cases, e.g., if user is not authenticated
  return <div>Not authenticated</div>;
};

export default SideBar;
