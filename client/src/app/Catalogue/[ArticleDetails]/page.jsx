"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getAllProducts, getSpecProduct } from "@/app/lib/Product";
import { getCategory } from "@/app/lib/Category";
import { FaRegHeart } from "react-icons/fa";
import { Loading } from "@/components/Loading";
import { getSubCategory } from "@/app/lib/SubCategory";
import { getStoreByID } from "@/app/lib/Magasin";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addItem } from "@/app/redux/slices/cartSlice";
import { getMatterById } from "@/app/lib/Car";
import { FaRegCheckCircle } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";
import CardsProduit from "@/components/CardsProduit";
import Carousel from "@/components/Carousel";

const ArticleDetails = (props) => {
  const [product, setProduct] = useState(null);
  const [Allproduct, setAllProduct] = useState([]);
  const [matiere, setMatiere] = useState(null);
  const [magasin, setMagasin] = useState(null);
  const [subcat, setSubcat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");

  const idprod = props.params.ArticleDetails;
  const [quantity, setQuantity] = useState(1);

  const handleMinus = () => {
    setQuantity(quantity > 1 ? quantity - 1 : 1);
  };

  const handlePlus = () => {
    setQuantity(quantity + 1);
  };
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
        return Promise.all(promises)
      }).then((productsWithCategory) => {
        // Set the state with products containing category information
        setAllProduct(productsWithCategory);
 

      });
     
  

     
 
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prod = await getSpecProduct(idprod);
        const category = await getCategory(prod.id_cat);
        const productData = { ...prod, category };
        setProduct(productData);
        setActiveImage(productData.Image_thumbnail);

        const subcategory = await getSubCategory(productData.id_subcat);
        setSubcat(subcategory);

        const magasinData = await getStoreByID(productData.id_magasin);
        setMagasin(magasinData);
        const matiereData = await getMatterById(productData.id_mat);
        setMatiere(matiereData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idprod]);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };
  const imageProd = product ? product.Image_prod.split(",") : [];
  console.log(product);
  return (
    <div className=" mt-24 mb-24 ">
      <div className="flex md:flex-row flex-col  justify-center  md:mx-0 mx-4    gap-16">
        <div className="flex   justify-center   " key={product.id_prod}>
          <div className="flex   flex-col    gap-2">
            <Image
              src={activeImage || product.Image_thumbnail}
              alt="Product Image"
              width={650}
              height={650}
              className="w-[450px] aspect-square   rounded-md bg-grayLight"
            />
            <div className="flex flex-wrap gap-2 md:gap-4 justify-center md:justify-between  ">
              {imageProd.map((item, index) => (
                <Image
                  key={index}
                  src={item}
                  alt={`image product ${index + 1}`}
                  className=" w-[75px]    rounded-md bg-grayLight cursor-pointer"
                  width={100}
                  height={100}
                  onClick={() => setActiveImage(item)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="    ">
          <div>
            <div className="flex   mb-4  flex-row items-center space-x-2">
              <Link
                className="flex     flex-row items-center space-x-2 "
                href={`/Magasin/${magasin.Libelle_magasin}?id=${magasin.id_magasin}`}
              >
                <Image
                  src={magasin.Logo_magasin}
                  alt="Product Image"
                  width={50}
                  height={50}
                  className="w-[50px] aspect-square   rounded-full border-2 border-greenColor bg-grayLight"
                />
                <p>{magasin.Libelle_magasin}</p>
              </Link>
            </div>
            <div>
              {" "}
              <p className="  text-gray-400 font-bold text-[13px]  ">
                {product.category.Libelle_cat} / {subcat.Libelle_subcat}
              </p>
            </div>

            <h1 className=" text-gray-800 text-[40px] font-bold">
              {product.Libelle_prod}
            </h1>
            <p className="md:w-96 text-gray-500 text-[13px] text-justify">
              {product.Caracteristiques_prod}
            </p>
            <p className=" text-greenColor text-[25px] font-bold mt-5">
              {product.prix_prod}.00 TND
            </p>
            <p className=" text-[16px] font-bold mb-2 mt-5">Critères</p>
            <p className=" text-[14px]   ">
              <span className="text-gray-500  ">Matiére </span>:{" "}
              <span className="text-textColor font-semibold">
                {matiere.Libelle_mat}{" "}
              </span>
            </p>
            <p className=" text-[14px]  mt-1">
              <span className="text-gray-500  ">Référence </span>:{" "}
              <span className="text-textColor font-semibold">
                {product.Reference_prod} mm
              </span>
            </p>
            <p className=" text-[14px]  mt-1">
              <span className="text-gray-500  ">Hauteur [mm]</span>:{" "}
              <span className="text-textColor font-semibold">
                {product.Hauteur} mm
              </span>
            </p>
            <p className=" text-[14px]  mt-1">
              <span className="text-gray-500  ">Largeur [mm]</span>:{" "}
              <span className="text-textColor font-semibold">
                {product.Largeur} mm{" "}
              </span>
            </p>
            <p className=" text-[14px]  mt-1">
              <span className="text-gray-500  ">Diamétre [mm]</span>:{" "}
              <span className="text-textColor font-semibold">
                {product.Diametre} mm
              </span>
            </p>
            <p className=" text-[14px]  mt-1">
              <span className="text-gray-500  ">Longueur [mm]</span>:{" "}
              <span className="text-textColor font-semibold">
                {product.Longueur} mm
              </span>
            </p>
            <p className=" text-[14px]  mt-1">
              <span className="text-gray-500  ">Épaisseur [mm]</span>:{" "}
              <span className="text-textColor font-semibold">
                {product.Epaisseur} mm
              </span>
            </p>

            <div className="flex md:flex-row flex-wrap   items-center space-x-5    mt-5">
              <div className="flex flex-row items-center ">
                <button
                  className="bg-grayLight py-1 px-4 rounded-md text-greenColor text-[23px]"
                  onClick={handleMinus}
                >
                  -
                </button>
                <span className="py-3 px-5 text-[13.5px]">{quantity}</span>
                <button
                  className="bg-grayLight py-1 px-4 rounded-md text-greenColor text-[23px]"
                  onClick={handlePlus}
                >
                  +
                </button>
              </div>

              <div className="flex flex-row items-center ">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="  py-2.5 px-4 rounded-md border-2 border-greenColor text-iconColor hover:bg-greenColor hover:text-white   text-[12.5px]"
                >
                  Ajouter au panier
                </button>
              </div>

              <div className="flex items-center">
                <button
                  className="bg-darkColor p-3 rounded-full text-white hover:bg-greenColor"
                  type="button"
                >
                  <FaRegHeart />
                </button>
              </div>
            </div>
            <div className=" text-greenColor text-[25px] font-bold mt-5">
              {product.Stock_prod > 0 ? (
                <p className="text-greenColor rounded-full font-bold text-[13px] flex items-center ">
                  <span className="mr-1 text-[17px]">
                    <FaRegCheckCircle />
                  </span>{" "}
                  en stock
                </p>
              ) : (
                <p className="text-red-600 rounded-full font-bold text-[13px] flex items-center">
                  <span className="mr-1 text-[17px]">
                    <FcCancel />
                  </span>{" "}
                  Epuisé
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className=" container  mt-32  mb-16 mx-auto ">
        <div className="flex flex-row md:justify-between justify-center  ">
          <div className="    xl:mx-24  lg:mx-24 md:text-center   lg:text-start mx-0 text-center  ">
            <h1 className="font-bukra font-bukrabold mx-auto mb-8 text-xl sm:justify-center ">
              Nouveaux produits
            </h1>
          </div>
          <div className="hidden md:block">
            <Link href={`/Catalogue`} className=" text-sm xl:mx-24  lg:mx-24 border-greenColor border-[2px] rounded-full p-2 px-4 hover:bg-greenColor hover:text-white">
              Voir plus...
            </Link>
          </div>
        </div>
        <div className="container   flex flex-col justify-center   ">
          <Carousel className="md:mx-8">
            {Allproduct.map((product) => (
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
        <div className="flex justify-center  mt-12">
          <div className="block md:hidden  ">
            <button className=" text-sm xl:mx-30  lg:mx-28 border-greenColor border-[2px] rounded-full p-2 px-4 hover:bg-greenColor hover:text-white">
              Voir plus...
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;
