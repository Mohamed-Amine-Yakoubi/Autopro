"use client";
 
import React, { useEffect, useState } from "react";
import { IoEyeSharp,  IoSearch } from "react-icons/io5";
import "./../../../style/Modal.scss"
import { FcCancel } from "react-icons/fc";

import { HiDotsHorizontal } from "react-icons/hi";

import { MdDelete } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";

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
import { GetAllUsersClaim } from "@/app/lib/Reclamations";
import Cards from "@/components/Cards";

const Reclamations = () => {
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

  const [filter, setFilter] = useState("");

  useEffect(() => {
    GetAllUsersClaim().then((item) => {
      setClaim(item);
    });
  }, []);
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

  const handleEtat = async (id_rec) => {
    const newEtat = "Approuvé";
    try {
      const res = await fetch(
        `http://localhost:4000/api/v1/user/Update_etat_Rec/${id_rec}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ etat_rec: newEtat }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update store");
      }

      const result = await res.json();

      if (result) {
        const updatedClaim = claim.map((item) =>
          item.id_rec === id_rec ? { ...item, etat_rec: newEtat } : item
        );
        setClaim(updatedClaim);
      }
    } catch (error) {
      console.error("Failed to update store:", error.message);
      alert("Failed to update store");
    }
  };

  return (
    <div>
      <Cards className={"w-full h-full p-4 sm:overflow-x-auto     "}>
        {" "}
        <div className="relative flex items-center justify-between">
          <div className="text-[20px] font-bold text-greenColor  ">
            Recalamtions des Clients
          </div>
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
        </div>
        <div className="mt-8 h-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100  ">
                <th className="border-b border-gray-200  py-[12px]  w-1/12 mx-10  text-greenColor  text-center dark:!border-navy-700">
                  <p className="text-xs tracking-wide text-gray-600">N°</p>
                </th>
                <th className="border-b w-1/2 border-gray-200 pr-28 py-[12px] text-start dark:!border-navy-700">
                  <p className="text-xs tracking-wide text-gray-600">
                    Nom et Prénom
                  </p>
                </th>
                <th className="border-b w-1/2 border-gray-200 pr-28 py-[12px] text-start dark:!border-navy-700">
                  <p className="text-xs tracking-wide text-gray-600">Email</p>
                </th>
                <th className="border-b w-1/2 border-gray-200 pr-28 py-[12px] text-start dark:!border-navy-700">
                  <p className="text-xs tracking-wide text-gray-600">
                    Telephone
                  </p>
                </th>

                <th className="border-b w-1/2 border-gray-200 pr-28 py-[12px] text-start dark:!border-navy-700">
                  <p className="text-xs tracking-wide text-gray-600">Date</p>
                </th>
                <th className="border-b w-1/2 border-gray-200 pr-28 py-[12px] text-start dark:!border-navy-700">
                  <p className="text-xs tracking-wide text-gray-600">Etat</p>
                </th>
                <th className="w-20     ">
               
                </th>
              </tr>
            </thead>
            <tbody>
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
                                  onClick={() => {
                                    openModalRec(item);
                                    handleEtat(item.id_rec);
                                  }}
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
       
      </Cards>
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
                      <h1 className="text-[15px] mt-4 font-semibold">
                        Description:
                      </h1>
                      <p className="mb-4 text-[13px]">
                        {" "}
                        {selectedRec.description_rec}
                      </p>
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
