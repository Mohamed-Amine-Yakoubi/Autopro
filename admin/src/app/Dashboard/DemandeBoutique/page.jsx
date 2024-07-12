"use client";
import React, { useEffect, useState } from "react";
import Cards from "@/components/Cards";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaCheckCircle } from "react-icons/fa";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { FcCancel } from "react-icons/fc";

import { FaClock } from "react-icons/fa6";

import { IoEyeSharp, IoSearch } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
import { DeleteStoreByID, getAllStore } from "@/app/lib/boutique";
import Image from "next/image";
import { useRouter } from "next/navigation";

const DemandeBoutique = () => {
  const router = useRouter();
  const [filter, setFilter] = useState("");

  const [boutique, setBoutique] = useState([]);
  useEffect(() => {
    getAllStore().then((itemStore) => {
      setBoutique(itemStore);
    });
  }, []);

  const handleEtat = async (e, id_magasin, Email_magasin,id_proprietaire, Libelle_magasin) => {
    e.preventDefault();
    const newEtat = e.currentTarget.name;
    console.log("Button clicked with newEtat:", newEtat);
    console.log("ID Magasin:", id_magasin);
    try {
      const mailContent = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              display: flex; justify-content: center;
              margin: 0;
              padding: 0;
          
              
        
         
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              border-radius: 5px;
              background-color:white;
            }
            h1 {
              color: #333;
              flex:center;
              padding-bottom:10px;
            }
            p {
              color: #666;
            }
            .button {
              display: inline-block;
              padding: 10px 20px;
              background-color: #007bff;
              color:white;
              flex:center;
              text-decoration: none;
              border-radius: 5px;
            }
            table {
              width: 600px;
              margin-top:25px;
              border: 1px solid #fafafa ;
              border-collapse: collapse;
            }
          </style>
        </head>
        <body class="container">
          <h2 style="color:#4BAF4F; text-align:center">Approbation de votre demande de boutique sur notre platforme</h2>
     
     
            <h4 style="font-size:17px;margin-top:20px"> Bonjour ${Libelle_magasin}</h4>
        
    
            <p style="margin-top:-20px">Nous sommes heureux de vous informer que la 
            demande d'inscription de votre boutique sur notre site a été approuvée 
            avec succès. Vous pouvez maintenant commencer à mettre en ligne vos produits
             et à gérer votre boutique. Nous vous remercions pour votre confiance et
              restons à votre disposition pour toute assistance ou question
               que vous pourriez avoir. Bon début et bonne vente !</p>

       
 
  
    
        
        </body>
      </html>
    `;

      const MailCommande = await fetch(
        `http://localhost:4000/api/v1/magasin/MailStore`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: Email_magasin,
            subject:
              "Approbation de votre demande de boutique sur notre platforme",
            html: mailContent,
          }),
        }
      );

      const res = await fetch(
        `http://localhost:4000/api/v1/magasin/updateStore/${id_magasin}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ etat_magasin: newEtat }),
        }
      );
      if (newEtat === "Approuvé") {
        const res2 = await fetch(
          `http://localhost:4000/api/v1/user/UpdateAccount/${id_proprietaire}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({Profil_user:"Fournisseur"}),
          }
        );

        if (!res2.ok) {
          throw new Error("Failed to update user");
        }
      }
      if (!res.ok) {
        throw new Error("Failed to update store");
      }

      const result = await res.json();

      if (result) {
        const updatedMagasin = boutique.map((item) =>
          item.id_magasin === id_magasin
            ? { ...item, etat_magasin: newEtat }
            : item
        );
        setBoutique(updatedMagasin);
      }
    } catch (error) {
      console.error("Failed to update store:", error.message);
      alert("Failed to update store");
    }
  };
  const handleDelete = async (id_magasin) => {
    DeleteStoreByID(id_magasin).then(() => {
      setBoutique((prevStore) => prevStore.filter((e) => e.id_magasin !== id_magasin));
    });
  };
  const handleSearch = (e) => {
    setFilter(e.target.value);
  };

  const FilterStore = boutique.filter(
    (item) =>
      (item.Libelle_magasin?.toLowerCase().includes(filter.toLowerCase()) ??
        false) ||
      (item.etat_magasin?.toLowerCase().includes(filter.toLowerCase()) ??
        false) ||
      (String(item.Telephone_magasin)?.includes(filter) ?? false) ||
      (item.Email_magasin?.toLowerCase().includes(filter.toLowerCase()) ??
        false)
  );
  // Pagination calculations

  const [currentPage, setCurrentPage] = useState(1);
  const [StorePerPage] = useState(6);
  const indexOfLastcommande = currentPage * StorePerPage;
  const indexOfFirstcommande = indexOfLastcommande - StorePerPage;
  const currentStore = FilterStore.slice(
    indexOfFirstcommande,
    indexOfLastcommande
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Render page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(boutique.length / StorePerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <Cards className={"w-full h-full p-4 sm:overflow-x-auto     "}>
        {" "}
        <div className="relative flex items-center justify-between">
          <div className="text-[20px] font-bold text-greenColor  ">
            Demande Boutique
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
                <option value="Rejeté">Rejeté</option>
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
                  <p className="text-xs    tracking-wide text-gray-600">N°</p>
                </th>
                <th className="border-b w-1/2 border-gray-200 pr-28 py-[12px] text-start dark:!border-navy-700">
                  <p className="text-xs tracking-wide text-gray-600">
                    Nom de la boutique
                  </p>
                </th>
                <th className="border-b w-1/3 border-gray-200 pr-28 py-[12px] text-start dark:!border-navy-700">
                  <p className="text-xs tracking-wide text-gray-600">E-mail</p>
                </th>
                <th className="border-b w-1/3 border-gray-200 pr-28 py-[12px] text-start dark:!border-navy-700">
                  <p className="text-xs tracking-wide text-gray-600">
                    Téléphone
                  </p>
                </th>
                <th className="border-b w-1/3 border-gray-200 pr-28 py-[12px] text-start dark:!border-navy-700">
                  <p className="text-xs tracking-wide text-gray-600">Date</p>
                </th>
                <th className="border-b w-1/3 border-gray-200 pr-28 py-[12px] text-start dark:!border-navy-700">
                  <p className="text-xs tracking-wide text-gray-600">Etat</p>
                </th>
                <th className="border-b w-20 border-gray-200 pr-28 py-[12px] text-start dark:!border-navy-700"></th>
              </tr>
            </thead>
            <tbody>
              {currentStore.map((item, index) => (
                <tr key={index} className="text-[13px] border-b border-gray-200  ">
                  <td className="   text-center   py-3.5 text-greenColor  text-[13px]">
                    {item.id_magasin}
                  </td>

                  <td className="flex items-center py-2">
                    <Image
                      className="bg-blueLight rounded-md border  mr-2"
                      src={item.Logo_magasin}
                      height={50}
                      width={50}
                      alt="logo"
                    />
                    {item.Libelle_magasin}
                  </td>
                  <td>{item.Email_magasin}</td>
                  <td>{item.Telephone_magasin}</td>
                  <td>{item.createdAt.substring(0, 10)}</td>
                  <td>
                    {item.etat_magasin === "Approuvé" ? (
                      <p className="flex items-center ">
                        <span className="text-greenColor mr-1">
                          <FaCheckCircle />
                        </span>
                        Approuvé
                      </p>
                    ) : item.etat_magasin === "En attente" ? (
                      <p className="flex items-center ">
                        <span className="text-orange-300 mr-1">
                          <FaClock />
                        </span>
                        En attente
                      </p>
                    ) : item.etat_magasin === "Rejeté" ? (
                      <p className="flex items-center ">
                        <span className="text-orange-300 mr-1">
                          <FcCancel className="text-[18px]" />
                        </span>
                        Rejeté
                      </p>
                    ) : null}
                  </td>
                  <td>
                    {" "}
                    <Dropdown className="bg-gray-100 p-4  rounded-md shadow-lg">
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
                              href={`/Dashboard/DemandeBoutique/${item.id_magasin}`}
                            >
                              Consulter
                            </Link>
                          </div>
                        </DropdownItem>
                        <DropdownItem>
                          <button
                            className=" hover:bg-greenColor rounded-md  hover:text-white p-2 flex items-center mt-3"
                            onClick={() => handleDelete(item.id_magasin)}
                          >
                            <MdDelete className="text-[20px] mr-2" />
                            <p className="text-[14px]"> Supprimer</p>
                          </button>
                        </DropdownItem>
                        <DropdownItem textValue="Approuvé">
                          <button
                            className=" hover:bg-greenColor rounded-md  hover:text-white p-2 flex items-center mt-3"
                            type="submit"
                            name="Approuvé"
                            onClick={(e) =>
                              handleEtat(
                                e,
                                item.id_magasin,
                                item.Email_magasin,
                                item.id_proprietaire,
                                item.Libelle_magasin
                              )
                            }
                          >
                            <FaCheckCircle className="text-[18px] mr-2" />
                            <p className="text-[14px]"> Approuvé</p>
                          </button>
                        </DropdownItem>
                        <DropdownItem textValue="Rejeté">
                          <button
                            className=" hover:bg-greenColor rounded-md  hover:text-white p-2 flex items-center mt-3"
                            type="submit"
                            name="Rejeté"
                            onClick={(e) =>
                              handleEtat(
                                e,
                                item.id_magasin,
                                item.Email_magasin,
                                item.Libelle_magasin
                              )
                            }
                          >
                            <FcCancel className="text-[20px] mr-2" />
                            <p className="text-[14px]">Rejeté</p>
                          </button>
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
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
    </div>
  );
};
export default DemandeBoutique;
