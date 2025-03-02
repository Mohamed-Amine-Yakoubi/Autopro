"use client";

import { signOut, useSession } from "next-auth/react";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ImProfile } from "react-icons/im";

import { FaBoxOpen, FaUserCircle } from "react-icons/fa";

import { FaShop } from "react-icons/fa6";
import { HiOutlineLogout } from "react-icons/hi";

import ModalStore from "./ModalStore";
import { useRouter } from "next/navigation";

const SideBarCompte = ({openSideBar}) => {
  const { data: session, status } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  // Re-run the effect if status or session changes
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  if (status === "authenticated") {
    return (
      <div className="absolute  top-[288px]  left-[160px]  h-screen z-10">
        <div
          className={`w-64 pb-6 md:mb-28 bg-gray-100 text-iconColor m-5 rounded-lg ${
            openSideBar ? "translate-x-10" : "-translate-x-full opacity-0"
          } transition-all duration-300 ease-in-out`}
        >
          <div>
            <div className="flex  py-10 px-4 flex-col items-center justify-center">
              <FaUserCircle className=" text-iconColor text-[70px]" />

              <p className="mt-3 text-[13px]   font-semibold ">
                {session.user.Prenom_user} {session.user.Nom_user}
              </p>
            </div>
            <ul className="px-5   ">
              <li className="px-4 py-4 hover:bg-greenColor hover:text-white flex items-center space-x-3 rounded-md">
                {" "}
                <FaBoxOpen className="  text-[20px]" />
                <Link
                  href="/Compte/Commande"
                  className="font-poppins text-[13px]"
                >
                  Commandes
                </Link>
              </li>
              {session.user.Profil_user === "Client" ? (
                <li
                  onClick={openModal}
                  className="p-4 hover:bg-greenColor hover:text-white flex items-center space-x-3 rounded-md"
                >
                  {" "}
                  <FaBoxOpen className="  text-[20px]" />
                  <p className="font-poppins text-[13px]">Demande boutique</p>
                </li>
              ) : session.user.Profil_user === "Fournisseur" ? (
                <li className="p-4 hover:bg-greenColor hover:text-white flex items-center space-x-3 rounded-md">
                  {" "}
                  <FaShop className="  text-[20px]" />
                  <Link href="/Dashboard" className="font-poppins text-[13px]">
                    Votre Boutique
                  </Link>
                </li>
              ) : null}
              <li className="p-4 hover:bg-greenColor hover:text-white flex items-center space-x-3 rounded-md">
                <ImProfile className="  text-[20px]" />
                <Link
                  href="/Compte/DetailCompte"
                  className="font-poppins text-[13px]"
                >
                  Détails du Compte
                </Link>
              </li>
              <li className="p-4 hover:bg-greenColor hover:text-white flex items-center space-x-3 rounded-md">
                <HiOutlineLogout className=" or text-[20px]" />
                <button    onClick={() => {
              signOut();
              router.push(`/Accueil`);

            }} className="font-poppins text-[13px]">
                  Se déconnecter
                </button>
              </li>
            </ul>
          </div>

          <ModalStore isOpen={isModalOpen} onClose={closeModal} />
        </div>
      </div>
    );
  }
  // Handle other cases, e.g., if user is not authenticated
  return <div>Not authenticated</div>;
};

export default SideBarCompte;
