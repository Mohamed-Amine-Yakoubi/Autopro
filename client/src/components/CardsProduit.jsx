"use client";
import Image from "next/image";
import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { FaHeart, FaRegCheckCircle } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { addItem } from "@/app/redux/slices/cartSlice";
import Link from "next/link";
import { FcCancel } from "react-icons/fc";

const CardsProduit = ({
  image,
  link,
  libelle,
  categorie,
  product,
  prix,
  stock,
  handleFavoris,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };
  return (
    <div
      className="relative max-w-sm rounded overflow-hidden bg-grayLight border border-zinc-200 mx-3 w-56 h-70 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-greenColor transition-all duration-200 group-hover:w-full"></span>
      <span className="ease absolute right-0 top-0 h-0 w-0 border-r-2 border-greenColor transition-all duration-200 group-hover:h-full"></span>
      <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-greenColor transition-all duration-200 group-hover:w-full"></span>
      <span className="ease absolute bottom-0 left-0 h-0 w-0 border-l-2 border-greenColor transition-all duration-200 group-hover:h-full"></span>

      <Link href={link}>
        <div className=" flex justify-center">
          <Image
            className=" w-[180px] h-[180px] object-contain p-2"
            
            src={image}
            width={180}
            height={180}
            alt="piece"
            loading="eager"
          />
        </div>
      </Link>
      {isHovered && (
        <div className="flex flex-col  ">
          <button
            onClick={() => handleAddToCart(product)}
            className="absolute top-2 right-3 bg-greenColor rounded-full h-6 w-6 flex justify-center items-center"
          >
            <FaCartShopping className="text-[14px] text-white" />
          </button>
          <button
            onClick={handleFavoris}
            className="absolute top-10 right-3 bg-greenColor  rounded-full h-6 w-6 flex justify-center items-center"
          >
            <FaHeart className="text-[14px] text-white" />
          </button>
        </div>
      )}
      <Link href={link}>
        <div className="px-6 py-4 mt-5 ">
          <div className="font-bold text-[14px] mb-1">{libelle}</div>
          <p className="text-gray-500 text-[11.5px] ">{categorie}</p>
          <div className="flex justify-between mt-3">
            <p className="text-gray-700 text-[12.5px] font-bold ">{prix} TND</p>
            {stock > 0 ? (
              <p className="text-greenColor rounded-full font-bold text-[11.5px] flex items-center ">
                <span className="mr-1 text-[14px]">
                  <FaRegCheckCircle />
                </span>{" "}
                En stock
              </p>
            ) : (
              <p className="text-red-600 rounded-full font-bold text-[11.5px] flex items-center">
                <span className="mr-1 text-[15px]">
                  <FcCancel />
                </span>{" "}
                Epuisé
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardsProduit;
