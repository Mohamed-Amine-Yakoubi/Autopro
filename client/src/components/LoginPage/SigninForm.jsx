/* eslint-disable react/no-unescaped-entities */
"use client";
import { signIn } from "next-auth/react";
import Autopro_logo from "../../public/images/Autopro_logo.png";
import Image from "next/image";
 
import Button from "../Button";
import { MdFacebook } from "react-icons/md";
import { RiInstagramLine } from "react-icons/ri";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaUser, FaLock } from "react-icons/fa";
import { useRouter } from "next/navigation";
 
import { useState } from "react";
import InputIcon from "../InputIcon";

const SigninForm = ({ isAnimated, setIsAnimated }) => {
  const router = useRouter();

  const [user, setUser] = useState({
    Email_user: "",
    MotDePasse_user: "",
  });
  const handleChangeValue = (e) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("Email_user");
    const password = formData.get("MotDePasse_user");

    // Call signIn from NextAuth with "Credentials" provider
    signIn("credentials", { email, password, redirect: false }).then((res) => {
      if (res?.error) {
        alert("Authentication failed: " + res.error);
      } else {
        // Redirect to a specific page after successful authentication
        router.replace("/Accueil");
      }
    });
  };
  return (
    <div className="    w-full h-full  flex flex-col justify-center   ">
      <div className="  xl:mx-28  mx-10 mt-10 ">
        <div className="flex justify-center mx-auto items-center">
          <Image src={Autopro_logo} alt="logo" className="w-56" />
        </div>
        <h1 className="font-poppins font-semibold mt-5 text-center">
          Bienvenue chez Autopro
        </h1>
        <form className="mt-12   " onSubmit={handleSubmit}>
          <div className="space-y-5    ">
            <div className="relative">
              <InputIcon
                type={"text"}
                name={"Email_user"}
                value={user.Email_user}
                onChange={handleChangeValue}
                placeholder={"Email"}
              />

              <FaUser className="text-[26px]  absolute left-3  top-1/2 transform -translate-y-1/2 h-5 w-5 text-iconColor" />
            </div>
            <div className="relative">
              <InputIcon
                type={"password"}
                name={"MotDePasse_user"}
                placeholder={"Mot De Passe"}
                value={user.MotDePasse_user}
                onChange={handleChangeValue}
              />
              <FaLock className="text-[26px]  absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-iconColor" />
            </div>
          </div>
          <div className="flex justify-end  mt-4   md:">
            <button className="text-[12px]">Mot de Passe oublié?</button>
          </div>
          <div className="flex justify-center items-center mt-4">
            <Button
              type="submit"
              className="bg-darkColor"
              value={"Connexion"}
            ></Button>{" "}
          </div>
        </form>
        <div className="mt-4   ">
          <h4 className="text-center text-gray-500 text-[13px]">Suivez nous</h4>
          <div className="flex  justify-center items-center mt-4 space-x-6">
            <MdFacebook className="text-[26px] " />
            <RiInstagramLine className="text-[26px] text-greenColor" />
            <FaSquareXTwitter className="text-[26px] " />
          </div>
        </div>
        <div className="pt-12   flex  justify-center items-center">
          <button
            className="text-center text-gray-500 text-[13px]"
            onClick={(e) => {
              setIsAnimated(!isAnimated);
            }}
          >
            vous n'avez pas de compte?{" "}
            <span className="text-greenColor">S'inscrire</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;
