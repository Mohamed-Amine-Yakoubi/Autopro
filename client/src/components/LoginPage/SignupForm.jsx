"use client";

import { useState } from "react";
import InputFields from "../InputFields";
import Button from "../Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupForm = ({ isAnimated, setIsAnimated }) => {
  const [user, setUser] = useState({
    Nom_user: "",
    Prenom_user: "",
    Email_user: "",
    MotDePasse_user: "",
    Telephone_user: "",
    Adresse_user: "",
  });

  const handleChangeValue = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }; 
  const handleNewUser = async (e) => {
    e.preventDefault();

    const EmailExistResponse = await fetch(
      "http://localhost:4000/api/v1/user/FindUserByEmail",
      {
        method: "POST",
        body: JSON.stringify({ Email_user: user.Email_user }), // Envoyer uniquement l'e-mail
        headers: { "Content-Type": "application/json" },
      }
    );
    const EmailExist = await EmailExistResponse.json(); // Convertir la réponse en JSON
    if (
      !user.Nom_user ||
      !user.Prenom_user ||
      !user.Email_user ||
      !user.MotDePasse_user ||
      !user.Telephone_user ||
      !user.Adresse_user
    ) {
      toast.error("Tous les champs sont nécessaires.");
    } else if (EmailExist.exists === true) {
      toast.error("Email existe déjà.");
      return;
    } else {
      const res = await fetch("http://localhost:4000/api/v1/user/SignUp", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();

      if (result) {
        const form = e.target;
        form.reset();
        toast.success(
          "Félicitations ! Votre compte a été créé avec succès. Un e-mail d'activation a été envoyé."
        );
        setTimeout(() => {
          setIsAnimated(!isAnimated); // Lancer l'action isAnimated après un délai
        }, 4000);
      }
    }
  };
  return (
    <div className="    w-full h-full  flex flex-col justify-center    ">
      <div className="   md:mx-10   mt-10">
        <h1 className="font-poppins font-semibold mt-5 text-center">
          Créer un nouveau compte
        </h1>
        <ToastContainer position="top-center" autoClose={2500} />
        <form onSubmit={handleNewUser} className="mt-10   ">
          <div className="space-y-5    ">
            <div className="flex flex-row  space-x-2  justify-between">
              {" "}
              <InputFields
                type={"text"}
                name={"Nom_user"}
                className="text-black    "
                placeholder="Nom"
                height={43}
                onChange={handleChangeValue}
              />
              <InputFields
                type={"text"}
                className="text-black      "
                name="Prenom_user"
                placeholder={"Prénom"}
                height={43}
                onChange={handleChangeValue}
              />
            </div>
            <InputFields
              type={"text"}
              className="text-black      "
              name="Email_user"
              placeholder={"Email"}
              height={43}
              onChange={handleChangeValue}
            />
            <InputFields
              type={"text"}
              name="MotDePasse_user"
              className="   "
              placeholder={"Mot De Passe"}
              height={43}
              onChange={handleChangeValue}
            />

            <InputFields
              type={"text"}
              className="   "
              name="Telephone_user"
              placeholder={"Numéro de téléphone"}
              height={43}
              onChange={handleChangeValue}
            />
            <InputFields
              type={"text"}
              className=" w-90  "
              name="Adresse_user"
              placeholder={"Adresse"}
              height={43}
              onChange={handleChangeValue}
            />
          </div>

          <div className="flex justify-center items-center mt-8">
            <Button
              type="submit"
              className="bg-darkColor"
              value={"S'inscrire"}
            ></Button>{" "}
          </div>
        </form>

        <div className="pt-12 flex justify-center  ">
          <button
            className="text-center text-gray-500 text-[13px]"
            onClick={(e) => {
              setIsAnimated(!isAnimated);
            }}
          >
            vous avez un compte?{" "}
            <span className="text-greenColor">Se Connecter</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
