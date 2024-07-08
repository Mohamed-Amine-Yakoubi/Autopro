"use client";

import { getStoreByUserID } from "@/app/lib/Magasin";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { IoEyeSharp, IoReloadCircle, IoSearch } from "react-icons/io5";

import { FcCancel } from "react-icons/fc";

import { HiDotsHorizontal } from "react-icons/hi";

import { MdDelete } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { GetClaimStoreId } from "@/app/lib/Reclamations";
import {
  Modal,
  ModalContent,
  ModalBody,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  ModalHeader,
} from "@nextui-org/react";
import Image from "next/image";

const Reclamations = () => {
  const store = useSelector((state) => state.store);
  const [claim, setClaim] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRec, setSelectedRec] = useState(null);

  const openModalRec = (claim) => {
    setSelectedRec(claim);
    setIsModalOpen(true);
  };

  const closeModalRec = () => {
    setIsModalOpen(false);
    setSelectedRec(null);
  };

  const { data: session } = useSession();
  const id_user = session?.user?.id_user || "";
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (session) {
      getStoreByUserID(id_user)
        .then((store) => {
          setStore(store);
        })
        .catch((err) => {
          console.error("Error fetching store:", err);
        });
    }
  }, [id_user, session]);

  useEffect(() => {
    if (store) {
      store.items.map((items) => {
        GetClaimStoreId(items.id_magasin).then((claimUser) => {
          setClaim(claimUser);
        });
      });
    }
  }, [store]);
  const handleSearch = (e) => {
    setFilter(e.target.value);
  };

  const filteredData = claim.filter(
    (item) =>
      (item.NomPrenom_red?.toLowerCase().includes(filter.toLowerCase()) ??
        false) ||
      (item.Email_rec?.toLowerCase().includes(filter.toLowerCase()) ?? false) ||
      (String(item.etat_rec)?.includes(filter) ?? false) ||
      (String(item.Telephone_rec)?.includes(filter) ?? false)
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
  for (let i = 1; i <= Math.ceil(claim.length / commandesPerPage); i++) {
    pageNumbers.push(i);
  }

  // const handleEtat = async (e, id_magasin, id_MainCmd) => {
  //   e.preventDefault();
  //   const newEtat = e.target.name; // Get the new state from the button name

  //   console.log(
  //     "Etat:",
  //     newEtat,
  //     "MainCmd:",
  //     id_MainCmd,
  //     "Magasin:",
  //     id_magasin
  //   );
  //   try {
  //     const res = await fetch(
  //       `http://localhost:4000/api/v1/commande/Update_commande/${id_MainCmd}/${id_magasin}`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ etat_cmd: newEtat }),
  //       }
  //     );

  //     if (!res.ok) {
  //       throw new Error("Failed to update store");
  //     }

  //     const result = await res.json();

  //     if (result) {
  //       const updatedCommandes = commande.map((cmd) =>
  //         cmd.id_MainCmd === id_MainCmd ? { ...cmd, etat_cmd: newEtat } : cmd
  //       );
  //       setCommande(updatedCommandes);
  //     }
  //   } catch (error) {
  //     console.error("Failed to update store:", error.message);
  //     alert("Failed to update store");
  //   }
  // };

  return (
    <div className="  mb-10">
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

            <option value="En attente">En attente</option>
          </select>
        </div>
      </div>
      <div className="shadow-lg rounded-lg overflow-hidden ">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-gray-100">
              <th className="w-16 py-4  text-center text-textColor font-bold text-[13px]">
                N°
              </th>
              <th className="w-1/4 py-4  text-left text-textColor font-bold text-[13px]">
                Nom et Prénom
              </th>
              <th className="w-1/3 py-4  text-left text-textColor font-bold text-[13px]">
                Email
              </th>
              <th className="w-1/5 py-4  text-left text-textColor font-bold text-[13px]">
                Telephone
              </th>

              <th className="w-1/5 py-4  text-left text-textColor font-bold text-[13px]">
                Date
              </th>
              <th className="w-1/5 py-4  text-left text-textColor font-bold text-[13px]">
                Etat
              </th>
              <th className="w-20  py-4 px-6  ">
                {" "}
                <button className="text-[24px]">
                  <IoReloadCircle />
                </button>{" "}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {currentcommandes.map((item, index) => {
              return (
                <tr className="border-b border-gray-200  " key={index}>
                  <td className="   text-center   py-3.5 text-greenColor  text-[13px]">
                    {item.id_rec}
                  </td>
                  <td className="      ">
                    <p className="  text-[13px]">{item.NomPrenom_rec}</p>
                  </td>

                  <td className="   text-[13px]">{item.Email_rec} </td>
                  <td className="   text-[13px]  ">{item.Telephone_rec}</td>
                  <td className="   text-[13px]  ">
                    {item.createdAt.substring(0, 10)}
                  </td>
                  <td className="   text-[13px]  ">
                    {item.etat_rec === "Approuvé" ? (
                      <p className="flex items-center ">
                        <span className="text-greenColor mr-1">
                          <FaCheckCircle />
                        </span>
                        Approuvé
                      </p>
                    ) : item.etat_rec === "En attente" ? (
                      <p className="flex items-center ">
                        <span className="text-orange-300 mr-1">
                          <FaClock />
                        </span>
                        En attente
                      </p>
                    ) : item.etat_rec === "Rejeté" ? (
                      <p className="flex items-center ">
                        <span className="text-orange-300 mr-1">
                          <FcCancel className="text-[18px]" />
                        </span>
                        Rejeté
                      </p>
                    ) : null}
                  </td>
                  <td className="  px-6   flex justify-center items-center">
                    <div className="text-center py-2">
                      <Dropdown className="bg-gray-100 p-3 rounded-md shadow-sm">
                        <DropdownTrigger>
                          <Button variant="bordered">
                            <HiDotsHorizontal />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Dynamic Actions">
                          <DropdownItem textValue="Consulter">
                            <div className=" hover:bg-greenColor rounded-md  hover:text-white px-3 text-center py-1 flex items-center  ">
                              <IoEyeSharp className="text-[20px] mr-2" />
                              <button
                                className="text-[13px]"
                                onClick={() => openModalRec(item)}
                              >
                                Consulter
                              </button>
                            </div>
                          </DropdownItem>

                          <DropdownItem textValue="Supprimer">
                            <button className=" hover:bg-greenColor rounded-md  hover:text-white px-3 text-center py-1 flex items-center  ">
                              <MdDelete className="text-[20px] mr-2" />
                              <p className="text-[13px]"> Supprimer</p>
                            </button>
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
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
      <div>
        <Modal
          className="bg-white md:mt-0 md:mb-0 mb-8 mt-8 rounded-2xl"
          size="lg"
          isOpen={isModalOpen}
          onClose={closeModalRec}
        >
          <div className="modal-overlay">
            <ModalContent className="custom-modal-content">
              <ModalHeader className="custom-modal-header flex flex-col items-center">
                Détails de la Réclamation
              </ModalHeader>
              <ModalBody className="custom-modal-body">
                {selectedRec && (
                  <div>
                    <h1 className="text-[15px] mt-4 font-semibold">Description:</h1>
                    <p className="mb-4 text-[13px]"> {selectedRec.description_rec}</p>
                    <div className="flex justify-center my-8">
                      <Image
                        src={selectedRec.file_rec}
                        className="w-24 bg-grayLight border-2 border-grayColor"
                        height="50"
                        width="50"
                        alt="fil"
                      />
                    </div>
                  </div>
                )}
              </ModalBody>
            </ModalContent>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Reclamations;
