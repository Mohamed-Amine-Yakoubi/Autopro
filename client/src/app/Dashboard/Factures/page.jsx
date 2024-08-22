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
import { getFactureByIdStore } from "@/app/lib/facture";

const Factures = () => {
  const store = useSelector((state) => state.store);
  const [factures, setFactures] = useState([]);
 

  const { data: session } = useSession();
  const id_user = session?.user?.id_user || "";
  const [filter, setFilter] = useState("");

 

  useEffect(() => {
    if (store) {
      store.items.map((items) => {
        getFactureByIdStore(items.id_magasin).then((itemFacture) => {
          setFactures(itemFacture);
        });
      });
    }
  }, [store]);
  const handleSearch = (e) => {
    setFilter(e.target.value);
  };

  const filteredData = factures.filter(
    (item) =>
      (item.Nom_user?.toLowerCase().includes(filter.toLowerCase()) ??
        false) ||
      (item.Refrence_fact?.toLowerCase().includes(filter.toLowerCase()) ?? false)  
 
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
  for (let i = 1; i <= Math.ceil(factures.length / commandesPerPage); i++) {
    pageNumbers.push(i);
  }

 
   
 
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
              <th className="w-1/3 py-4  text-left text-textColor font-bold text-[13px]">
                Nom et Prénom
              </th>
              <th className="w-1/3 py-4  text-left text-textColor font-bold text-[13px]">
                Référence
              </th>
           
              <th className="w-1/3 py-4  text-left text-textColor font-bold text-[13px]">
                Date
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
                    {item.id_fact}
                  </td>
                  <td className="      ">
                    <p className="  text-[13px]">{item.Nom_user}</p>
                  </td>

                  <td className="   text-[13px]">{item.Refrence_fact} </td>
            
                  <td className="   text-[13px]  ">
                    {item.createdAt.substring(0, 10)}
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
    
    </div>
  );
};
 
export default Factures;
