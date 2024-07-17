"use client";
import { getVille } from "@/app/lib/Category";
import {
  getAllMainCommande,
  getCommandeDetails,
  getMainCommande,
} from "@/app/lib/Commande";
import { getSpecProduct } from "@/app/lib/Product";
import { getAdrByIdUser } from "@/app/lib/User";
import Header from "@/components/Header";
import { Loading } from "@/components/Loading";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaClock } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { FcCancel } from "react-icons/fc";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoEyeSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";

const Commande = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);

  const [ville, setVille] = useState([]);
  const [commande, setCommande] = useState([]);
  const [Detailscommande, setDetailscommande] = useState([]);
  const [product, setProduct] = useState([]);
  const [adresse, setAdresse] = useState([]);

  const id_user = session?.user?.id_user || "";

  useEffect(() => {
    if (session) {
      setLoading(false); // Assuming this is correctly used to indicate session loaded
    }

    getAllMainCommande(id_user).then((item) => {
      setCommande(item);
    });
  }, [id_user]);
  const renderedCommandeIds = new Set();
  if (loading) return <Loading />;
  return (
    <div className=" ">
      <h1 className="text-[23px] font-semibold text-greenColor mb-3">
        Vos Commandes
      </h1>

      <table className="  py-5 w-full">
        <tr className=" border-b pb-5">
          <td className="pt-5  w-1/5  text-[13.5px] font-semibold text-darkColor">
            N°
          </td>
          <td className="pt-5  w-1/3 text-[13.5px] font-semibold text-darkColor">
            Date
          </td>
          <td className="pt-5 w-1/3  text-[13.5px] font-semibold text-darkColor">
            État
          </td>
          <td className="pt-5 w-1/3  text-[13.5px] font-semibold text-darkColor">
            Total
          </td>
          <td className="pt-5 w-1/4  text-[13.5px] font-semibold text-darkColor"></td>
        </tr>
        {commande.map((item) => {
          if (!renderedCommandeIds.has(item.id_MainCmd)) {
            renderedCommandeIds.add(item.id_MainCmd);

            const totalPrix = commande
              .filter((CmdItem) => item.id_MainCmd === CmdItem.id_MainCmd)
              .reduce((sum, item) => sum + item.prix_total, 0);

            return (
              <tr
                key={item.id_cmd}
                className="text-[13px] text-darkColor border-t"
              >
                <td className="pt-1 text-greenColor">N°{item.id_MainCmd}</td>
                <td className="pt-1">{item.Date_cmd}</td>

                <td className="pt-1 text-[12.5px]">
                  {item.etat_cmd === "en attente" ? (
                    <p className="flex items-center ">
                      <span className="text-orange-300 mr-1">
                        <FaClock />
                      </span>
                      En attente
                    </p>
                  ) : item.etat_cmd === "approuvé" ? (
                    <p className="flex items-center ">
                      <span className="text-greenColor mr-1">
                        <FaCheckCircle />
                      </span>
                      Approuvé
                    </p>
                  ) : item.etat_cmd === "Annuler" ? (
                    <p className="flex items-center ">
                      <span className="text-orange-300 mr-1">
                        <FcCancel className="text-[18px]" />
                      </span>
                      Annuler
                    </p>
                  ) : null}
                </td>
                <td className="pt-1">{totalPrix} TND</td>
                <td className="  pt-1   flex justify-center items-center">
                  <div className="text-center  ">
                    <Dropdown className="bg-gray-100   rounded-md shadow-sm">
                      <DropdownTrigger>
                        <Button variant="bordered">
                          <HiDotsHorizontal />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Dynamic Actions">
                        <DropdownItem>
                          <div className=" hover:bg-greenColor rounded-md  hover:text-white p-2 flex items-center mt-3">
                            <IoEyeSharp className="text-[20px] mr-2" />
                            <Link
                              className="text-[14px]"
                              href={`/Compte/Commande/${item.id_MainCmd}`}
                            >
                              Consulter
                            </Link>
                          </div>
                        </DropdownItem>
                        <DropdownItem>
                          <button
                            className=" hover:bg-greenColor rounded-md  hover:text-white p-2 flex items-center mt-3"
                            onClick={() => handleDelete(item.id_prod)}
                          >
                            <MdDelete className="text-[20px] mr-2" />
                            <p className="text-[14px]"> Supprimer</p>
                          </button>
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </td>
              </tr>
            );
          }
          return null; // Return null for items that shouldn't be rendered
        })}
      </table>
    </div>
  );
};
export default Commande;
