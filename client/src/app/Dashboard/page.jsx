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
import { useSelector } from "react-redux";
import { GetClaimStoreId } from "../lib/Reclamations";
import { FcCancel } from "react-icons/fc";
import { Get_AllCommande } from "../lib/Commande";
import { getUser } from "../lib/User";
import Cards from "@/components/Cards";
import Link from "next/link";
import { getProductbyStoreId } from "../lib/Product";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { BsFillSendExclamationFill } from "react-icons/bs";
import Charts from "@/components/Charts";

const Dashboard = () => {
  const store = useSelector((state) => state.store);
  const [claim, setClaim] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [user, setUser] = useState([]);
  const [commande, setCommande] = useState([]);
  const [totalArticle, setTotalArticle] = useState(0);
  const [totalCommande, setTotalCommande] = useState(null);

  const [totalArgent, setTotalArgent] = useState(0);
  const [totalClaim, setTotalClaim] = useState(0);

  useEffect(() => {
    if (store) {
      store.items.map((items) => {
        GetClaimStoreId(items.id_magasin).then((claimUser) => {
          setClaim(claimUser.slice(0, 5));
          const totalClaim = claimUser.length;
          setTotalClaim(totalClaim);
        });
        getProductbyStoreId(items.id_magasin).then((itemPrd) => {
          setTotalArticle(itemPrd.length);
        });
      });

      store.items.map((items) => {
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
            setCombinedData(combinateData.slice(0, 5));
          });

          // Calculate the sum of prix_ttotal
          const filteredItems = item.filter(
            (current) => current.id_magasin === items.id_magasin
          );
          const total = filteredItems.reduce(
            (sum, current) => sum + current.prix_total,
            0
          );
          setTotalArgent(total);
          // Calculate the sum of prix_ttotal
          const totalCommande = filteredItems.length;
          setTotalCommande(totalCommande);
        });
      });
    }
  }, [store]);
  console.log("total", totalArgent);
  console.log("total commande", totalCommande);
  console.log("total claim", totalClaim);
  console.log("total totalArticle", totalArticle);
 
  return (
    <div>
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        <StatisticsCard
          color={"greenColor"}
          icon={<FaMoneyBillTrendUp />}
          title={"Ventes totales"}
          value={`${totalArgent} TD`}
          footer={"+55% que la semaine dernière"}
        />
        <StatisticsCard
          color={"greenColor"}
          icon={<FaShoppingBasket />}
          title={"Total Commande"}
          value={totalCommande}
          footer={"+3% than last month"}
        />
        <StatisticsCard
          color={"greenColor"}
          icon={<BsFillSendExclamationFill />}
          title={"Reclamations"}
          value={totalClaim}
          footer={"+1% than last month"}
        />
        <StatisticsCard
          color={"greenColor"}
          icon={<FaBoxOpen />}
          title={"Total Produit "}
          value={totalArticle}
          footer={"+5% qu'hier"}
        />
      </div>
    
      <div className="flex lg:flex-row flex-col lg:space-x-4  lg:space-y-0 space-y-7  w-full">
        <div className="  w-full">
          <Cards className={"w-full h-full p-4  overflow-x-auto     "}>
            {" "}
            <div className="relative flex items-center justify-between">
              <div className="text-[20px] font-bold text-greenColor  ">
                Reclamations Client
              </div>
              <div className="text-[14px] font-bold text-textColor  ">
                <Link href={"/Dashboard/Reclamations"}>Consulter</Link>
              </div>
            </div>
            <div className="mt-8 h-full overflow-x-auto">
              <table className="w-full  ">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="w-1/12 py-4  text-center text-textColor font-bold text-[13px]">
                      N°
                    </th>
                    <th className="w-1/4 py-4  text-left text-textColor font-bold text-[13px]">
                      Nom et Prénom
                    </th>
                    <th className="w-1/4 py-4  text-left text-textColor font-bold text-[13px]">
                      Email
                    </th>
                    <th className="w-1/4 py-4  text-left text-textColor font-bold text-[13px]">
                      Telephone
                    </th>

                    <th className="w-1/2 py-4  text-left text-textColor font-bold text-[13px]">
                      Date
                    </th>
                    <th className="w-1/4 py-4  text-left text-textColor font-bold text-[13px]">
                      Etat
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {claim.map((item, index) => {
                    return (
                      <tr className="border-b border-gray-200  " key={index}>
                        <td className="   text-center   py-3.5 text-greenColor  text-[13px]">
                          {item.id_rec}
                        </td>
                        <td className="      ">
                          <p className="  text-[13px]">{item.NomPrenom_rec}</p>
                        </td>

                        <td className="   text-[13px]">
                          {item.Email_rec.slice(0, 10)}...{" "}
                        </td>
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
          <Cards className={"w-full h-full p-4  overflow-x-auto     "}>
            {" "}
            <div className="relative flex items-center justify-between">
              <div className="text-[20px] font-bold text-greenColor  ">
                Commandes Clients
              </div>
              <div className="text-[14px] font-bold text-textColor  ">
                <Link href={"/Dashboard/CommandeClient"}>Consulter</Link>
              </div>
            </div>
            <div className="mt-8 h-full overflow-x-auto ">
              <table className="w-full  ">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="w-1/12 py-4  text-center text-textColor font-bold text-[13px]">
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
                  </tr>
                </thead>
                <tbody className="bg-white ">
                  {combinedData.map((item) => {
                    const client = user.find(
                      (itemUser) => itemUser.id_user === item.id_user
                    );

                    return (
                      <tr
                        className="border-b  border-gray-200  "
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
                        <td className="   text-[13px]">
                          {item.Reference_cmd}{" "}
                        </td>
                        <td className="   text-[13px]  ">{item.Date_cmd}</td>
                        <td className="  text-[13px]  ">
                          <div className="w-1/2 mx-10  ">
                            {item.etat_cmd === "Approuvé" ? (
                              <p className="flex items-center ">
                                <span className="text-greenColor mr-1">
                                  <FaCheckCircle />
                                </span>
                                Approuvé
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
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Cards>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
