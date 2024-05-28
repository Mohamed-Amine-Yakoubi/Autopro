"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import Autopro_logo from "../public/images/Autopro_logo.png";
import { FaBars, FaUser, FaRegHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import "../styles/Navbar.scss";
import ModalComponent from "./ModalLogin";
import { useSession } from "next-auth/react";
 
import DropDown from "./DropDown"; 

const Navbar = () => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-16">
      <nav className="bg-gray-100   fixed w-full z-20 top-0 start-0  ">
        <div className="max-w-screen   flex flex-wrap items-center justify-between mx-auto p-3 ">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse lg:mx-28 "
          >
            <Image src={Autopro_logo} className="w-24" alt="Flowbite Logo" />
          </Link>

          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
            aria-controls="navbar-sticky"
            aria-expanded={isOpen ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            <FaBars />
          </button>
          <div
            className={`${
              isOpen ? "block" : "hidden"
            } md:block items-center justify-between w-full md:flex    md:w-auto md:order-1  `}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4   text-center   md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0    ">
              <li>
                <Link href="/" className="  block py-2 px-3      NavbarTitle ">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/Catalogue" className=" block py-2 px-3 NavbarTitle   ">
                  Catalogue
                </Link>
              </li>
              <li>
                <Link href="#" className=" block py-2 px-3 NavbarTitle">
                  A propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="  block py-2 px-3 NavbarTitle">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div
            className={`${
              isOpen ? "block" : "hidden"
            } md:block items-center justify-between w-full md:flex md:w-auto  lg:mx-28 flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse`}
          >
            {session && session.user ? (
              <div className=" placeholder: text-2xl      text-center text-greenColor  hover:bg-iconColor rounded-lg hover:text-white "> 
                <DropDown   openMenu={<FaUser />}   />
              </div>
            ) : (
              <div className="text-iconColor text-2xl      text-center   hover:bg-greenColor rounded-lg hover:text-white ">
                <ModalComponent icon={<FaUser />} />
              </div>
            )}

            <button
              type="button"
              className="text-iconColor text-2xl    px-4 py-2 text-center  hover:bg-greenColor rounded-lg hover:text-white"
            >
              <FaCartShopping />
            </button>
            <button
              type="button"
              className="text-iconColor text-2xl     px-4 py-2 text-center  hover:bg-greenColor rounded-lg hover:text-white"
            >
              <FaRegHeart />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
