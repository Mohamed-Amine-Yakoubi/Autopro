/* eslint-disable react/no-unescaped-entities */
"use client";
import Header from "@/components/Header";
import "../../globals.scss";
import { getAllProducts, getProductbyStoreId } from "../../lib/Product";
import { useEffect, useState } from "react";
import { getCategory } from "../../lib/Category";
import CardsProduit from "@/components/CardsProduit";
import { FaFacebook, FaPhoneAlt, FaSearch } from "react-icons/fa";
import { Loading } from "@/components/Loading";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Filter } from "@/app/Catalogue/Filter";
import { FaLocationDot, FaSquareInstagram } from "react-icons/fa6";
import { IoIosMail, IoIosSend, IoLogoLinkedin } from "react-icons/io";
import { getStoreByID } from "@/app/lib/Magasin";
import Image from "next/image";
import { TbWorldWww } from "react-icons/tb";
import ReclamationModal from "@/components/ReclamtionModal";
import ChatModel from "@/components/ChatModel";
import { BsFillChatDotsFill } from "react-icons/bs";
import { useSession } from "next-auth/react";
import CardsFilterCatalogue from "@/components/CardsFilterCatalogue";

const Magasin = (props) => {
  const { data: session, status } = useSession();
  const id_user = session?.user?.id_user || "";

  const id_magasin = props.params.Magasin;

  const [filter, setFilter] = useState({
    search: "",
    id_cat: null,
    id_subcat: null,
    id_marque: null,
    id_modele: null,
    id_motor: null,
    id_ville: null,
    id_mat: null,
    price: 5000,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [product, setProduct] = useState([]);
  const [magasin, setMagasin] = useState("");
  const [loading, setLoading] = useState(true);
  const handleSearch = (e) => {
    setFilter({ ...filter, search: e.target.value });
  };

  const handleFilterChange = (name, value) => {
    setFilter({ ...filter, [name]: value });
  };

  // product
  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getProductbyStoreId(id_magasin);
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

        setProduct(productsWithCategory);
        setLoading(false);

        const magasinData = await getStoreByID(id_magasin);
        setMagasin(magasinData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id_magasin]);

  const filteredProducts = product.filter((product) => {
    return (
      (filter.search === "" ||
        product.Libelle_prod?.toLowerCase().includes(
          filter.search.toLowerCase()
        )) &&
      (filter.id_cat === null || product.id_cat === parseInt(filter.id_cat)) &&
      (filter.id_subcat === null ||
        product.id_subcat === parseInt(filter.id_subcat)) &&
      (filter.id_ville === null ||
        product.id_ville === parseInt(filter.id_ville)) &&
      (filter.id_mat === null || product.id_mat === parseInt(filter.id_mat)) &&
      product.prix_prod <= filter.price &&
      (filter.id_marque === null ||
        product.id_marque === parseInt(filter.id_marque)) &&
      (filter.id_modele === null ||
        product.id_modele === parseInt(filter.id_modele)) &&
      (filter.id_motor === null ||
        product.id_motor === parseInt(filter.id_motor))
    );
  });

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
        <Header Title={`Bienvenue chez ${magasin.Libelle_magasin}`} />
      </div>
      {/* section 2 */}

      <div className="    flex lg:flex-row flex-col  mt-8  mx-16 lg:justify-center items-center   lg:space-x-20">
        <div className=" lg:w-1/1     flex lg:flex-row flex-col    lg:justify-center items-center lg:space-x-8 lg:space-y-0    space-y-4">
          <div className="w-[130px]    ">
            <Image
              src={magasin.Logo_magasin}
              alt="Product Image"
              width={200}
              height={200}
              className=" lg:w-[130px] w-full  aspect-square   rounded-full border-2 border-greenColor bg-grayLight"
            />
          </div>
          <div>
            <h1 className="title lg:text-start text-center text-[16px]">
              Bienvenue chez {magasin.Libelle_magasin}
            </h1>
            <p className=" mt-1  font-bold lg:text-start text-center text-greenColor text-[12px]">
              Boutique
            </p>

            <p className="text    mx-auto     mt-1 text-[12px] lg:text-start text-center font-poppins lg:w-[550px]  ">
              {magasin.Description_magasin}
            </p>
          </div>
        </div>
        <div className=" md:w-1/2   lg:mt-0 mt-5  flex lg:justify-end	justify-center ">
          <div className="    ">
            <h1 className="title lg:text-start text-center text-[16px]  ">
              Informations de Contact
            </h1>
            <div className="mt-4 flex flex-col lg:items-start items-center">
              <div className="text-[12px]  md:text-start text-center mt-3 flex  font-poppins">
                <span>
                  <FaLocationDot className="text-greenColor text-lg   mx-2 " />
                </span>
                <span className="font-bold text-darkColor mr-2">Adresse :</span>{" "}
                {magasin.Adresse_magasin}
              </div>
              <div className="text-[12px] md:text-start text-center mt-3 flex font-poppins">
                <span>
                  <FaPhoneAlt className="text-greenColor text-lg    mx-2 " />
                </span>
                <span className="font-bold text-darkColor mr-2">
                  Téléphone :
                </span>
                +216 {magasin.Telephone_magasin}
              </div>
              <div className="text-[12px]  md:text-start text-center mt-3 flex font-poppins">
                <span>
                  <IoIosMail className="text-greenColor text-lg    mx-2 " />
                </span>
                <span className="font-bold text-darkColor mr-2">Email :</span>
                {magasin.Email_magasin}
              </div>
              <div className="flex flex-row mt-4">
                <div>
                  <Link
                    href={`${magasin.Lien_instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    <FaSquareInstagram className="text-[20px] mx-2 text-blueDark" />
                  </Link>
                </div>
                <div>
                  <Link href={`${magasin.Lien_facebook}`}>
                    <FaFacebook className="text-[20px] mx-2 text-blueDark" />
                  </Link>
                </div>
                <div>
                  <Link href={`${magasin.Lien_linkedin}`}>
                    <IoLogoLinkedin className="text-[20px] mx-2 text-blueDark" />
                  </Link>
                </div>
                <div>
                  <Link href={`${magasin.Lien_siteWeb}`}>
                    <TbWorldWww className="text-[20px] mx-2  text-blueDark" />
                  </Link>
                </div>
              </div>
              <div className="flex items-center  mt-4 space-x-4">
              <div>
                <button
                  onClick={openModal}
                  className="bg-greenColor text-white p-2  rounded-md text-[13px]"
                >
                  {" "}
                  Passer une reclamation
                </button>
              </div>
              <div>
                {session && session.user ? (
                  <button className="text-iconColor text-[22px]    text-center  hover:bg-greenColor rounded-lg hover:text-white">
                    <ChatModel
                      icon={<BsFillChatDotsFill />}
                      props={id_magasin}
                    />
                  </button>
                ) : null}
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* section 3 */}
      <div className="    flex md:flex-row flex-col    mx-12  mt-12  md:space-x-12   ">
        <div className=" md:w-1/3  w-full ">
          <CardsFilterCatalogue
            filter={filter}
            onFilterChange={handleFilterChange}
          />

          <Filter filter={filter} onFilterChange={handleFilterChange} />
        </div>

        <div className=" md:w-1/1    w-full  ">
          <div className="flex   items-center   bg-grayLight h-14 rounded-md   ">
            <FaSearch className="mx-5" />
            <input
              type="text"
              placeholder="Trouver votre article"
              className="outline-none bg-transparent"
              onChange={handleSearch}
            />
          </div>

          <div className="flex flex-wrap justify-center">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id_prod} className="mt-5">
                  <CardsProduit
                    image={product.Image_thumbnail}
                    libelle={product.Libelle_prod}
                    categorie={product.category.Libelle_cat}
                    prix={product.prix_prod}
                    stock={product.Stock_prod}
                    product={product}
                    link={`./Catalogue/${product.id_prod}`}
                  />
                </div>
              ))
            ) : (
              <div className="flex md:flex-row flex-col my-28 justify-center">
                <p className="font-poppins text-[17px] text-gray-400">
                  Ce produit est actuellement indisponible
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <ReclamationModal
        props={id_magasin}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default Magasin;
