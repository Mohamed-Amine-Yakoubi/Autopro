"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getSpecProduct } from "@/app/lib/Product";
import { getCategory } from "@/app/lib/Category";
import { FaRegHeart } from "react-icons/fa";
import { Loading } from "@/components/Loading";
import { getSubCategory } from "@/app/lib/SubCategory";
import { getStoreByID } from "@/app/lib/Magasin";
import Link from "next/link";

const ArticleDetails = (props) => {
  const [product, setProduct] = useState(null);
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
    const fetchData = async () => {
      try {
        const prod = await getSpecProduct(idprod);
        const category = await getCategory(prod.id_cat);
        const productData = { ...prod, category };
        setProduct(productData);
        setActiveImage(productData.Image_thumbnail);

        const subcategory = await getSubCategory(productData.id_cat);
        setSubcat(subcategory);

        const magasinData = await getStoreByID(productData.id_magasin);
        setMagasin(magasinData);
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

  const imageProd = product ? product.Image_prod.split(",") : [];

  return (
    <div className=" mt-24 mb-24 ">
      <div className="flex md:flex-row flex-col  justify-center  md:mx-0 mx-4    gap-16">
        <div className="flex   justify-center   " key={product.id_prod}>
          <div className="flex   flex-col    gap-2">
            <Image
              src={activeImage || product.Image_thumbnail}
              alt="Product Image"
              width={750}
              height={750}
              className="w-[500px] aspect-square   rounded-md bg-grayLight"
            />
            <div className="flex flex-wrap gap-2 md:gap-4 justify-center md:justify-between  ">
              {imageProd.map((item, index) => (
                <Image
                  key={index}
                  src={item}
                  alt={`image product ${index + 1}`}
                  className=" w-[85px]    rounded-md bg-grayLight cursor-pointer"
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
            <div className="flex   flex-row justify-between  items-center ">
              <div >
                {" "}
                <p className="  text-gray-400 font-bold text-[13px]  ">
                  {product.category.Libelle_cat} / {subcat[0].Libelle_subcat}
                </p>
              </div>
              <div className="flex     flex-row items-center space-x-2">
        
              <Link className="flex     flex-row items-center space-x-2 "href={`/Magasin/${magasin.Libelle_magasin}?id=${magasin.id_magasin}`}>

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
            <div className="flex md:flex-row flex-wrap   items-center space-x-5    mt-5">
              <div className="flex flex-row items-center ">
                <button
                  className="bg-grayLight py-1 px-4 rounded-md text-greenColor text-2xl"
                  onClick={handleMinus}
                >
                  -
                </button>
                <span className="py-3 px-5">{quantity}</span>
                <button
                  className="bg-grayLight py-1 px-4 rounded-md text-greenColor text-2xl"
                  onClick={handlePlus}
                >
                  +
                </button>
              </div>

              <div className="flex flex-row items-center ">
                <button className="  py-2.5 px-4 rounded-full border-2 border-greenColor text-iconColor hover:bg-greenColor hover:text-white   text-[13px]">
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
                <p className="text-greenColor rounded-full font-bold text-[13px]">
                  en stock
                </p>
              ) : (
                <p className="text-red-600 rounded-full font-bold text-[13px]">
                  Epuisé
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;
