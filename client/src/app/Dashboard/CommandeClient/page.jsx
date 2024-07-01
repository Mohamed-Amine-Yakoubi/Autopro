"use client";

import { Get_AllCommande } from "@/app/lib/Commande";
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

const CommandeClient = () => {
  const [store, setStore] = useState(null);
  const [user, setUser] = useState([]);
  const [commande, setCommande] = useState([]);

  const { data: session } = useSession();
  const id_user = session?.user?.id_user || "";
  const [filter, setFilter] = useState("");
  const [combinedData, setCombinedData] = useState([]);
  const [etat, setEtat] = useState("");
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
            const combinateData= item.map((combinateItem)=>{
              const userItem=getUserItem.find(user=>user.id_user===combinateItem.id_user);
              return {...combinateItem,...userItem}
            });
            setCombinedData(combinateData)
          });
        });
      });
    }
  }, [store]);
  const handleSearch = (e) => {
    setFilter(e.target.value);
  };
console.log("comibnate",combinedData)
  const filteredData = combinedData.filter(
    (item) =>
      (item.Nom_user?.toLowerCase().includes(filter.toLowerCase()) ?? false) ||
    (item.Prenom_user?.toLowerCase().includes(filter.toLowerCase()) ?? false) ||
      (item.Reference_cmd?.toLowerCase().includes(filter.toLowerCase()) ??
        false) ||
      (item.Date_cmd?.toLowerCase().includes(filter.toLowerCase()) ?? false)
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

  const handleEtat = async (e, id_magasin, id_MainCmd) => {
    e.preventDefault();
    const newEtat = e.target.name; // Get the new state from the button name

    console.log(
      "Etat:",
      newEtat,
      "MainCmd:",
      id_MainCmd,
      "Magasin:",
      id_magasin
    );
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

      if (!res.ok) {
        throw new Error("Failed to update store");
      }

      const result = await res.json();

      if (result) {
        const updatedCommandes = commande.map((cmd) =>
          cmd.id_MainCmd === id_MainCmd ? { ...cmd, etat_cmd: newEtat } : cmd
        );
        setCommande(updatedCommandes);
      }
    } catch (error) {
      console.error("Failed to update store:", error.message);
      alert("Failed to update store");
    }
  };

  return (
    <div className="mx-4 md:mx-10 mb-10">
      <div className="mb-3 relative  ">
        <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
          <IoSearch />
        </span>
        <input
          type="text"
          className="outline-none md:w-96 text-[13px] w-full bg-grayLight border-2 border-gray-200 py-2 pl-10 pr-3 rounded-md"
          onChange={handleSearch}
        />
      </div>
      <div className="shadow-lg rounded-lg overflow-hidden ">
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
                  <td className="   text-[13px]">{item.prix_total},00 TND </td>
                  <td className="   text-[13px]">{item.Reference_cmd} </td>
                  <td className="   text-[13px]  ">{item.Date_cmd}</td>
                  <td className="pt-1">
                    {item.etat_cmd === "en attente" ? (
                      <p className="bg-yellow-400 w-[80px] text-center py-2  rounded-full text-[12px]">
                        en attente
                      </p>
                    ) : item.etat_cmd === "Approuvé" ? (
                      <p className="bg-green-400 w-[80px] text-center py-2  rounded-full text-[12px]">
                        Terminée
                      </p>
                    ) : item.etat_cmd === "Annuler" ? (
                      <p className="bg-red-400  text-white w-[80px] text-center py-2  rounded-full text-[12px]">
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
                                    item.id_MainCmd
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
                                    item.id_MainCmd
                                  )
                                }
                              >
                                Annuler
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

export default CommandeClient;
