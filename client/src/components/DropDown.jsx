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
import { FaBoxOpen, FaUserCircle } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { ImProfile } from "react-icons/im";
import { FaShop } from "react-icons/fa6";
import ModalStore from "./ModalStore";
import Link from "next/link";
import ModalUpdateProfile from "./ModalUpdateProfile";
import { useRouter } from "next/navigation";
import { BsFillSendExclamationFill } from "react-icons/bs";
import ModalClaim from "./ModalClaim";

const DropDown = ({ openMenu }) => {
  const { data: session, status } = useSession();
  const [isModalProfileOpen, setIsModalProfileOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalClaimOpen, setIsModalClaimOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openModalClaim = () => setIsModalClaimOpen(true);
  const closeModalClaim = () => setIsModalClaimOpen(false);
  const router = useRouter();
  const openModalProfile = () => setIsModalProfileOpen(true);
  const closeModalProfile = () => setIsModalProfileOpen(false);

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
            <div className="flex flex-row items-center mb-3">
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

          <DropdownItem>
            <Link href="/Compte">
              <div className="flex items-center  text-[15px] ">
                <FaBoxOpen className="text-iconColor mr-2 text-[15px]" />
                Commandes
              </div>
            </Link>
          </DropdownItem>
          {session.user.Profil_user === "client" ? (
            <DropdownItem onClick={openModal}>
              <div className="flex items-center text-[15px]  mt-2">
                <FaShop className="text-iconColor mr-2 text-[15px]" />
                Demande boutique
              </div>
            </DropdownItem>
          ) : session.user.Profil_user === "Fournisseur" ? (
            <DropdownItem>
              <Link href="/Dashboard">
                <div className="flex items-center  text-[15px] mt-2">
                  <FaShop className="text-iconColor mr-2 text-[15px]" />
                  Votre Boutique
                </div>
              </Link>
            </DropdownItem>
          ) : null}
          <DropdownItem>
            <Link href="/Compte/DetailCompte">
              <div className="flex items-center  text-[15px] mt-2">
                <ImProfile className="text-iconColor mr-2 text-[15px]" />
                Details du compte
              </div>
            </Link>
          </DropdownItem>
          <DropdownItem  onClick={openModalClaim}>
           
              <div className="flex items-center  text-[15px] mt-2">
                <BsFillSendExclamationFill className="text-iconColor mr-2 text-[15px]" />
                Réclamation
              </div>
          
          </DropdownItem>
          <DropdownItem
            key="delete"
            color="danger"
            onClick={() => {
              signOut();
              router.push(`/Accueil`);

            }}
          >
            <hr className="w-72 h-px my-2 mb-4 mt-4 dark:bg-gray-300" />
            <div className="flex items-center text-[15px] ">
              <HiOutlineLogout className="text-iconColor mr-2 text-[15px]" />
              Se déconnecter
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <ModalStore isOpen={isModalOpen} onClose={closeModal} />
      <ModalClaim isOpen={isModalClaimOpen} onClose={closeModalClaim} />
      <ModalUpdateProfile
        isOpen={isModalProfileOpen}
        onClose={closeModalProfile}
      />
    </div>
  );
};

export default DropDown;
