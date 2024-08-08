"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Autopro_logo from "../../public/images/Autopro_logo.png";
import Input from "../Input";
import Button from "../Button";

const ForgotPassword = ({
  isAnimated,
  setIsAnimated,
  setShowForgotPassword,
}) => {
  const [Email_user, setEmail_user] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSubmit = async (e) => {
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
    <div className="w-full h-full flex flex-col justify-center">
      <div className="mx-10  ">
        <div className="flex justify-center mx-auto items-center mb-16">
          <Image src={Autopro_logo} alt="logo" className="w-56" />
        </div>
        <p className="font-poppins text-[14px] mt-5 text-center my-10">
          Mot de passe perdu ? Veuillez saisir votre identifiant ou votre
          adresse e-mail. Vous recevrez un lien par e-mail pour créer un nouveau
          mot de passe.
        </p>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            value={Email_user}
            onChange={(e) => setEmail_user(e.target.value)}
            required
          />
          {message && <p className="mt-2 text-start text-[13px]">{message}</p>}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              className="text-center text-gray-500  hover:bg-darkColor hover:text-white outline-none rounded-full px-8 py-2 text-[13px] font-semibold  border-2 border-darkColor  "
              onClick={(e) => {
                setIsAnimated(false); // Optional: reset the animation state if needed
                setShowForgotPassword(false); // Hide forgot password form
              }}
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
    </div>
  );
};

export default ForgotPassword;
