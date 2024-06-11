"use client"; // Ensure this is at the very top

import { getUser } from "@/app/lib/User";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Input from "./InputWhite";
const ProfileUser = () => {
  const { data: session, status } = useSession();
  const id_user = session?.user?.id_user || "";
  const [user, setUser] = useState({
    Nom_user: "",
    Prenom_user: "",
    Email_user: "",
    Telephone_user: "",
    Adresse_user: "",
    MotDePasse_user: "",
  });
  const [confirmMdp, setConfirmMdp] = useState("");

  useEffect(() => {
    if (id_user) {
      getUser(id_user).then((item) => {
        setUser(item);
      });
    }
  }, [id_user]);

  const handleChangeValue = (e) => {
    const { name, value } = e.target;

    if (name === "MotDePasse_user") {
      setUser((prevUser) => ({
        ...prevUser,
        MotDePasse_user: value,
      }));
    } else if (name === "confirmMdp") {
      setConfirmMdp(value);
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.MotDePasse_user !== "" && user.MotDePasse_user === confirmMdp) {
      const requestPayload = {
        ...user,
        MotDePasse_user: user.MotDePasse_user || undefined,
      };

      try {
        const res = await fetch(
          `http://localhost:4000/api/v1/user/UpdateAccountPassword/${id_user}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestPayload),
          }
        );

        if (!res.ok) {
          throw new Error("Failed to update mot de passe user");
        }

        const result = await res.json();

        if (result) {
          location.reload();
        }
      } catch (error) {
        console.error("Failed to update mot de passe user:", error.message);
        alert("Failed to update mot de passe user");
      }
    }

    try {
      const res = await fetch(
        `http://localhost:4000/api/v1/user/UpdateAccount/${id_user}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...user,
            MotDePasse_user: undefined,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update user");
      }

      const result = await res.json();

      if (result) {
        location.reload();
      }
    } catch (error) {
      console.error("Failed to update user:", error.message);
      alert("Failed to update user");
    }
  };
 
  return (
    <div className="p-6 py-8 shadow-lg rounded-lg overflow-hidden bg-grayLight">
      <form onSubmit={handleSubmit}>
        <div className="w-full flex flex-col items-center space-y-5">
          <div className="flex md:flex-row flex-col space-y-3 md:space-y-0 w-full justify-between">
            <div>
              <Input
                type="text"
                name={"Nom_user"}
                placeholder={"Nom"}
                value={user.Nom_user}
                onChange={handleChangeValue}
              />
            </div>
            <div>
              <Input
                type="text"
                name={"Prenom_user"}
                placeholder={"Prénom"}
                value={user.Prenom_user}
                onChange={handleChangeValue}
              />
            </div>
          </div>

          <Input
            type="Email"
            name={"Email_user"}
            placeholder={"Email"}
            value={user.Email_user}
            onChange={handleChangeValue}
          />
          <Input
            type="password"
            name={"MotDePasse_user"}
            placeholder={"Mot de passe"}
            onChange={handleChangeValue}
          />

          <Input
            type="password"
            name={"confirmMdp"}
            placeholder={"Confirmer Mot de passe"}
            value={confirmMdp}
            onChange={handleChangeValue}
          />

          <Input
            type={"text"}
            placeholder={"Adresse"}
            name={"Adresse_user"}
            value={user.Adresse_user}
            onChange={handleChangeValue}
          />
          <Input
            type={"text"}
            placeholder={"Téléphone"}
            name={"Telephone_user"}
            value={user.Telephone_user}
            onChange={handleChangeValue}
          />
        </div>

        <div className="flex justify-center my-5 mt-5">
          <button className="bg-greenColor hover:bg-darkColor text-white p-3 rounded-md text-sm">
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileUser;
