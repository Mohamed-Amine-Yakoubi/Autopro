"use client";
import React from "react";
import { signIn } from "next-auth/react";
import Autopro_logo from "../../../public/img/Autopro_logo.svg";
import Image from "next/image";
import bmw from "../../../public/img/bmw.jpg";

import { MdFacebook } from "react-icons/md";
import { RiInstagramLine } from "react-icons/ri";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaUser, FaLock } from "react-icons/fa";
import { useRouter } from "next/navigation";

import { useState } from "react";
import InputIcon from "@/components/InputIcon";
import Button from "@/components/Button";

const Signin = () => {
  const router = useRouter();
  const [Email_user, setEmail_user] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); 
  const [changeView, setChangeView] = useState(true); 
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
        router.replace("/Dashboard/Home_Dashboard");
      }
    });
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/user/forgot_password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Email_user }),
        }
      );

      const data = await response.json();
      setMessage(data.message || "An unexpected error occurred.");
    } catch (error) {
      setMessage("An error occurred, please try again.");
    } finally {
      setLoading(false); // Set loading to false
    }
  };
  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bmw.src})` }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative w-96 h-[500px] rounded-md flex flex-col items-center justify-center bg-white shadow">
        <div className="">
          <div className="flex justify-center mx-auto items-center">
            <Image src={Autopro_logo} alt="logo" className="w-64" />
          </div>
          {changeView ?(
          <div>
            <h1 className="font-poppins font-semibold mt-5 text-center">
              Bienvenue chez Autopro
            </h1>
            <form
              className="mt-16 mb-2 mx-auto w-80 max-w-screen-lg"
              onSubmit={handleSubmit}
            >
              <div className="space-y-5">
                <div className="relative">
                  <InputIcon
                    type={"text"}
                    name={"Email_user"}
                    value={user.Email_user}
                    onChange={handleChangeValue}
                    placeholder={"Email"}
                  />
                  <FaUser className="text-[26px] absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-iconColor" />
                </div>
                <div className="relative">
                  <InputIcon
                    type={"password"}
                    name={"MotDePasse_user"}
                    placeholder={"Mot De Passe"}
                    value={user.MotDePasse_user}
                    onChange={handleChangeValue}
                  />
                  <FaLock className="text-[26px] absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-iconColor" />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button className="text-[12px]" type="button" onClick={()=>setChangeView(false)}>Mot de Passe oublié?</button>
              </div>
              <div className="flex justify-center items-center mt-4">
                <Button type={"submit"} value={"Connexion"}></Button>
              </div>
            </form>
          </div>
          ):(
          <div       className="mt-16 mb-2 mx-auto w-80 max-w-screen-lg">
            <p className="font-poppins text-[14px] mt-5 text-center my-10">
              Mot de passe perdu ? Veuillez saisir votre identifiant ou votre
              adresse e-mail. Vous recevrez un lien par e-mail pour créer un
              nouveau mot de passe.
            </p>
            <form
            
              onSubmit={handleSubmitPassword}
            >
                       <div className="relative">
              <InputIcon
                type="email"
                placeholder="Email"
                value={Email_user}
                onChange={(e) => setEmail_user(e.target.value)}
                required
              />
                  <FaUser className="text-[26px] absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-iconColor" />
                  </div>
              {message && (
                <p className="mt-2 text-start text-[13px]">{message}</p>
              )}
              <div className="flex justify-center items-center mt-8 space-x-4">
                <button
                  className="text-center text-gray-500  hover:bg-darkColor hover:text-white outline-none rounded-full px-8 py-2 text-[13px] font-semibold  border-2 border-darkColor  "
                  onClick={()=>setChangeView(true)}
                >
                  Annuler
                </button>
                <Button
                  type="submit"
                  className="bg-darkColor text-[14px]"
                  value={"Envoyer"}
                ></Button>{" "}
              </div>
            </form>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signin;
