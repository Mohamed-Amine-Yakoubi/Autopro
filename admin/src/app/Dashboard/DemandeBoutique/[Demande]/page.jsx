"use client";
import { getAllStore, getOneVille, getStoreByID } from "@/app/lib/Boutique";
import { useSession } from "next-auth/react";
import Image from "next/image";

import { IoEyeSharp, IoLocation, IoLogoLinkedin } from "react-icons/io5";
import { FaPhoneAlt, FaFacebook, FaCheckCircle } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaSquareInstagram, FaCamera, FaClockRotateLeft, FaClock } from "react-icons/fa6";
import { TbWorldWww } from "react-icons/tb";
import { MdOutlineTitle } from "react-icons/md";

import { PiCityFill } from "react-icons/pi";
import { FaBoxOpen } from "react-icons/fa";

import React, { useEffect, useState } from "react";
import Cards from "@/components/Cards";
import Link from "next/link";
import { getProductbyStoreId } from "@/app/lib/Product";
import { getCategory } from "@/app/lib/Category";
import CardsProduit from "@/components/CardsProduit";

const Demande = (props) => {
  const id_demande = props.params.Demande;
  const [store, setStore] = useState("");
  const [produit, setProduit] = useState([]);

  const [Allstore, setAllstore] = useState([]);
  const [ville, setVille] = useState("");
  useEffect(() => {
    // Function to fetch store and ville
    const fetchStoreAndVille = async () => {
      try {
        const itemStore = await getStoreByID(id_demande);
        setStore(itemStore);

        const ville_Store = await getOneVille(itemStore.id_ville);
        setVille(ville_Store);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getAllStore().then((item) => setAllstore(item));

    const fetchData = async () => {
      try {
        const products = await getProductbyStoreId(id_demande);
        const productsWithCategory = await Promise.all(
          products.map(async (prod) => {
            try {
              const category = await getCategory(prod.id_cat);
              return { ...prod, category };
            } catch (error) {
              console.error("Error fetching category data:", error);
              return prod;
            }
          })
        );

        setProduit(productsWithCategory.slice(0, 4));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    fetchStoreAndVille();
  }, [id_demande]);
  console.log(produit);
  return (
    <div>
      <Cards>
        <div className="p-5">
          <div className="flex items-center space-x-3">
            <Image
              src={store.Logo_magasin}
              className="rounded-full   bg-blueLight border-2 object-contain p-2 w-[80px] h-[80px] border-gray-200"
              width={80}
              height={80}
              alt="alt"
            />
            <div>
              {" "}
              <h2 className="font-bold text-darkColor">
                {store.Libelle_magasin}
              </h2>
              <div className="mt-2">
                {" "}
                {store.isActive === true ? (
                  <p className="flex items-center text-[12px] text-textColor">
                    <span className="text-greenColor mr-1">
                      <FaCheckCircle />
                    </span>
                    Approuvé
                  </p>
                ) : (
                  <p className="flex items-center text-[12px] text-textColor">
                    <span className="text-orange-300 mr-1">
                      <FaClock />
                    </span>
                    En attente
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex md:flex-row flex-col space-x-24 ">
            <div className="text-[13.5px] my-6  mx-4 md:w-1/2 ">
              <h2 className="text-[16px]   font-bold pb-3">
                Informations sur la boutique
              </h2>
              <p className=" text-textColor">{store.Description_magasin}</p>
              <hr className="my-6" />
              <div className="space-y-3">
                <p className="text-textColor">
                  <span className="font-semibold text-darkColor">
                    Nom de la boutique :{" "}
                  </span>
                  {store.Libelle_magasin}
                </p>
                <p className="text-textColor">
                  <span className="font-semibold text-darkColor">
                    E-mail :{" "}
                  </span>
                  {store.Email_magasin}
                </p>
                <p className="text-textColor">
                  <span className="font-semibold text-darkColor">
                    Téléphone :{" "}
                  </span>
                  +216 {store.Telephone_magasin}
                </p>
                <p className="text-textColor">
                  <span className="font-semibold text-darkColor">
                    Adresse :{" "}
                  </span>
                  {store.Adresse_magasin}
                </p>
                <p className="text-textColor">
                  <span className="font-semibold text-darkColor">Ville : </span>
                  {ville.Libelle_ville}
                </p>
              </div>
            </div>
            <div className="text-[13.5px] my-6   w-1/3 ">
              <h2 className="text-[16px]   font-bold pb-3">Réseaux sociaux</h2>
              <div className="space-y-4">
                <Link
                  href={`${store.Lien_facebook}`}
                  target="_blank"
                  className=" text-textColor flex overflow-hidden  "
                >
                  {" "}
                  <span>
                    <FaFacebook className="text-[20px] mr-2 text-greenColor" />
                  </span>
                  <span>
                    {store.Lien_facebook
                      ? store.Lien_facebook.substring(0, 35)
                      : ""}
                  </span>
                </Link>

                <Link
                  href={`${store.Lien_instagram}`}
                  target="_blank"
                  className=" text-textColor flex "
                >
                  <span>
                    <FaSquareInstagram className="text-[20px] mr-2 text-greenColor" />
                  </span>
                  <span>
                    {" "}
                    {store.Lien_instagram
                      ? store.Lien_instagram.substring(0, 35)
                      : ""}
                  </span>
                </Link>
                <Link
                  href={`${store.Lien_linkedin}`}
                  target="_blank"
                  className=" text-textColor flex "
                >
                  <span>
                    <IoLogoLinkedin className="text-[20px] mr-2 text-greenColor" />
                  </span>
                  <span>
                    {" "}
                    {store.Lien_linkedin
                      ? store.Lien_linkedin.substring(0, 35)
                      : ""}
                  </span>
                </Link>
                <Link
                  href={`${store.Lien_siteWeb}`}
                  target="_blank"
                  className=" text-textColor flex "
                >
                  <span>
                    <TbWorldWww className="text-[20px] mr-2 text-greenColor" />
                  </span>
                  <span>
                    {store.Lien_siteWeb
                      ? store.Lien_siteWeb.substring(0, 35)
                      : ""}
                  </span>
                </Link>
              </div>
              <hr className="my-6" />
              <div className="space-y-4">
                <h2 className="text-[16px]   font-bold pb-1">Autre Boutique</h2>
                {Allstore.map((item, index) => (
                  <div
                    key={index}
                    className=" text-textColor flex justify-between items-center overflow-hidden w-42"
                  >
                    <div className="flex space-x-3  items-center">
                      <Image
                        src={item.Logo_magasin}
                        className="rounded-md  w-[50px] bg-blueLight border-2 border-gray-200"
                        width={50}
                        height={50}
                        alt="alt"
                      />
                      <div>
                        <p className="font-semibold text-darkColor">
                          {item.Libelle_magasin}
                        </p>
                        <p className="text-[12px]">
                          {item.Description_magasin.substring(0, 30)}
                        </p>
                      </div>
                    </div>
                    <Link
                      className="font-semibold border px-2 py-1 border-greenColor rounded-full text-darkColor text-[11px]"
                      href={`/Dashboard/DemandeBoutique/${item.id_magasin}`}
                    >
                      Consulter
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mx-4">
            <div className="flex flex-row items-center justify-between my-5  mb-10">
            <h2 className="font-bold text-darkColor ">Produits</h2>
            <h2 className="font-semibold border px-3 py-1 border-greenColor rounded-full text-darkColor text-[12px]">Voir plus...</h2>
            </div>
            <div className="flex justify-center space-x-10 my-4">
              
              {produit.length>0 ?(produit.map((product) => (
                <div key={product.id_prod}>
                  <div className="flex justify-center ">
                    {/* <Link href={`/Catalogue/${product.id_prod}`}> */}
                    <CardsProduit
                      image={product.Image_thumbnail}
                      libelle={product.Libelle_prod}
                      categorie={product.category.Libelle_cat}
                      prix={product.prix_prod}
                      stock={product.Stock_prod}
                      link={`./Catalogue/${product.id_prod}`}
                      handleFavoris={() => handleFavoris(product.id_prod)}
                    />
                    {/* </Link> */}
                  </div>
                </div>
              ))):(
                // <p className="font-poppins my-12 text-[20px] text-gray-300">Aucun produit n'a été ajouté</p>
                <div className=" flex flex-col justify-center items-center my-12 ">
                  <FaBoxOpen className="text-[60px] text-gray-300"/>
                <p className="font-poppins   rounded-md text-[15px] text-gray-300">Aucun produit n'a été ajouté</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Cards>
    </div>
  );
};
export default Demande;
