"use client";

import { getStoreByUserID } from "@/app/lib/Magasin";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoLocation, IoLogoLinkedin } from "react-icons/io5";
import { FaPhoneAlt, FaFacebook } from "react-icons/fa";
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
    <div className="  py-12 px-4  shadow-lg rounded-lg overflow-hidden bg-grayLight ">
      {" "}
      {store.map((item) => (
        <div
          key={item.id_magasin}
          className="p-10 flex md:flex-row flex-col items-center justify-around"
        >
          <div className=" space-y-8 flex flex-col justify-center items-center ">
            <Image
              src={item.Logo_magasin}
              className="rounded-full "
              width={200}
              height={200}
              alt="alt"
            />
            <textarea
              name="Description_magasin"
              rows="5"
              className="bg-white border-2 border-gray-200 rounded-lg w-96 outline-none px-5 text-[14px]   h-40"
              placeholder="Description"
              value={item.Description_magasin}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <div className="  relative  ">
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                  <IoIosMail className="text-[20px] mr-2 text-greenColor" />
                </span>
                <input
                  type="text"
                  className="outline-none md:w-96  w-full bg-white border-2 border-gray-200 py-2 pl-10 pr-3 text-[14px] rounded-md"
                  value={item.Email_magasin}
                />
              </div>{" "}
            </div>

            <div className="flex items-center">
              <div className="  relative  ">
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                  <IoLocation className="text-[20px] mr-2 text-greenColor" />
                </span>
                <input
                  type="text"
                  className="outline-none md:w-96  w-full bg-white border-2 border-gray-200 py-2 pl-10 pr-3 text-[14px] rounded-md"
                  value={item.Adresse_magasin}
                />
              </div>{" "}
            </div>

            <div className="flex items-center">
              <div className="  relative  ">
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                  <FaPhoneAlt className="text-[20px] mr-2 text-greenColor" />
                </span>
                <input
                  type="text"
                  className="outline-none md:w-96  w-full bg-white border-2 border-gray-200 py-2 pl-10 pr-3 text-[14px] rounded-md"
                  value={item.Telephone_magasin}
                />
              </div>{" "}
            </div>

            <div className="flex items-center">
              <div className="  relative  ">
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                  <FaFacebook className="text-[20px] mr-2 text-greenColor" />
                </span>

                <input
                  type="text"
                  className="outline-none md:w-96  w-full bg-white border-2 border-gray-200 py-2 pl-10 pr-3 text-[14px] rounded-md"
                  value={item.Lien_facebook}
                />
              </div>{" "}
            </div>

            <div className="flex items-center">
              <div className="  relative  ">
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                  <FaSquareInstagram className="text-[20px] mr-2 text-greenColor" />
                </span>
                <input
                  type="text"
                  className="outline-none md:w-96  w-full bg-white border-2 border-gray-200 py-2 pl-10 pr-3 text-[14px] rounded-md"
                  value={item.Lien_instagram}
                />
              </div>{" "}
            </div>

            <div className="flex items-center">
              <div className="  relative  ">
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                  <IoLogoLinkedin className="text-[20px] mr-2 text-greenColor" />
                </span>
                <input
                  type="text"
                  className="outline-none md:w-96  w-full bg-white border-2 border-gray-200 py-2 pl-10 pr-3 text-[14px] rounded-md"
                  value={item.Lien_linkedin}
                />
              </div>{" "}
            </div>

            <div className="flex items-center">
              <div className="  relative  ">
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                  <TbWorldWww className="text-[20px] mr-2 text-greenColor" />
                </span>
                <input
                  type="text"
                  className="outline-none md:w-96  w-full bg-white border-2 border-gray-200 py-2 pl-10 pr-3 text-[14px] rounded-md"
                  value={item.Lien_siteWeb}
                />
              </div>{" "}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Information;
