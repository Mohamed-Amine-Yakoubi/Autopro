"use client";
import Image from "next/image";
import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";

const CardsProduit = ({ image, libelle, categorie, prix, stock }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative max-w-sm rounded overflow-hidden border border-zinc-200 mx-3 w-56 h-70 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-greenColor transition-all duration-200 group-hover:w-full"></span>
      <span className="ease absolute right-0 top-0 h-0 w-0 border-r-2 border-greenColor transition-all duration-200 group-hover:h-full"></span>
      <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-greenColor transition-all duration-200 group-hover:w-full"></span>
      <span className="ease absolute bottom-0 left-0 h-0 w-0 border-l-2 border-greenColor transition-all duration-200 group-hover:h-full"></span>

      <div className=" flex justify-center">
        <Image
          className="  p-4"
          src={image}
          width={240}
          height={240}
          alt="piece"
        />
      </div>
      {isHovered && (
        <div className="flex flex-col  ">
          <div className="absolute top-2 right-3 bg-greenColor rounded-full h-6 w-6 flex justify-center items-center">
            <FaCartShopping className="text-[14px] text-white" />
          </div>
          <div className="absolute top-10 right-3 bg-greenColor  rounded-full h-6 w-6 flex justify-center items-center">
            <FaHeart className="text-[14px] text-white" />
          </div>
        </div>
      )}
      <div className="px-6 py-4 mt-5 ">
        <div className="font-bold text-[14px] mb-1">{libelle}</div>
        <p className="text-gray-700 text-[12px] ">{categorie}</p>
        <div className="flex justify-between mt-3">
          <p className="text-gray-700 text-[13px] font-bold ">{prix} TND</p>
          {stock > 0 ? (
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
  );
};

export default CardsProduit;
