"use client"; // Ensure this is at the very top

import { getVille } from "@/app/lib/Category";
import { getAdrByIdUser, getUser } from "@/app/lib/User";
import Input from "@/components/Input";
import { Loading } from "@/components/Loading";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const DetailCompte = () => {
  const [loading, setLoading] = useState(true);

  const { data: session, status } = useSession();
  const id_user = session?.user?.id_user || "";

  const [user, setUser] = useState({
    Nom_user: "",
    Prenom_user: "",
    Email_user: "",
    Telephone_user: "",
    MotDePasse_user: "",
  });
  const [adresse, setAdresse] = useState({
    rue_adr: "",
    code_adr: "",
    id_ville: "",
    id_user: "",
  });
  const [ville, setVille] = useState([]);
  const [confirmMdp, setConfirmMdp] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        setLoading(false);
      }
      if (id_user) {
        try {
          const userData = await getUser(id_user);
          setUser(userData);

          const addressData = await getAdrByIdUser(id_user);
          if (addressData) {
            setAdresse(addressData);
          }

          const villeData = await getVille();
          setVille(villeData);
        } catch (error) {
          console.error("Failed to fetch data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [id_user, session]);

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

  const handleChangeValueAdresse = (e) => {
    const { name, value } = e.target;

    setAdresse((prevAdr) => ({
      ...prevAdr,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Handle address creation or update
      let addressResponse;
      if (adresse.id_user !== id_user) {
        addressResponse = await fetch(
          `http://localhost:4000/api/v1/user/Add_Adresse`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...adresse,
              id_user: id_user,
            }),
          }
        );
      } else {
        addressResponse = await fetch(
          `http://localhost:4000/api/v1/user/Update_Adresse/${id_user}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(adresse),
          }
        );
      }

      // Handle user account update
      const updatedUser = { ...user };
      delete updatedUser.MotDePasse_user;

      const userResponse = await fetch(
        `http://localhost:4000/api/v1/user/UpdateAccount/${id_user}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );
 
      // Handle password update if applicable
      if (user.MotDePasse_user) {
        const passwordResponse = await fetch(
          `http://localhost:4000/api/v1/user/UpdateAccountPassword/${id_user}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              MotDePasse_user: user.MotDePasse_user,
            }),
          }
        );
   
      }
       
        toast.success(` Compte mis à jour avec succès.!`);
   
    } catch (error) {
      console.error("Failed to update user:", error.message);
      toast.error(`Une erreur s'est produite lors de la mise à jour.`);
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        toastStyle={{ width: "50%", width: "700px", right: "50%" }}
      />
      <form onSubmit={handleSubmit}>
        <h1 className="text-[23px] font-semibold text-greenColor mb-5">
          Modifier votre compte
        </h1>

        <div className="w-full flex flex-col items-center space-y-6">
          <div className="flex md:flex-row flex-col space-y-3 md:space-y-0 md:space-x-5 w-full justify-between">
            <div className="w-full">
              <Input
                type="text"
                name="Nom_user"
                placeholder="Nom"
                value={user.Nom_user}
                onChange={handleChangeValue}
              />
            </div>
            <div className="w-full">
              <Input
                type="text"
                name="Prenom_user"
                placeholder="Prénom"
                value={user.Prenom_user}
                onChange={handleChangeValue}
              />
            </div>
          </div>
          <Input
            type="email"
            name="Email_user"
            placeholder="Email"
            value={user.Email_user}
            onChange={handleChangeValue}
          />
          <Input
            type="password"
            name="MotDePasse_user"
            placeholder="Mot de passe"
            onChange={handleChangeValue}
          />
          <Input
            type="password"
            name="confirmMdp"
            placeholder="Confirmer Mot de passe"
            value={confirmMdp}
            onChange={handleChangeValue}
          />
          <Input
            type="text"
            placeholder="Téléphone"
            name="Telephone_user"
            value={user.Telephone_user}
            onChange={handleChangeValue}
          />

          <div className="text-[20px] font-semibold text-blueDark w-full">
            <h1 className="text-[23px] font-semibold text-greenColor mb-5 mt-5">
              Changement d'adresse
            </h1>
            <p className="text-[13px] font-semibold text-blueDark -mt-2 pb-1">
              Région
            </p>
            <select
              className="flex rounded-md h-[43px] py-2 w-full border-2 border-grayColor bg-grayLight text-gray-400 outline-none px-3 text-[12.5px]"
              onChange={handleChangeValueAdresse}
              value={adresse.id_ville}
              name="id_ville"
            >
              <option value="">Votre ville</option>
              {ville.map((item) => (
                <option key={item.id_ville} value={item.id_ville}>
                  {item.Libelle_ville}
                </option>
              ))}
            </select>
          </div>

          <Input
            type="text"
            placeholder="Numéro et nom de rue"
            name="rue_adr"
            value={adresse.rue_adr}
            onChange={handleChangeValueAdresse}
          />
          <Input
            type="text"
            placeholder="Code postal"
            name="code_adr"
            value={adresse.code_adr}
            onChange={handleChangeValueAdresse}
          />
        </div>

        <div className="flex justify-center my-5 mt-5">
          <button
            type="submit"
            className="bg-greenColor hover:bg-darkColor text-white p-3 rounded-md text-sm"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
};

export default DetailCompte;
