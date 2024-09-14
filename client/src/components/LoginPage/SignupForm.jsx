"use client";

import { useState } from "react";
import InputFields from "../InputFields";
import Button from "../Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../Input";

const SignupForm = ({ isAnimated, setIsAnimated }) => {
  const [user, setUser] = useState({
    Nom_user: "",
    Prenom_user: "",
    Email_user: "",
    MotDePasse_user: "",
    Telephone_user: "",
  });
  const [errors, setErrors] = useState({});
  const handleChangeValue = (e) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear the error when the user starts typing
    }));
  };

  const handleNewUser = async (e) => {
    e.preventDefault();
    let newErrors = {};

    // Validation for empty fields
    if (!user.Nom_user) newErrors.Nom_user = "Le nom est requis.";
    if (!user.Prenom_user) newErrors.Prenom_user = "Le prénom est requis.";
    if (!user.Email_user) newErrors.Email_user = "L'email est requis.";
    if (!user.MotDePasse_user)
      newErrors.MotDePasse_user = "Le mot de passe est requis.";
    if (!user.Telephone_user)
      newErrors.Telephone_user = "Le numéro de téléphone est requis.";

    // If there are any validation errors, do not proceed
    if (Object.keys(newErrors).length > 0) {
      // Display errors or handle them accordingly
      setErrors(newErrors);
      return; // Stop execution if validation fails
    }

    // Proceed with email existence check only if all fields are valid
    try {
      const EmailExistResponse = await fetch(
        "http://localhost:4000/api/v1/user/FindUserByEmail",
        {
          method: "POST",
          body: JSON.stringify({ Email_user: user.Email_user }), // Only send email for checking
          headers: { "Content-Type": "application/json" },
        }
      );

      const EmailExist = await EmailExistResponse.json(); // Convert the response to JSON

      if (EmailExist.exists === true) {
        toast.error("L'email existe déjà.");
        return; // Stop if email already exists
      }

      // Proceed with user registration if the email doesn't exist
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
        setUser({
          Nom_user: "",
          Prenom_user: "",
          Email_user: "",
          MotDePasse_user: "",
          Telephone_user: "",
        });
        setTimeout(() => {
          setIsAnimated(!isAnimated); // Trigger animation after a delay
        }, 4000);
      }
    } catch (error) {
      console.error("Error during user registration:", error);
      toast.error("Une erreur s'est produite lors de la création du compte.");
    }
  };

  console.log(user);
  return (
    <div className="    w-full h-full  flex flex-col justify-center    ">
      <div className="   md:mx-10   my-8  ">
        <h1 className="font-poppins font-semibold mt-5 text-center">
          Créer un nouveau compte
        </h1>
        <ToastContainer position="top-center" autoClose={2500} />
        <form onSubmit={handleNewUser} className="mt-10   ">
          <div className="space-y-5    ">
            <div className="flex flex-row  space-x-2  justify-between">
              {" "}
              <div>
                <Input
                  type={"text"}
                  name={"Nom_user"}
                  placeholder={"Nom"}
                  value={user.Nom_user}
                  onChange={handleChangeValue}
                />
                {errors.Nom_user && (
                  <p className="text-red-500 text-[10px] mt-2">{errors.Nom_user}</p>
                )}
              </div>
              <div>
                <Input
                  type={"text"}
                  name={"Prenom_user"}
                  placeholder={"Prénom"}
                  onChange={handleChangeValue}
                  value={user.Prenom_user}
                />
                {errors.Prenom_user && (
                  <p className="text-red-500 text-[10px] mt-2">
                    {errors.Prenom_user}
                  </p>
                )}
              </div>
            </div>{" "}
            <div>
              <Input
                type={"text"}
                name={"Email_user"}
                placeholder={"Email"}
                onChange={handleChangeValue}
                value={user.Email_user}
              />
              {errors.Email_user && (
                <p className="text-red-500 text-[10px] mt-2">{errors.Email_user}</p>
              )}{" "}
            </div>{" "}
            <div>
              <Input
                type={"password"}
                name={"MotDePasse_user"}
                placeholder={"Mot De Passe"}
                value={user.MotDePasse_user}
                onChange={handleChangeValue}
              />
              {errors.MotDePasse_user && (
                <p className="text-red-500 text-[10px] mt-2">
                  {errors.MotDePasse_user}
                </p>
              )}{" "}
            </div>
            <div>
              <Input
                type={"text"}
                name={"Telephone_user"}
                placeholder={"Numéro de téléphone"}
                value={user.Telephone_user}
                onChange={handleChangeValue}
              />
              {errors.Telephone_user && (
                <p className="text-red-500 text-[10px] mt-2">
                  {errors.Telephone_user}
                </p>
              )}{" "}
            </div>
          </div>

          <div className="flex justify-center items-center mt-6">
            <Button
              type="submit"
              className="bg-darkColor"
              value={"S'inscrire"}
            ></Button>{" "}
          </div>
        </form>

        <div className="pt-9 flex justify-center  ">
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
