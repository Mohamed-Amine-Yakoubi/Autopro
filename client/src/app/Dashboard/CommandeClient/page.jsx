"use client";

import { DeleteCommande, Get_AllCommande } from "@/app/lib/Commande";
import { getStoreByUserID } from "@/app/lib/Magasin";
import { getUser } from "@/app/lib/User";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { IoEyeSharp, IoReloadCircle, IoSearch } from "react-icons/io5";

import { BsBagCheckFill } from "react-icons/bs";
import { FcCancel } from "react-icons/fc";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { HiDotsHorizontal } from "react-icons/hi";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import Cards from "@/components/Cards";

const CommandeClient = () => {
  const [store, setStore] = useState(null);
  const [user, setUser] = useState([]);
  const [commande, setCommande] = useState([]);

  const { data: session } = useSession();
  const id_user = session?.user?.id_user || "";
  const [filter, setFilter] = useState("");
  const [combinedData, setCombinedData] = useState([]);

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
      store.map((items) => {
        Get_AllCommande(items.id_magasin).then((item) => {
          setCommande(item);

          const User = item.map((itemUser) => getUser(itemUser.id_user));
          Promise.all(User).then((getUserItem) => {
            setUser(getUserItem);
            const combinateData = item.map((combinateItem) => {
              const userItem = getUserItem.find(
                (user) => user.id_user === combinateItem.id_user
              );
              return { ...combinateItem, ...userItem };
            });
            setCombinedData(combinateData);
          });
        });
      });
    }
  }, [store]);
  const handleSearch = (e) => {
    setFilter(e.target.value);
  };

  const filteredData = combinedData.filter(
    (item) =>
      (item.Nom_user?.toLowerCase().includes(filter.toLowerCase()) ?? false) ||
      (item.Prenom_user?.toLowerCase().includes(filter.toLowerCase()) ??
        false) ||
      (item.Reference_cmd?.toLowerCase().includes(filter.toLowerCase()) ??
        false) ||
      (item.Date_cmd?.toLowerCase().includes(filter.toLowerCase()) ?? false) ||
      (String(item.etat_cmd)?.includes(filter) ?? false)
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

  const handleEtat = async (e, id_magasin, id_MainCmd, Email_user) => {
    e.preventDefault();
    const newEtat = e.target.name; // Get the new state from the button name

    try {
      const res = await fetch(
        `http://localhost:4000/api/v1/commande/Update_commande/${id_MainCmd}/${id_magasin}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ etat_cmd: newEtat }),
        }
      );
      const Autopro_logo_URL =
        "https://res.cloudinary.com/dszbzybhk/image/upload/v1723404962/c76ktevrn9lvxad0pmux.png";

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
                  .logo {
                width: 200px;
                text-align:center
              }
          </style>
        </head>
        <body class="container">
          <div style="display:flex;justify-content:center">
                  <img src="${Autopro_logo_URL}" class="logo" alt="logo" />
                </div>
          <h1 style="color:#4BAF4F">Confirmation de votre commande</h1>
       ${(() => {
         const userFound = user.find((item) => item.Email_user === Email_user);

         return `<h4>Bonjour ${userFound.Prenom_user} ${userFound.Nom_user},</h4>`;
       })()}
        ${(() => {
          if (newEtat === "Approuvé") {
            return `
            <p>Pour information – nous avons reçu votre commande n°${id_MainCmd}, elle est maintenant en cours de traitement :</p>
            <p>Votre commande a été validée avec succès et est en cours de traitement. Elle sera prochainement 
            confiée à notre service de livraison. Vous recevrez un message dès que le livreur prendra en charge votre colis.</p>
            <p>Merci de votre confiance,</p>
          `;
          } else if (newEtat === "Annuler") {
            return `
            <p>Pour information – nous avons bien pris en compte l'annulation de votre commande n°${id_MainCmd} :</p>
            <p>Nous regrettons de vous informer que, suite à un problème, votre commande a été annulée. Si vous avez initié cette annulation, nous vous confirmons que la demande a bien été prise en compte.</p>
            <p>Si vous avez des questions ou besoin d'assistance, n'hésitez pas à nous contacter. Nous restons à 
            votre disposition pour toute information complémentaire.</p>
            <p>Merci de votre compréhension,</p>
          `;
          }
          return "";
        })()}
   
  
        
        </body>
      </html>
    `;

      const MailCommande = await fetch(
        `http://localhost:4000/api/v1/commande/MailCommande`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: Email_user,
            subject: "Confirmation de votre commande",
            html: mailContent,
          }),
        }
      );
      if (!res.ok) {
        throw new Error("Failed to update store");
      }

      const result = await res.json();

      if (result) {
        // Immediately update the local state without page reload
        setCombinedData((prevCommandes) =>
          prevCommandes.map((cmd) =>
            cmd.id_MainCmd === id_MainCmd ? { ...cmd, etat_cmd: newEtat } : cmd
          )
        );
      }
    } catch (error) {
      console.error("Failed to update store:", error.message);
      alert("Failed to update store");
    }
  };

  const handleDelete = async (id_cmd) => {
    try {
      const res = await DeleteCommande(id_cmd);
   
    // Check if the response was successful
    if (res.ok) {
      // Remove the deleted command from the combinedData state
      setCombinedData((prevCommandes) =>
        prevCommandes.filter((cmd) => cmd.id_cmd !== id_cmd)
      );
    } else {
      throw new Error("Failed to delete the command");
    }
    } catch (error) {
      console.log("error while handle delete", error);
    }
  };

  return (
    <div className="  mb-10">
      <Cards className={"w-full h-full p-4  overflow-x-auto     "}>
        <div className="text-[20px] font-bold text-greenColor my-5  ">
          Commandes clients
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
              <option value="rejeté">Rejeté</option>
              <option value="en attente">En attente</option>
              <option value="Annuler">Annuler</option>
            </select>
          </div>
        </div>
        <div className="  rounded-lg overflow-hidden ">
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-gray-100">
                <th className="w-16 py-4  text-center text-textColor font-bold text-[13px]">
                  N°
                </th>
                <th className="w-1/3 py-4  text-left text-textColor font-bold text-[13px]">
                  Client
                </th>
                <th className="w-1/4 py-4  text-left text-textColor font-bold text-[13px]">
                  Prix
                </th>
                <th className="w-1/4 py-4  text-left text-textColor font-bold text-[13px]">
                  Référence
                </th>

                <th className="w-1/4 py-4  text-left text-textColor font-bold text-[13px]">
                  Date
                </th>
                <th className="w-1/4 py-4  text-left text-textColor font-bold text-[13px]">
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
              {currentcommandes.map((item) => {
                const client = user.find(
                  (itemUser) => itemUser.id_user === item.id_user
                );

                return (
                  <tr
                    className="border-b border-gray-200  "
                    key={item.id_MainCmd}
                  >
                    <td className="   text-center   py-3.5 text-greenColor  text-[13px]">
                      {item.id_MainCmd}
                    </td>
                    <td className="      ">
                      <p className="  text-[13px]">
                        {" "}
                        {client
                          ? `${client.Prenom_user} ${client.Nom_user}`
                          : "unknow"}
                      </p>
                    </td>
                    <td className="   text-[13px]">
                      {item.prix_total},00 TND{" "}
                    </td>
                    <td className="   text-[13px]">{item.Reference_cmd} </td>
                    <td className="   text-[13px]  ">{item.Date_cmd}</td>
                    <td className="   text-[13px]  ">
                      {item.etat_cmd === "Approuvé" ? (
                        <p className="flex items-center ">
                          <span className="text-greenColor mr-1">
                            <FaCheckCircle />
                          </span>
                          Approuvé {item.id_cmd}
                        </p>
                      ) : item.etat_cmd === "en attente" ? (
                        <p className="flex items-center ">
                          <span className="text-orange-300 mr-1">
                            <FaClock />
                          </span>
                          En attente
                        </p>
                      ) : item.etat_cmd === "rejeté" ? (
                        <p className="flex items-center ">
                          <span className="text-orange-300 mr-1">
                            <FcCancel className="text-[18px]" />
                          </span>
                          Rejeté
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
                                <Link
                                  className="text-[13px]"
                                  href={`/Dashboard/CommandeClient/${item.id_MainCmd}`}
                                >
                                  Consulter
                                </Link>
                              </div>
                            </DropdownItem>
                            <DropdownItem textValue="Approuvé">
                              <div className=" hover:bg-greenColor rounded-md  hover:text-white px-3 text-center py-1 flex items-center  ">
                                <BsBagCheckFill className="text-[20px] mr-2" />
                                <button
                                  name="Approuvé"
                                  type="submit"
                                  className="text-[13px]"
                                  onClick={(e) =>
                                    handleEtat(
                                      e,
                                      item.id_magasin,
                                      item.id_MainCmd,
                                      item.Email_user
                                    )
                                  }
                                >
                                  Approuvé
                                </button>
                              </div>
                            </DropdownItem>
                            <DropdownItem textValue="Annuler">
                              <div className=" hover:bg-greenColor rounded-md   hover:text-white px-3 text-center py-1 flex items-center  ">
                                <FcCancel className="text-[20px] mr-2" />

                                <button
                                  className="text-[13px]"
                                  type="submit"
                                  name="Annuler"
                                  onClick={(e) =>
                                    handleEtat(
                                      e,
                                      item.id_magasin,
                                      item.id_MainCmd,

                                      item.Email_user
                                    )
                                  }
                                >
                                  Annuler
                                </button>
                              </div>
                            </DropdownItem>
                            <DropdownItem textValue="Supprimer">
                              <button
                                type="button"
                                onClick={() => handleDelete(item.id_cmd)}
                                className=" hover:bg-greenColor rounded-md  hover:text-white px-3 text-center py-1 flex items-center  "
                              >
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
    </div>
  );
};

export default CommandeClient;
