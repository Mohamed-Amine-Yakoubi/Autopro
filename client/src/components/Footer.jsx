import Image from "next/image";
import Link from "next/link";
import React from "react";
import Autopro_logo from "../public/images/Autopro_logo_white.png";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

const Footer = () => {
  return (
    <div>
      <footer className="     bg-darkColor  ">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="lg:flex   ">
            <div className="lg:w-1/1 w-full   lg:text-start text-center">
              <Link
                href="/Accueil"
                className=" flex lg:justify-start justify-center"
              >
                <Image
                  src={Autopro_logo}
                  className="w-[200px] "
                  alt="Flowbite Logo"
                />
              </Link>
              <p className="dark:text-gray-400 mt-4 text-[13px] lg:w-1/2 w-full">
                Toute l'équipe d'Autopro est à votre écoute. Une question ? Vous
                pouvez nous laisser un petit message dans notre formulaire de
                contact. Nous vous répondrons au plus vite !
              </p>
            </div>
            <div className="lg:w-1/5 w-full lg:my-0 my-8  ">
              <h1 className=" font-bold  text-greenColor mb-5 lg:text-start  text-center text-[15px]">
                Lien utile
              </h1>
              <ul className="flex lg:flex-col flex-row flex-wrap  text-sm font-medium  lg:space-y-6    space-y-0  justify-center dark:text-gray-400">
                <li>
                  <Link
                    href="/Accueil"
                    className="hover:bg-greenColor p-2 hover:text-white rounded-md "
                  >
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link
                    href="/Catalogue"
                    className="hover:bg-greenColor p-2 hover:text-white rounded-md  "
                  >
                    Catalogue
                  </Link>
                </li>

                <li>
                  <Link
                    href="/Magasin"
                    className="hover:bg-greenColor p-2 hover:text-white rounded-md  "
                  >
                    Magasin
                  </Link>
                </li>
                <li>
                  <Link
                    href="/Contact"
                    className="hover:bg-greenColor p-2 hover:text-white rounded-md  "
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="  lg:w-1/3  w-full   ">
              <h1 className="  lg:text-start font-semibold text-greenColor text-center text-[15px]">
                Informations de Contact
              </h1>
              <div className="  mt-4 flex flex-col lg:items-start items-center lg:text-start text-center   space-y-4">
                <p className="text   mt-2 flex font-poppins">
                    
                  <span>
                    <FaLocationDot className="text-greenColor text-lg mx-2" />
                  </span>
                  <span className="font-bold dark:text-gray-400 mr-2">
                    Adresse :
                  </span>{" "}
                  <span>Ariana, 14 rue ons</span>
              
                </p>
                <p className="text   mt-2 flex font-poppins">
                  <span>
                    <FaPhoneAlt className="text-greenColor text-lg mx-2" />
                  </span>
                  <span className="font-bold dark:text-gray-400 mr-2">
                    Téléphone :
                  </span>
                  +216 20166505
                </p>
                <p className="text   mt-2 flex font-poppins">
                  <span>
                    <IoIosMail className="text-greenColor text-lg mx-2" />
                  </span>
                  <span className="font-bold dark:text-gray-400 mr-2">
                    Email :
                  </span>
                  Autopro@gmail.com
                </p>
              </div>
            </div>
          </div>
          <hr className="my-4 border-gray-200 sm:mx-auto dark:border-gray-700 " />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <Link href="https://flowbite.com/" className="hover:underline">
              Autopro™
            </Link>
            . Tous droits réservés .
          </span>
        </div>
      </footer>
    </div>
  );
};
export default Footer;
