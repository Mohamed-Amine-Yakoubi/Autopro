"use client";

import StatisticsCard from "@/components/StatisticsCard";
import { useEffect, useState } from "react";

import {
  FaBoxOpen,
  FaCheckCircle,
  FaClock,
  FaShoppingBasket,
  FaUserFriends,
} from "react-icons/fa";

import { GetAllUsersClaim, GetClaimStoreId } from "../../lib/Reclamations";
import { FcCancel } from "react-icons/fc";

import Cards from "@/components/Cards";
import Link from "next/link";

import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { BsFillSendExclamationFill } from "react-icons/bs";
import { getAllUsers } from "../../lib/User";
import { getAllStore } from "../../lib/boutique";
import Image from "next/image";

const Home_Dashboard = () => {
  const [claim, setClaim] = useState([]);
  const [store, setStore] = useState([]);
  const [user, setUser] = useState([]);
  const [commande, setCommande] = useState([]);
  const [totalUser, setTotalUser] = useState(0);

  const [totalstore, setTotalStore] = useState(0);
  const [totalFournisseur, setTotalFournisseur] = useState(0);
  const [totalClaim, setTotalClaim] = useState(0);

  useEffect(() => {
    getAllUsers().then((itemUser) => {
      setUser(itemUser);
      const filteredFournisseur = itemUser.filter(
        (current) => current.Profil_user === "Fournisseur"
      );
      const totalUser = itemUser.length;
      setTotalUser(totalUser);
      setTotalFournisseur(filteredFournisseur.length);
    });
    GetAllUsersClaim().then((item) => {
      setClaim(item);
      setTotalClaim(item.length);
    });
    getAllStore().then((itemStore) => {
      setStore(itemStore);
      setTotalStore(itemStore.length);
    });
  }, []);

  console.log("total claim", totalClaim);
  console.log("total totalArticle", totalUser);

  return (
    <div>
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        <StatisticsCard
          color={"greenColor"}
          icon={<FaBoxOpen />}
          title={"Total des utilisateurs"}
          value={totalUser}
          footer={"+5% qu'hier"}
        />
        <StatisticsCard
          color={"greenColor"}
          icon={<FaMoneyBillTrendUp />}
          title={"Boutique"}
          value={totalstore}
          footer={"+55% que le mois dernier"}
        />
        <StatisticsCard
          color={"greenColor"}
          icon={<FaShoppingBasket />}
          title={"Fournisseur"}
          value={totalFournisseur}
          footer={"+3% que le mois dernier"}
        />
        <StatisticsCard
          color={"greenColor"}
          icon={<BsFillSendExclamationFill />}
          title={"Reclamations"}
          value={totalClaim}
          footer={"+1% than last month"}
        />
      </div>

      <div className="flex lg:flex-row flex-col lg:space-x-4  lg:space-y-0 space-y-7  w-full">
        <div className="  w-full">
          <Cards className={"w-full h-full p-4 sm:overflow-x-auto     "}>
            {" "}
            <div className="relative flex items-center justify-between">
              <div className="text-[20px] font-bold text-greenColor  ">
                Recalamtions des Clients
              </div>
              <div className="  text-[13.5px] ">
            
            <Link href={"/Dashboard/Reclamations"}>Consulter</Link>
    
          </div>
            </div>
            <div className="mt-8 h-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100  ">
                    <th className="w-1/12 py-4  text-center text-gray-600 font-bold text-[13px]">
                      N°
                    </th>
                    <th className="w-1/4 py-4  text-left text-gray-600 font-bold text-[13px]">
                      Utilisateur
                    </th>
                    <th className="w-1/4 py-4  text-left text-gray-600 font-bold text-[13px]">
                      Email
                    </th>
                    <th className="w-1/6 py-4  text-left text-gray-600 font-bold text-[13px]">
                      Telephone
                    </th>

                    <th className="w-1/3 py-4  text-left text-gray-600 font-bold text-[13px]">
                      Date
                    </th>
                    <th className="w-1/4 py-4  text-left text-gray-600 font-bold text-[13px]">
                      Etat
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {claim.map((item, index) => {
                    return (
                      <tr className="border-b border-gray-200  " key={index}>
                        <td className="   text-center   py-3.5 text-greenColor  text-[13px]">
                          {item.id_rec}
                        </td>
                        <td className="      ">
                          <p className="  text-[13px]">{item.NomPrenom_rec}</p>
                        </td>

                        <td className="   text-[13px]">{item.Email_rec.substring(0, 15)} </td>
                        <td className="   text-[13px]  ">
                          {item.Telephone_rec}
                        </td>
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
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Cards>
        </div>
        <div className="  w-full">
          <Cards className={"w-full h-full p-4 sm:overflow-x-auto     "}>
            {" "}
            <div className="relative flex items-center justify-between">
              <div className="text-[20px] font-bold text-greenColor  ">
               Boutique
              </div>
              <div className="  text-[13.5px] ">
            
                <Link href={"/Dashboard/DemandeBoutique"}>Consulter</Link>
        
              </div>
            </div>
            <div className="mt-8 h-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="w-1/12 py-4  text-center text-gray-600 font-bold text-[13px]">
                      N°
                    </th>
                    <th className="w-1/3 py-4  text-left text-gray-600 font-bold text-[13px]">
                      Nom de la boutique
                    </th>
                    <th className="w-1/4 py-4  text-left text-gray-600 font-bold text-[13px]">
                      Email
                    </th>
               

                    <th className="w-1/4   py-4  text-left text-gray-600 font-bold text-[13px]">
                      Date
                    </th>
                    <th className="w-1/4 py-4  text-left text-gray-600 font-bold text-[13px]">
                      Etat
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {store.map((item, index) => (
                    <tr
                      key={index}
                      className="text-[13px] border-b border-gray-200  "
                    >
                      <td className="   text-center   py-3.5 text-greenColor  text-[13px]">
                        {item.id_magasin}
                      </td>

                      <td className="flex items-center py-2">
                        <Image
                          className="bg-blueLight rounded-md w-[50px] h-[50px] border object-contain mr-2"
                          src={item.Logo_magasin}
                          height={50}
                          width={50}
                          alt="logo"
                        />
                        {item.Libelle_magasin}
                      </td>
                      <td>{item.Email_magasin.slice(0,15)}...</td>
           
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Cards>
        </div>
      </div>
    </div>
  );
};
export default Home_Dashboard;
