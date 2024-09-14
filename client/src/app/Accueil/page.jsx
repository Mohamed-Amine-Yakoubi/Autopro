/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import bmw_header from "../../public/images/bmw_header.jpg";
import CardsFilter from "@/components/CardsFilter";
import Category from "@/components/Category";
import mercedes from "../../public/images/mercedes.png";
import mercedes_front from "../../public/images/mercedes_front.png";
import Slider from "@/components/Slider";
import CardsProduit from "@/components/CardsProduit";

import Carousel from "@/components/Carousel";
import { getAllProducts } from "../lib/Product";
import { useEffect, useState } from "react";
import { getCategory } from "../lib/Category";
import Link from "next/link";
import { Loading } from "@/components/Loading";
import { useSession } from "next-auth/react";
import ModalStore from "@/components/ModalStore";
import { FaShop } from "react-icons/fa6";

const Accueil = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    getAllProducts()
      .then((products) => {
        const promises = products.map((prod) => {
          return getCategory(prod.id_cat)
            .then((category) => {
              return { ...prod, category };
            })
            .catch((error) => {
              console.error("Error fetching category data:", error);
              // Return the product without category if there's an error
              return prod;
            });
        });
        return Promise.all(promises);
      })
      .then((productsWithCategory) => {
        // Set the state with products containing category information
        setProduct(productsWithCategory.slice(0, 5));
        setLoading(false);
      });
  }, []);

  const handleFavoris = async (id_prod) => {
    try {
      const id_user = session.user.id_user;
      const res = await fetch(
        `http://localhost:4000/api/v1/favoris/AddFavoris`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id_user, id_prod }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to add to favorites");
      }

      await res.json();
    } catch (error) {
      alert("Failed to add to favorites");
    }
  };

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  return (
    <div className="   ">
      <div className="relative      ">
        <Image
          src={bmw_header}
          className=" object-cover  md:h-[550px] h-[650px] w-full   "
          alt="header image"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gray-700 opacity-50 rounded-md"></div>

        <div className="container absolute inset-0 flex    items-center    mx-auto   justify-center ">
          <div className="    flex flex-col   items-center justify-center md:flex-row   lg:space-x-80   ">
            <div className=" md:w-1/3   text-white     ">
              <h1 className="text-4xl font-bold text-center md:text-left md:mt-0 mt-5">
                Bienvenue chez Autopro
              </h1>
              <p className="text-[15px]   text-center md:text-left md:mt-0 pt-2 md:mx-0 mx-5    ">
                Vous trouvez tous vos besoins sur notre site , nous vous
                proposons de nombreux choix , il ne vous reste plus qu'a
                découvrir nos produits
              </p>
            </div>
            <div className="     md:w-1/3 md:mt-0 mt-5  ">
              <CardsFilter />
            </div>
          </div>
        </div>
      </div>
      {/* section 1 */}
      <div className=" bg-zinc-100">
        {" "}
        <Slider />
      </div>

      {/* section 2 */}
      <div className="   mt-32  mb-32  ">
        <div className="   2xl:mx-48  lg:mx-28 md:text-center   lg:text-start mx-0 text-center  ">
          <h1 className="font-bukra font-bukrabold mx-auto mb-8 text-xl sm:justify-center ">
            Catalogue pièces automobiles
          </h1>
        </div>
        <div className="container mx-auto flex flex-col justify-center    ">
          <Category />
        </div>
      </div>
      {/* section 3 */}
      <div className="  container  mt-32  mb-16 mx-auto ">
        <div className="flex flex-row md:justify-between justify-center  ">
          <div className="      md:text-center   lg:text-start mx-0 text-center  ">
            <h1 className="font-bukra text-textColor font-bukrabold mx-auto mb-8 text-xl sm:justify-center ">
              Nouveaux produits
            </h1>
          </div>
          <div className="hidden md:block">
            <Link
              href={`./Catalogue`}
              className=" text-[13px]   border-greenColor border-[2px] rounded-full p-2 px-4 hover:bg-greenColor hover:text-white"
            >
              Voir plus...
            </Link>
          </div>
        </div>
        {product.length > 0 ? (
          <div className="container mx-auto flex flex-col justify-center    ">
            <Carousel className="md:mx-8">
              {product.map((product) => (
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
              ))}
            </Carousel>
          </div>
        ) : (
          <div className="flex md:flex-row flex-col my-28 justify-center">
            <p className="font-poppins text-[17px] text-gray-400">
              produit est actuellement indisponible
            </p>
          </div>
        )}

        <div className="flex justify-center  mt-12">
          <div className="block md:hidden  ">
            <button className=" text-[14px] xl:mx-30  lg:mx-28 border-greenColor border-[2px] rounded-full p-2 px-4 hover:bg-greenColor hover:text-white">
              Voir plus...
            </button>
          </div>
        </div>
      </div>

      {/* section 4 */}

      <div className=" flex  mb-28 items-center     justify-between flex-col md:flex-row  ">
        <div className="hidden md:block  ">
          <Image className="w-[850px]" src={mercedes} alt="image" />
        </div>
        <div className="block md:hidden mb-4  ">
          <Image className="w-[900px] " src={mercedes_front} alt="image" />
        </div>
        <div className="    w-1/2">
          <div className="space-y-4 md:mx-5 md:text-start text-center">
            <h1 className="font-bukrabold font-bukra text-xl">
              Créez Votre Boutique sur Autopro
            </h1>
            <div className="text-sm text-gray-600    ">
              <p className="leading-6">
                Autopro vous offre la possibilité de créer votre propre boutique
                sur notre plateforme. Il vous suffit de remplir le formulaire
                ci-dessous, et nous étudierons votre demande pour vous répondre
                dans un délai maximum de 3 jours.
              </p>
            </div>
            {session?.user?.Profil_user === "Fournisseur" ? (
              <div className="my-4">
              <Link
                href="/Dashboard"
                className=" text-sm border-greenColor border-[3px]  rounded-full p-2 px-3 hover:bg-greenColor hover:text-white"
              >
                Votre Boutique
              </Link>
              </div>
            ) : (
              <button
                onClick={openModal}
                className=" text-sm border-greenColor border-[3px] rounded-full p-2 px-3 hover:bg-greenColor hover:text-white"
              >
                Demande boutique
              </button>
            )}
          </div>
        </div>
      </div>
      <ModalStore isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};
export default Accueil;
