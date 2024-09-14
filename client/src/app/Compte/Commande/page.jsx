"use client";

import { DeleteCommande, getAllMainCommande } from "@/app/lib/Commande";
import { getAllfacture, getFactureByIdUser } from "@/app/lib/facture";

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

import { FcCancel } from "react-icons/fc";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoEyeSharp, IoSearch } from "react-icons/io5";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { MdDelete } from "react-icons/md";

const Commande = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);

  const [commande, setCommande] = useState([]);
  const [facture, setFacture] = useState([]);

  const id_user = session?.user?.id_user || "";
  const [filter, setFilter] = useState("");
  const handleSearch = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    if (session) {
      setLoading(false); // Assuming this is correctly used to indicate session loaded
    }

    getAllMainCommande(id_user).then((item) => {
      setCommande(item);
    });
    getFactureByIdUser(id_user).then((item) => {
      setFacture(item);
    });
  }, [id_user]);

  const handleDelete = async (id_cmd) => {
    try {
      DeleteCommande(id_cmd).then(() => {
        setCommande((prevCommandes) =>
          prevCommandes.filter((cmd) => cmd.id_cmd !== id_cmd)
        );
      });
    } catch (error) {
      console.log("Error while handling delete:", error);
      alert("Failed to delete the claim. Please try again.");
    }
  };

  const filteredData = commande.filter(
    (item) =>
      (item.Reference_cmd?.toLowerCase().includes(filter.toLowerCase()) ??
        false) ||
      (String(item.etat_cmd)?.includes(filter) ?? false) ||
      (String(item.id_cmd)?.includes(filter) ?? false)
  );

  // Pagination calculations

  const [currentPage, setCurrentPage] = useState(1);
  const [commandesPerPage] = useState(6);
  const indexOfLastcommande = currentPage * commandesPerPage;
  const indexOfFirstcommande = indexOfLastcommande - commandesPerPage;
  const currentcommandes = filteredData.slice(
    indexOfFirstcommande,
    indexOfLastcommande
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Render page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(commande.length / commandesPerPage); i++) {
    pageNumbers.push(i);
  }
console.log("facture",facture)
  const renderedCommandeIds = new Set();
  if (loading) return <Loading />;
  return (
    <div className=" ">
      <h1 className="text-[23px] font-semibold text-greenColor mb-3">
        Vos Commandes
      </h1>
      <div className="  flex md:flex-row flex-col flex-wrap md:justify-between md:items-center  space-x-4 ">
        <div className="mb-3 relative  ">
          <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
            <IoSearch />
          </span>
          <input
            type="text"
            className="outline-none md:w-96 text-[13px] w-full bg-grayLight border-2 border-gray-200 py-2 pl-8 pr-3 rounded-md"
            onChange={handleSearch}
            placeholder="Chercher"
          />
        </div>

        <div className="flex md:flex-row flex-wrap     items-center  mb-2    ">
          <select
            className="  rounded-md  text-[13px]  px-4 py-2   outline-none border-2 border-gray-200 bg-grayLight text-textColor  "
            defaultValue="" // Set defaultValue here
            placeholder="Choisir la marque"
            onChange={handleSearch}
          >
            <option value="">Etat</option>
            <option value="Approuvé">Approuvé</option>
            <option value="rejeté">Rejeté</option>
            <option value="en attente">En attente</option>
            <option value="Annuler">Annuler</option>
          </select>
        </div>
      </div>
      <table className="  py-5 w-full">
        <tr className=" border-b pb-5">
          <td className="pt-5  w-1/5  text-[13.5px] font-semibold text-darkColor">
            N°
          </td>
          <td className="pt-5  w-1/5 text-[13.5px] font-semibold text-darkColor">
            Date
          </td>
          <td className="pt-5  w-1/5 text-[13.5px] font-semibold text-darkColor">
            Référence
          </td>
          <td className="pt-5 w-1/5  text-[13.5px] font-semibold text-darkColor">
            État
          </td>
          <td className="pt-5 w-1/3  text-[13.5px] font-semibold text-darkColor">
            Total
          </td>
          <td className="pt-5 w-1/4  text-[13.5px] font-semibold text-darkColor"></td>
        </tr>

        {currentcommandes.length > 0 ? (
          currentcommandes.map((item) => {
            if (!renderedCommandeIds.has(item.id_MainCmd)) {
              renderedCommandeIds.add(item.id_MainCmd);

              const totalPrix = commande
                .filter((CmdItem) => item.id_MainCmd === CmdItem.id_MainCmd)
                .reduce((sum, item) => sum + item.prix_total, 0);
                const factureUser = facture.find((CmdItem) =>  id_user === CmdItem.id_user)
              return (
                <tr
                  key={item.id_cmd}
                  className="text-[13px] text-darkColor border-t"
                >
                  <td className="pt-1 text-greenColor">N°{item.id_cmd} </td>
                  <td className="pt-1">{item.Date_cmd}</td>
                  <td className="pt-1">{item.Reference_cmd}</td>

                  <td className="pt-1 text-[12.5px]">
                    {item.etat_cmd === "en attente" ? (
                      <p className="flex items-center ">
                        <span className="text-orange-300 mr-1">
                          <FaClock />
                        </span>
                        En attente
                      </p>
                    ) : item.etat_cmd === "Approuvé" ? (
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
           
                  <td className="pt-1">{totalPrix.toFixed(2)} TND</td>
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
                            <div className=" hover:bg-greenColor rounded-md  hover:text-white p-2 flex items-center mt-1">
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
                            <div className=" hover:bg-greenColor rounded-md  hover:text-white p-2 flex items-center  ">
                              <LiaFileInvoiceSolid className="text-[20px] mr-2" />
                              <Link
                                className="text-[14px]"
                                target="_blank"
                                href={factureUser.pdf_fact}
                              >
                                Facture
                              </Link>
                            </div>
                          </DropdownItem>
           
                          <DropdownItem>
                            <button
                              type="button"
                              className=" hover:bg-greenColor rounded-md  hover:text-white p-2 flex items-center  "
                              onClick={() => handleDelete(item.id_cmd)}
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
          })
        ) : (
          <tr>
            <td colSpan="7" className="text-center py-4 pt-10 text-gray-500">
              Aucune commande n'a été ajoutée
            </td>
          </tr>
        )}
      </table>
      <div className="flex justify-center py-4">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`px-3 py-1 rounded-full text-[13px] ${
              number === currentPage
                ? "bg-greenColor text-white"
                : "bg-gray-200"
            } mx-1`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};
export default Commande;
