"use client";
import { getOneVille, getStoreByID } from "@/app/lib/Boutique";
import { useSession } from "next-auth/react";
import Image from "next/image";

import { IoLocation, IoLogoLinkedin } from "react-icons/io5";
import { FaPhoneAlt, FaFacebook } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaSquareInstagram, FaCamera } from "react-icons/fa6";
import { TbWorldWww } from "react-icons/tb";
import { MdOutlineTitle } from "react-icons/md";

import { PiCityFill } from "react-icons/pi";

import React, { useEffect, useState } from "react";

const Demande = (props) => {
  const id_demande = props.params.Demande;
  const [store, setStore] = useState("");
  const [ville, setVille] = useState("");
  useEffect(() => {
    // Function to fetch store and ville
    const fetchStoreAndVille = async () => {
      try {
        const itemStore = await getStoreByID(id_demande);
        setStore(itemStore);

        const ville_Store = await getOneVille(itemStore.id_ville);
        setVille(ville_Store);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStoreAndVille();
  }, [id_demande]);

  return (
    <div>
      {" "}
      <div className="  py-5 px-4  shadow-lg rounded-lg overflow-hidden bg-grayLight ">
        <div className="p-5 flex md:flex-row flex-col md:items-center md:space-y-0 space-y-4 md:justify-around">
          <div className=" space-y-4 flex flex-col justify-center items-center  ">
            <Image
              src={store.Logo_magasin}
              className="rounded-full p-5 bg-white border-4 border-gray-200"
              width={200}
              height={200}
              alt="alt"
            />

            <div className="flex items-center">
              <div className="  relative  ">
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                  <FaFacebook className="text-[20px] mr-2 text-greenColor" />
                </span>

                <p className="outline-none lg:w-96  w-full bg-white border-2 border-gray-200 py-2 pl-10 pr-3 text-[14px] rounded-md">
                  {store.Lien_facebook}
                </p>
              </div>{" "}
            </div>

            <div className="flex items-center">
              <div className="  relative  ">
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                  <FaSquareInstagram className="text-[20px] mr-2 text-greenColor" />
                </span>
                <p className="outline-none lg:w-96  w-full bg-white border-2 border-gray-200 py-2 pl-10 pr-3 text-[14px] rounded-md">
                  {" "}
                  {store.Lien_instagram}{" "}
                </p>
              </div>{" "}
            </div>

            <div className="flex items-center">
              <div className="  relative  ">
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                  <IoLogoLinkedin className="text-[20px] mr-2 text-greenColor" />
                </span>
                <p className="outline-none lg:w-96  w-full bg-white border-2 border-gray-200 py-2 pl-10 pr-3 text-[14px] rounded-md">
                  {" "}
                  {store.Lien_linkedin}{" "}
                </p>
              </div>{" "}
            </div>

            <div className="flex items-center">
              <div className="  relative  ">
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                  <TbWorldWww className="text-[20px] mr-2 text-greenColor" />
                </span>
                <p className="outline-none lg:w-96  w-full bg-white border-2 border-gray-200 py-2 pl-10 pr-3 text-[14px] rounded-md">
                  {" "}
                  {store.Lien_siteWeb}{" "}
                </p>
              </div>{" "}
            </div>
          </div>

          <div className="space-y-4 flex flex-col justify-center items-center  ">
            <div className="flex items-center">
              <div className="  relative  ">
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                  <MdOutlineTitle className="text-[20px] mr-2 text-greenColor" />
                </span>
                <p className="outline-none lg:w-96  w-full bg-white border-2 border-gray-200 py-2 pl-10 pr-3 text-[14px] rounded-md">
                  {" "}
                  {store.Libelle_magasin}{" "}
                </p>
              </div>{" "}
            </div>
            <div className="flex items-center">
              <div className="  relative  ">
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                  <IoIosMail className="text-[20px] mr-2 text-greenColor" />
                </span>
                <p className="outline-none lg:w-96  w-full bg-white border-2 border-gray-200 py-2 pl-10 pr-3 text-[14px] rounded-md">
                  {" "}
                  {store.Email_magasin}{" "}
                </p>
              </div>{" "}
            </div>

            <div className="flex items-center">
              <div className="  relative  ">
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                  <IoLocation className="text-[20px] mr-2 text-greenColor" />
                </span>
                <p className="outline-none lg:w-96  w-full bg-white border-2 border-gray-200 py-2 pl-10 pr-3 text-[14px] rounded-md">
                  {" "}
                  {store.Adresse_magasin}{" "}
                </p>
              </div>{" "}
            </div>

            <div className="flex items-center">
              <div className="  relative  ">
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                  <FaPhoneAlt className="text-[20px] mr-2 text-greenColor" />
                </span>
                <p className="outline-none lg:w-96  w-full bg-white border-2 border-gray-200 py-2 pl-10 pr-3 text-[14px] rounded-md">
                  {" "}
                  {store.Telephone_magasin}{" "}
                </p>
              </div>{" "}
            </div>
            <div className="flex items-center">
              <div className="  relative  ">
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                  <PiCityFill className="text-[20px] mr-2 text-greenColor" />
                </span>
                <p className="outline-none lg:w-96  w-full bg-white border-2 border-gray-200 py-2 pl-10 pr-3 text-[14px] rounded-md">
                  {" "}
                  {ville.Libelle_ville}
                </p>
              </div>{" "}
            </div>

            <p className="bg-white border-2 border-gray-200 rounded-lg lg:w-96  w-full outline-none px-5 text-[14px]   h-40">
              {store.Description_magasin}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Demande;
