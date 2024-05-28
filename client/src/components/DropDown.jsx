"use client";
import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { FaUserCircle } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { ImProfile } from "react-icons/im";
import { FaShop } from "react-icons/fa6";
import ModalStore from "./ModalStore";
import Link from "next/link";

const DropDown = ({ openMenu }) => {
  const { data: session, status } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
 
  return (
    <div>
      <Dropdown
        showArrow
        className="bg-white py-5 px-5 rounded-md shadow-md border-2 border-gray-200"
      >
        <DropdownTrigger>
          <Button variant="bordered">{openMenu}</Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem className="mb-5">
            <div className="flex flex-row items-center mb-5">
              <div>
                <FaUserCircle className="mr-2 text-[30px]" />
              </div>
              <div>
                <div>
                  {session.user.name} {session.user.Prenom_user}
                </div>
                <div className="text-[12px] text-gray-400">
                  {session.user.email}
                </div>
              </div>
            </div>
          </DropdownItem>
          {session.user.Profil_user === "client" ? (
            <DropdownItem onClick={openModal}>
              <div className="flex items-center">
                <FaShop className="text-iconColor mr-2 text-[20px]" />
                Demande boutique
              </div>
            </DropdownItem>
          ) : session.user.Profil_user === "Fournisseur" ? (
            <DropdownItem>
              <Link href="/Dashboard">
                <div className="flex items-center">
                  <FaShop className="text-iconColor mr-2 text-[20px]" />
                  Votre Dashboard
                </div>
              </Link>
            </DropdownItem>
          ) : null}

          <DropdownItem>
            <div className="flex items-center mt-3">
              <ImProfile className="text-iconColor mr-2 text-[20px]" />
              Profile
            </div>
          </DropdownItem>

          <DropdownItem
            key="delete"
            color="danger"
            onClick={() => {
              signOut();
            }}
          >
            <hr className="w-72 h-px my-2 mb-4 mt-4 dark:bg-gray-300" />
            <div className="flex items-center">
              <HiOutlineLogout className="text-iconColor mr-2 text-[24px]" />
              Se déconnecter
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <ModalStore isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default DropDown;
