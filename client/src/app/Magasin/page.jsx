/* eslint-disable react/no-unescaped-entities */
"use client";
import Header from "@/components/Header";
 

import { useEffect, useState } from "react";


import { FaSearch } from "react-icons/fa";
import { Loading } from "@/components/Loading";

import { getAllStore } from "../lib/Magasin";
import CardMagasin from "@/components/CardMagasin";
import { getOneVille, getVille } from "../lib/Category";

const Magasin = () => {
  const [store, setStore] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [ville, setVille] = useState([]);

  const handleSearch = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemStore = await getAllStore();
        setStore(itemStore);

        const itemVille = await getVille();

        setVille(itemVille);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const filteredData = store.filter(
    (item) =>
      (item.Libelle_magasin?.toLowerCase().includes(filter.toLowerCase()) ??
        false) ||
      (String(item.id_ville)?.includes(filter) ?? false)
  );

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <div className="mb-28">
      {/* section 1 */}
      <div>
        <Header Title={"Catalogue"} />
      </div>
      {/* section 2 */}

      <div className="    flex md:flex-row flex-col    mx-12  mt-12  md:space-x-12   ">
        <div className=" md:w-1/1    w-full  ">
          <div className="flex md:flex-row flex-col justify-between  items-center ">
            <div>
              <h1 className="text-[22px] text-gray-700 font-semibold">
                {" "}
                Visiter un magasin{" "}
              </h1>
              <h1 className="text-[14px] text-greenColor">
                {filteredData.length} magasins
              </h1>
            </div>
            <div className="flex flex-row items-center space-x-5 ">
              <div className="flex flex-row  items-center  border border-gray-300 bg-grayLight h-10 rounded-md   ">
                <FaSearch className="mx-5 text-gray-500 text-[13px]" />
                <input
                  type="text"
                  placeholder="Trouver un Magasin"
                  className="outline-none bg-transparent text-[13px]"
                  onChange={handleSearch}
                />
              </div>
              <div>
                <select
                  className="flex  border border-gray-300   h-10 rounded-md   px-3 p-2 w-full max-w-xl outline-none  bg-grayLight text-textColor  text-[13px]"
                  placeholder="Choisir la marque"
                  name="id_ville"
                  onChange={handleSearch}
                >
                  <option value="" className="text-[12.5px]" disabled>
                    Votre ville
                  </option>
                  {ville.map((item) => (
                    <option
                      key={item.id_ville}
                      value={item.id_ville}
                      className="border-none outline-none text-[12.5px]"
                    >
                      {item.Libelle_ville}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="flex mt-10 flex-wrap justify-center">
            {filteredData.length > 0 ? (
              filteredData.filter(item=>item.etat_magasin==="Approuvé").map((store) => {
                const villeItems = ville.find(
                  (item) => item.id_ville === store.id_ville
                );
                return (
                  villeItems && (
                    <div key={store.id_magasin} className="mt-5">
                      <CardMagasin
                        Logo={store.Logo_magasin}
                        libelle={store.Libelle_magasin}
                        Adresse={store.Adresse_magasin}
                        ville={villeItems.Libelle_ville}
                        link={`./Magasin/${store.id_magasin}`}
                      />
                    </div>
                  )
                );
              })
            ) : (
              <div className="flex md:flex-row flex-col my-28 justify-center">
                <p className="font-poppins text-[17px] text-gray-400">
                  Aucun magasin ne porte ce nom
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Magasin;
