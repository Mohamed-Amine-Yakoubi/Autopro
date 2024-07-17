"use client";
import Image from "next/image";
import { useState } from "react";
 
 
 
import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";
import { FaCity } from "react-icons/fa";
 

const CardMagasin = ({ Logo, link, libelle, Adresse, ville }) => {
  const [isHovered, setIsHovered] = useState(false);

 

 
  return (
    <div
      className="relative max-w-sm rounded overflow-hidden border bg-grayLight border-zinc-200 mx-3 w-56 h-70 group"
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
            className=" w-[180px] h-[180px] object-contain p-2  "
            src={Logo}
            width={180}
            height={180}
            alt="piece"
            loading="eager"
          />
        </div>
      </Link>
      
      <Link href={link}>
        <div className="px-6 py-4 mt-5 ">
          <div className="font-semibold text-greenColor text-[12px] mb-2">boutique</div>
          <div className="font-semibold text-darkColor text-[14px] mb-2">{libelle}</div>
          <p className="text-gray-500 text-[11px] my-1 flex items-center"><span className="mr-1 text-gray-500"><FaLocationDot /></span>{Adresse}</p>
    <p className="text-gray-500 text-[11px]   flex items-center"><span className="mr-1 text-gray-500"><FaCity /></span>{ville} </p>
         
 
        </div>
      </Link>
    </div>
  );
};

export default CardMagasin;
