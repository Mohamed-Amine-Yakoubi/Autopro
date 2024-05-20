/* eslint-disable react/no-unescaped-entities */
"use client"
import Header from "@/components/Header";
import "../globals.scss";
import InputFields from "@/components/InputFields";
import { FaPhoneAlt } from "react-icons/fa";
import piece from "../../public/images/piece.png";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
const Contact = () => {

  return (
    <div className="mb-28">
      {/* section 1 */}
      <div>
        <Header Title={"Contactez-nous"} />
      </div>
      {/* section 2 */}
  
      <div className="  md:w-1/1 flex md:flex-row flex-col  mt-8   md:justify-center items-center mx-auto md:space-x-20">
        <div className=" md:w-1/3     ">
          <h1 className="title md:text-start text-center text-[16px]  ">
            Informations de Contact
          </h1>
          <div className="  mx-auto   mt-4">
            <p className="text md:text-start text-center mt-2 flex  font-poppins">
              <span>
                <FaLocationDot className="text-greenColor text-lg   mx-2 " />
              </span>
              <span className="font-bold text-darkColor mr-2">Adresse :</span>{" "}
              Ariana , 14 rue ons
            </p>
            <p className="text md:text-start text-center mt-2 flex font-poppins">
              <span>
                <FaPhoneAlt className="text-greenColor text-lg    mx-2 " />
              </span>
              <span className="font-bold text-darkColor mr-2">Téléphone :</span>
              +216 20166505
            </p>
            <p className="text md:text-start text-center mt-2 flex font-poppins">
              <span>
                <IoIosMail className="text-greenColor text-lg    mx-2 " />
              </span>
              <span className="font-bold text-darkColor mr-2">Email :</span>
              Autopro@gmail.com
            </p>
          </div>
        </div>
        <div className=" md:w-1/3    mx-8  ">
          <h1 className="title md:text-start text-center text-[16px]">
            Nous sommes basés en Tunisie
          </h1>
          <div className="   mx-auto  mt-4 ">
            <p className="text md:text-start text-center font-poppins ">
              vous pouvez nous contacter en utilisant le formulaire de contact
              ci-dessous, si vous avez quelque chose à nous dire sur un problème
              ou quelque chose que vous n'aimez pas sur notre site Web,
              faites-le nous savoir et nous le réglerons dès que possible
            </p>
          </div>
        </div>
      </div>
      {/* section 3 */}
      <div className="mx-auto w-1/2 mt-16 mb-16">
        <hr className=" " />
      </div>
      <div className="  md:w-1/1 flex md:flex-row flex-col     md:justify-center   mx-auto md:space-x-20 ">
        <div className=" md:w-1/3     mx-8  ">
          <h1 className="title md:text-start text-center text-[16px]">Contactez-nous</h1>
          <div className="   mx-auto  mt-4 ">
            <p className="text md:text-start text-center font-poppins">
              Toute l'equipe de Autopro est a votre écoute , une question ? Vous
              pouvez nous laisser un petit dans notre formulaire de contact .
              Nous vous répondrons au plus vite !
            </p>
          </div>
          <div className="flex justify-center">
          <Image src={piece} alt="piece" className="w-auto mt-8"/></div>
        </div>
        <div className=" md:w-1/3     md:mx-0 mx-5 ">
          <div className=" mt-3 space-y-1">
            {" "}
            <label className="mx-4 text-[14px]   font-poppins" htmlFor="">
              Nom :
            </label>
            <InputFields type={"text"} className=" mt-3 " height="40px" />
          </div>
          <div className=" mt-3 space-y-1">
            {" "}
            <label className="mx-4 font-poppins text-[14px]  " htmlFor="">
              Email
            </label>
            <InputFields type={"text"} className="  mt-3" height="40px" />
          </div>
          <div className=" mt-3 space-y-1">
            {" "}
            <label className="mx-4 font-poppins text-[14px]  " htmlFor="">
              Téléphone
            </label>
            <InputFields type={"text"} className=" mt-3" height="40px" />
          </div>
          <div className=" mt-3 space-y-1">
            {" "}
            <label className="mx-4 font-poppins text-[14px]  " htmlFor="">
              Message
            </label>
            <InputFields type={"textarea"} className=" mt-3   "   rows="15" textarea height="200px"     />
          </div>
          
          <div className="flex justify-end ">
            <button className="bg-greenColor text-white hover:bg-darkColor rounded-full p-2 px-7 text-[14px] mt-5 ">
              Envoyer
            </button>
          </div>
        </div>
      </div>
 
    </div>
  );
};
export default Contact;
