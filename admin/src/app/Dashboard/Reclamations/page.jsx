"use client";

import React, { useEffect, useState } from "react";
import { IoEyeSharp, IoSearch } from "react-icons/io5";
import "./../../../style/Modal.scss";
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
import Textarea from "@/components/Textarea";

const Reclamations = () => {
  const [claim, setClaim] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRec, setSelectedRec] = useState(null);
  const [answer, setAnswer] = useState("");

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
  const handleChangeValue = (e) => {
    setAnswer(e.target.value);
  };

  const filteredData = claim.filter(
    (item) =>
      (item.NomPrenom_red?.toLowerCase().includes(filter.toLowerCase()) ??
        false) ||
      (item.Email_rec?.toLowerCase().includes(filter.toLowerCase()) ?? false) ||
      (String(item.etat_rec)?.includes(filter) ?? false) ||
      (String(item.Profil_user)?.includes(filter) ?? false) ||
      (String(item.Telephone_rec)?.includes(filter) ?? false)
  );
  const File_rec =
    selectedRec && selectedRec.file_rec ? selectedRec.file_rec.split(",") : [];
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
  const handleSubmit = async (Email_rec,id_rec) => {
    const Autopro_logo_URL =
      "https://res.cloudinary.com/dszbzybhk/image/upload/v1723404962/c76ktevrn9lvxad0pmux.png";

    const mailContent = `
   <html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: #f9f9f9;
    }
    h1 {
      color: #333;
      text-align: center;
    }
    p {
      color: #666;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #4BAF4F;
      color: #ffffff !important; 
      text-decoration: none;
      border-radius: 5px;
      text-align: center;
    }
    .logo_Auto {
     
      text-align: center;
    
    }
    .logo {
      width: 250px;
   
    }
      h1{
            text-align: center;
      }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo_Auto">
      <img src="${Autopro_logo_URL}" class="logo" alt="logo" />

    </div>
          <h1>Votre réclamation a été traitée!</h1>
    <p>Votre numéro de réclamation est : ${id_rec}</p>
    <p>${answer}</p>
  </div>
</body>
</html>

`;

    const MailAnswer = await fetch(
      `http://localhost:4000/api/v1/commande/MailCommande`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: Email_rec,
          subject: "Votre réclamation a été traitée - Autopro",
          html: mailContent,
        }),
      }
    );
  };
  return (
    <div>
      <Cards className={"w-full h-full p-4 sm:overflow-x-auto     "}>
        {" "}
        <div className="relative   ">
          <div className="text-[20px] font-bold text-greenColor  ">
            Recalamtions des Clients
          </div>
          <div className="  flex md:flex-row flex-col flex-wrap md:justify-between md:items-center my-6  space-x-4 ">
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

            <div className="flex md:flex-row flex-wrap     items-center  mb-2   md:space-x-4 space-x-0 ">
              <select
                className="  rounded-md  text-[13px]  px-4 py-2   outline-none border-2 border-gray-200 bg-grayLight text-textColor  "
                defaultValue="" // Set defaultValue here
                onChange={handleSearch}
              >
                <option value="">Profil</option>
                <option value="Fournisseur">Fournisseur</option>

                <option value="Client">Client</option>
              </select>
              <select
                className="  rounded-md  text-[13px]  px-4 py-2   outline-none border-2 border-gray-200 bg-grayLight text-textColor  "
                defaultValue="" // Set defaultValue here
                onChange={handleSearch}
              >
                <option value="">Etat</option>
                <option value="Approuvé">Approuvé</option>

                <option value="En attente">En attente</option>
              </select>
            </div>
          </div>
        </div>
        <div className=" h-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="w-10 py-4 px-5 text-center text-textColor font-bold text-[13px]">
                  N°
                </th>
                <th className="w-1/5 py-4 text-left text-textColor font-bold text-[13px]">
                  Nom et Prénom
                </th>
                <th className="w-1/5 py-4 text-left text-textColor font-bold text-[13px]">
                  Email
                </th>
                <th className="w-1/6 py-4 text-left text-textColor font-bold text-[13px]">
                  Telephone
                </th>
                <th className="w-1/6 py-4 text-left text-textColor font-bold text-[13px]">
                  Profil
                </th>
                <th className="w-1/6 py-4 text-left text-textColor font-bold text-[13px]">
                  Date
                </th>
                <th className="w-1/6 py-4 text-left text-textColor font-bold text-[13px]">
                  Etat
                </th>
                <th className="w-20  py-4 px-6  "></th>
              </tr>
            </thead>
            <tbody>
              {currentcommandes.length > 0 ? (
                currentcommandes.map((item, index) => (
                  <tr className="border-b border-gray-200  " key={index}>
                    <td className="   text-center   py-3.5 text-greenColor  text-[13px]">
                      {item.id_rec}
                    </td>
                    <td className="      ">
                      <p className="  text-[13px]">{item.NomPrenom_rec}</p>
                    </td>

                    <td className="   text-[13px]">
                      {item.Email_rec.substring(0, 20)}...{" "}
                    </td>
                    <td className="   text-[13px]  ">{item.Telephone_rec}</td>
                    <td className="   text-[13px]  ">{item.Profil_user}</td>
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
                        <Dropdown className="bg-gray-100 p-4 rounded-md shadow-sm">
                          <DropdownTrigger>
                            <Button variant="bordered">
                              <HiDotsHorizontal />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu aria-label="Dynamic Actions">
                            <DropdownItem textValue="Consulter">
                              <div className=" hover:bg-greenColor rounded-md  hover:text-white px-3 text-center py-2 flex items-center mt-2 ">
                                <IoEyeSharp className="text-[20px] mr-2" />
                                <button
                                  className="text-[13px]"
                                  onClick={() => {
                                    openModalRec(item);
                                    handleEtat(item.id_rec,answer);
                                  }}
                                >
                                  Consulter
                                </button>
                              </div>
                            </DropdownItem>

                            <DropdownItem textValue="Supprimer">
                              <button className=" hover:bg-greenColor rounded-md  hover:text-white px-3 text-center py-2 flex items-center mt-2 ">
                                <MdDelete className="text-[20px] mr-2" />
                                <p className="text-[13px]"> Supprimer</p>
                              </button>
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-4 pt-10 text-gray-500"
                  >
                    Aucune réclamation n'a été ajoutée
                  </td>
                </tr>
              )}
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
          className="custom-modal"
          size="md"
          isOpen={isModalOpen}
          onClose={closeModalRec}
        >
          <div className="modal-overlay ">
            <ModalContent className="custom-modal-content">
              <ModalHeader className="custom-modal-header flex flex-col items-center">
                Détails de la Réclamation
              </ModalHeader>
              <ModalBody className="custom-modal-body">
                {selectedRec && (
                  <div>
                    <h1 className="text-[15px] mt-4 font-semibold">
                      Nom et Prénom :{" "}
                      <span className="mb-4 font-normal text-[13px]">
                        {" "}
                        {selectedRec.NomPrenom_rec}
                      </span>
                    </h1>
                    <h1 className="text-[15px] mt-4 font-semibold">
                      Email :{" "}
                      <span className="mb-4 font-normal text-[13px]">
                        {" "}
                        {selectedRec.Email_rec}
                      </span>
                    </h1>
                    <h1 className="text-[15px] mt-4 font-semibold">
                      Télèphone :{" "}
                      <span className="mb-4 font-normal text-[13px]">
                        {" "}
                        {selectedRec.Telephone_rec}
                      </span>
                    </h1>
                    <h1 className="text-[15px] mt-4 font-semibold">
                      Profil :{" "}
                      <span className="mb-4 font-normal text-[13px]">
                        {" "}
                        {selectedRec.Profil_user}
                      </span>
                    </h1>
                    <h1 className="text-[15px] mt-4 font-semibold">
                      Description :{" "}
                      <span className="mb-4 font-normal text-[13px]">
                        {" "}
                        {selectedRec.description_rec}
                      </span>
                    </h1>

                    <div className="flex justify-center flex-row md:space-x-2  my-8 flex-wrap ">
                      {File_rec.map((url, index) => (
                        <Image
                          key={index}
                          src={
                            url.endsWith(".pdf") ? "/path/to/pdf-icon.png" : url
                          }
                          alt={`File ${index + 1}`}
                          width={70}
                          height={70}
                          className="border-4 rounded-md border-gray-200"
                          style={{ maxWidth: "100%" }}
                          onClick={() => window.open(url, "_blank")}
                        />
                      ))}
                    </div>
                    <div>
                      <Textarea
                        type={"text"}
                        name={"answer"}
                        rows={5}
                        onChange={handleChangeValue}
                        placeholder={"Votre Réponse"}
                      />{" "}
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-greenColor text-white hover:bg-darkColor rounded-full p-2 px-7 text-[13.5px] my-3"
                        onClick={() => {
                          handleSubmit(selectedRec.Email_rec,selectedRec.id_rec);
                        }}
                      >
                        Envoyer
                      </button>
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
