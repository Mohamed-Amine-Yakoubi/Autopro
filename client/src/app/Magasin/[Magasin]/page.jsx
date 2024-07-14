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

const Magasin = (props) => {
  const { data: session, status } = useSession();
  const id_user = session?.user?.id_user || "";
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const Libelle_magasin = props.params.Magasin;

  const [isModalProductOpen, setisModalProductOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [selectedProduct, setSelectedProduct] = useState(null); // State to hold the selected product

  const [product, setProduct] = useState([]);
  const [magasin, setMagasin] = useState("");
  const [loading, setLoading] = useState(true);

  // product
  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getProductbyStoreId(id);
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

        const magasinData = await getStoreByID(id);
        setMagasin(magasinData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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
        <Header Title={`Bienvenue chez ${Libelle_magasin}`} />
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
              <div className="flex flex-row mt-3">
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
              <div>
                <button
                  onClick={openModal}
                  className="bg-greenColor text-white p-2 mt-5 rounded-md text-[13px]"
                >
                  {" "}
                  Passer une reclamation
                </button>
              </div>
              <div>
                {session && session.user ? (
                  <button className="text-iconColor text-[22px]      text-center  hover:bg-greenColor rounded-lg hover:text-white">
                    <ChatModel icon={<BsFillChatDotsFill /> } props={id}/>
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* section 3 */}
      <div className="    flex md:flex-row flex-col    mx-12  mt-12  md:space-x-12   ">
        <div className=" md:w-1/3  w-full ">
          <Filter />
        </div>

        <div className=" md:w-1/1    w-full  ">
          <div className="flex   items-center   bg-grayLight h-14 rounded-md   ">
            <FaSearch className="mx-5" />
          </div>
          <div className="flex   flex-wrap  justify-center ">
            {product.map((product) => (
              <div key={product.id_prod} className="mt-5     ">
                <CardsProduit
                  image={product.Image_thumbnail}
                  libelle={product.Libelle_prod}
                  categorie={product.category.Libelle_cat}
                  prix={product.prix_prod}
                  stock={product.Stock_prod}
                  link={`../Catalogue/${product.id_prod}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <ReclamationModal props={id} isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Magasin;
