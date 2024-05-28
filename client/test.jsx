"use client";

import { getStoreByUserID } from "@/app/lib/Magasin";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoLocation ,IoLogoLinkedin} from "react-icons/io5";
import { FaPhoneAlt,FaFacebook } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaSquareInstagram } from "react-icons/fa6";
import { TbWorldWww } from "react-icons/tb";
import Link from "next/link";


const Information = () => {
  const { data: session, status } = useSession();
  const [store, setStore] = useState([]);
  useEffect(() => {
    if (status === "authenticated") {
      getStoreByUserID(session.user.id_user).then((store) => {
        setStore(store);
      });
    }
  }, [status, session]);

  return (
    <div className="  py-10 px-4  shadow-lg rounded-lg overflow-hidden bg-grayLight ">
      {" "}
      {store.map((item) => (
        <div key={item.id_magasin}>
          <div className="flex  py-10 ">
            <Image
              src={item.Logo_magasin}
              className="rounded-full "
              width={50}
              height={50}
              alt="alt"
            />
            <p className="p-3 text-[14px]   font-semibold ">
              {item.Libelle_magasin}
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center">
              <IoIosMail className="text-[20px] mr-2 text-greenColor" />
              <p className="text-[14px]">{item.Email_magasin}</p>
            </div>
            <div className="flex items-center">
              <IoLocation className="text-[20px] mr-2 text-greenColor"/>
              <p className="text-[14px]">{item.Adresse_magasin}</p>
            </div>
            <div className="flex items-center">
              <FaPhoneAlt className="text-[20px] mr-2 text-greenColor"/>
              <p className="text-[14px]">{item.Telephone_magasin}</p>
            </div>
          </div>

          <div className="space-y-3">
            <Link href={item.Lien_facebook} className="flex items-center">
              <FaFacebook className="text-[20px] mr-2 text-greenColor" />
              <p className="text-[14px]">{item.Lien_facebook}</p>
            </Link>
            <div className="flex items-center">
              <FaSquareInstagram className="text-[20px] mr-2 text-greenColor"/>
              <p className="text-[14px]">{item.Lien_instagram}</p>
            </div>
            <div className="flex items-center">
              <IoLogoLinkedin className="text-[20px] mr-2 text-greenColor"/>
              <p className="text-[14px]">{item.Lien_linkedin}</p>
            </div>
            <div className="flex items-center">
              <TbWorldWww className="text-[20px] mr-2 text-greenColor"/>
              <p className="text-[14px]">{item.Lien_siteWeb}</p>
            </div>
          </div>

        </div>
      ))}
    </div>
  );
};
export default Information;
