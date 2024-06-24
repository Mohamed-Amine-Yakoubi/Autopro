"use client";
import React, { useEffect, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";

import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { removeAllItems, removeItem, updateQuantity } from "../redux/slices/cartSlice";
import { Loading } from "@/components/Loading";
import Image from "next/image";
import "../../styles/table.scss";
import Link from "next/link";
import { getMatterById } from "../lib/Car";
import { getSubCategory } from "../lib/SubCategory";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import "../../styles/stepper.scss";
import { TiTick } from "react-icons/ti";
import { getAdrByIdUser, getUser } from "../lib/User";
import Input from "@/components/Input";
import { getVille } from "../lib/Category";
import { getAllMainCommande } from "../lib/Commande";

const Panier = () => {
  const { data: session } = useSession();

  const [loading, setLoading] = useState(true);

  const cart = useSelector((state) => state.cart);

  const [step, setStep] = useState(1);
  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  useEffect(() => {
    if (session) {
      setLoading(false);
    }
  }, [session]);
  if (loading) return <Loading />;

  return (
    <div>
      <Header Title={"Panier"} />

      {session && cart.items.length > 0 ? (
        <div>
          <div className="flex flex-row my-5 text-center justify-center">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className={`step-item ${index === step ? "active" : ""} ${
                  index < step ? "complete" : ""
                }`}
              >
                <div className="step">
                  {index < step ? <TiTick size={24} /> : index}
                </div>
                {index === 1 ? (
                  <p className="text-gray-500 text-[13px] mt-2">Panier </p>
                ) : index === 2 ? (
                  <p className="text-gray-500 text-[13px] mt-2">
                    Vérification{" "}
                  </p>
                ) : index === 3 ? (
                  <p className="text-gray-500 text-[13px] mt-2">
                    Confirmation{" "}
                  </p>
                ) : null}
              </div>
            ))}
          </div>

          {step === 1 && <Step1 nextStep={nextStep} />}
          {step === 2 && <Step2 prevStep={prevStep} nextStep={nextStep} />}
          {step === 3 && <Setp3 />}
        </div>
      ) : (
        <div className="flex md:flex-row flex-col my-32 justify-center">
          <div className="flex   flex-col justify-center items-center ">
            <p className="font-poppins text-[16px] text-gray-400">
              Aucun article ajouté à votre panier
            </p>
            <Link
              href={`./Catalogue`}
              className="bg-greenColor p-2 text-center w-44 rounded-md my-7 text-[13px] text-white"
            >
              Commencez vos achats
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
const Step1 = ({ formData, setFormData, nextStep }) => {
  const [loading, setLoading] = useState(true);

  const [matiere, setMatiere] = useState({});
  const [subcategory, setSubcategory] = useState({});
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    if (!session) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const matierePromises = cart.items.map((item) =>
          getMatterById(item.id_mat)
        );
        const subcategoryPromises = cart.items.map((item) =>
          getSubCategory(item.id_subcat)
        );

        const matiereData = await Promise.all(matierePromises);
        const subcategoryData = await Promise.all(subcategoryPromises);

        const matiereMap = {};
        matiereData.forEach((data, index) => {
          matiereMap[cart.items[index].id_mat] = data;
        });

        const subcategoryMap = {};
        subcategoryData.forEach((data, index) => {
          subcategoryMap[cart.items[index].id_subcat] = data;
        });

        setMatiere(matiereMap);
        setSubcategory(subcategoryMap);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (cart.items.length > 0) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [cart.items, session]);

  const handleRemoveFromCart = (id_prod) => {
    dispatch(removeItem(id_prod));
  };

  const handleDecreaseQuantity = (id_prod, quantity) => {
    if (quantity > 1) {
      dispatch(updateQuantity({ id_prod, quantity: -1 }));
    }
  };

  const handleIncreaseQuantity = (id_prod, quantity, stock) => {
    if (stock > quantity) {
      dispatch(updateQuantity({ id_prod, quantity: 1 }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    nextStep();
  };
  if (loading) return <Loading />;
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="my-16 flex flex-col rounded-t-lg justify-center  mx-40 ">
          <table className="w-full  bg-grayLight responsive-table">
            <thead>
              <tr className="bg-darkColor text-white">
                <td className="text-[13px] py-3 px-8  text-start rounded-tl-md">
                  Produit
                </td>
                <td className="text-[13px] py-3 text-center">Quantité</td>
                <td className="text-[13px] py-3  px-8 text-center ">
                  sous-total
                </td>
                <td className="text-[13px] py-3  px-8 text-end rounded-tr-md ">
                  {" "}
                </td>
              </tr>
            </thead>
            <tbody>
              {cart.items.map((item) => (
                <tr key={item.id_prod} className="border-b ">
                  {/* <Link href={`./Catalogue/${item.id_prod}`}> */}

                  <td className="px-8 my-3 tab1 flex flex-row items-center space-x-3">
                    <div>
                      <Image
                        src={item.Image_thumbnail}
                        height={100}
                        width={100}
                        alt="image_thumbnail"
                        className="bg-grayColor rounded-md shadow-sm"
                      />
                    </div>
                    <div>
                      <div>
                        <p className="text-[16px] mb-2 font-bold text-darkColor">
                          {item.Libelle_prod}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[12.3px] text-gray-500">
                          Pièces : {item.category.Libelle_cat} /{" "}
                          {subcategory[item.id_subcat]?.Libelle_subcat}
                          {subcategory.Libelle_subcat}
                        </p>
                        <p className="text-[12.3px] text-gray-500">
                          Référence : {item.Reference_prod}
                        </p>

                        <p className="text-[12.3px] text-gray-500">
                          Matière : {matiere[item.id_mat]?.Libelle_mat}
                        </p>

                        <p className="text-[12.3px] font-bold text-greenColor">
                          {item.prix_prod} TND
                        </p>
                      </div>
                    </div>
                  </td>
                  {/* </Link> */}

                  <td className="text-center">
                    <button
                      type="button"
                      onClick={() =>
                        handleDecreaseQuantity(item.id_prod, item.quantity)
                      }
                      className="bg-grayColor py-1 px-4 rounded-md text-greenColor text-[23px]"
                    >
                      -
                    </button>
                    <span className="py-2 px-5 text-[13.5px]">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        handleIncreaseQuantity(
                          item.id_prod,
                          item.quantity,
                          item.Stock_prod
                        )
                      }
                      className="bg-grayColor py-1 px-4 rounded-md text-greenColor text-[23px]"
                    >
                      +
                    </button>
                  </td>
                  <td className="px-8 text-center text-[13px] font-bold text-darkColor">
                    {item.prix_prod * item.quantity},00 TND
                  </td>
                  <td className="text-darkColor text-center">
                    <div>
                      <button
                        onClick={() => handleRemoveFromCart(item.id_prod)}
                        className=""
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex lg:justify-end justify-center">
            <table className="lg:w-1/3 w-full">
              <tbody className="  flex flex-col">
                <tr className="text-[13px] flex justify-between">
                  <th className="text-start text-darkColor pt-4">sous-total</th>
                  <td className="text-end pt-4">{cart.subTotalPrice},00 TND</td>
                </tr>
                <tr className="text-[13px] flex justify-between">
                  <th className="text-start pt-3">Livraison</th>
                  <td className="text-end pt-3">7,000 TND</td>
                </tr>
                <tr className="border-b text-start flex justify-between text-[13px]">
                  <th className="text-start pt-3 pb-4">TVA</th>
                  <td className="text-end pt-3 pb-4">{cart.TVA}</td>
                </tr>
                <tr className="text-[13px] flex justify-between">
                  <th className="text-start pt-4">Total de la commande</th>
                  <td className="text-end pt-4"> {cart.totalPrice} TND</td>
                </tr>

                <tr
                  colSpan="3"
                  className="flex items-center justify-center mt-5  "
                >
                  <td>
                    <button
                      type="submit"
                      className="bg-greenColor p-4  text-[13px] text-white rounded-lg"
                    >
                      Valider la Commande
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </form>
    </div>
  );
};
const Step2 = ({ nextStep }) => {
  const [loading, setLoading] = useState(true);
  const [commande, setCommande] = useState(true);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const { data: session, status } = useSession();
  const id_user = session?.user?.id_user || "";
  const router = useRouter();
  const [user, setUser] = useState({
    Nom_user: "",
    Prenom_user: "",
    Email_user: "",
    Telephone_user: "",
    Adresse_user: "",
    MotDePasse_user: "",
  });
  const [adresse, setAdresse] = useState({
    rue_adr: "",
    code_adr: "",
    id_ville: "",
    id_user: session.user.id_user,
  });
  const [ville, setVille] = useState([]);
  const [confirmMdp, setConfirmMdp] = useState("");

  useEffect(() => {
    if (id_user) {
      getUser(id_user).then((item) => {
        setUser(item);
      });

      getAdrByIdUser(id_user).then((item) => {
        setAdresse(item);
      });
    }
    getVille().then((Ville) => {
      setVille(Ville);
    });
    getAllMainCommande(id_user).then((item) => {
      setCommande(item);
    });
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
      if (adresse.id_user != id_user) {
        const res1 = await fetch(
          `http://localhost:4000/api/v1/user/Add_Adresse`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...adresse,
            }),
          }
        );

        if (!res1.ok) {
          throw new Error("Failed to add address");
        }
      } else if (adresse.id_user === id_user) {
        const res1 = await fetch(
          `http://localhost:4000/api/v1/user/Update_Adresse/${id_user}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...adresse,
            }),
          }
        );

        if (!res1.ok) {
          throw new Error("Failed to update address");
        }
      }

      const updatedUser = { ...user };
      delete updatedUser.MotDePasse_user;

      const res2 = await fetch(
        `http://localhost:4000/api/v1/user/UpdateAccount/${id_user}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (!res2.ok) {
        throw new Error("Failed to update user");
      }

      if (!session) {
        throw new Error("User session is not available.");
      }

      const commandData = [];
      const maxIdMainCmdResult =
        commande.length > 0
          ? Math.max(...commande.map((cmd) => cmd.id_MainCmd))
          : 0;
      const id_MainCmd = maxIdMainCmdResult ? maxIdMainCmdResult + 1 : 1;
      cart.items.forEach((item) => {
        const existingCommandData = commandData.find(
          (data) => data.id_magasin === item.id_magasin
        );

        if (existingCommandData) {
          existingCommandData.add_CommandeDetail.push({
            Qte_dtcmd: item.quantity,
            prix_Total_dtcmd: item.prix_prod * item.quantity,
            id_prod: item.id_prod,
            id_magasin: item.id_magasin,
          });
          existingCommandData.prix_total += item.prix_prod * item.quantity;
        } else {
          commandData.push({
            id_MainCmd: id_MainCmd,
            id_user: session.user.id_user,
            id_magasin: item.id_magasin,
            prix_total: item.prix_prod * item.quantity,
            Date_cmd: cart.Date,
            add_CommandeDetail: [
              {
                id_MainCmd: id_MainCmd,
                Qte_dtcmd: item.quantity,
                prix_Total_dtcmd: item.prix_prod * item.quantity,
                id_prod: item.id_prod,
                id_magasin: item.id_magasin,
              },
            ],
          });
        }
      });

      for (const data of commandData) {
        const res = await fetch(
          `http://localhost:4000/api/v1/commande/add_Commande`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to add commande");
        }

        // Assuming the API returns the ID of the new commande

        const encodedId = Buffer.from(String(id_MainCmd)).toString("base64");
        if (res && res2) {
          router.push(`/Panier/${id_MainCmd}`);

          dispatch(removeAllItems());
        }
      }
    } catch (error) {
      console.error("Failed to update user:", error.message);
      alert("Failed to update user");
    }
  };

  const [selectedOption, setSelectedOption] = useState("");

  const handleToggle = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="md:mx-48  my-20 flex md:flex-row flex-col   justify-center   md:space-x-12">
      <div className="w-1/2  ">
        <form onSubmit={handleSubmit}>
          <div className="w-full flex flex-col   space-y-10">
            <p className="text-poppins font-semibold text-greenColor text-[20px]">
              Détails de facturation
            </p>
            <div className="flex md:flex-row flex-col   md:space-x-5 md:space-y-0  space-y-10 w-full justify-between">
              <div className="w-full">
                <Input
                  type="text"
                  name={"Nom_user"}
                  placeholder={"Nom"}
                  value={user.Nom_user}
                  onChange={handleChangeValue}
                />
              </div>
              <div className="w-full">
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
              type={"text"}
              placeholder={"Téléphone"}
              name={"Telephone_user"}
              value={user.Telephone_user}
              onChange={handleChangeValue}
            />

            <div className="w-full   ">
              <p className="text-[13px] font-semibold text-blueDark mx-3 -mt-5 pb-1">
                Région
              </p>
              <select
                className="flex rounded-md h-[43px] py-2 w-full border-2 border-grayColor   bg-grayLight text-gray-400 outline-none px-3 text-[12.5px]"
                onChange={handleChangeValueAdresse}
                value={adresse.id_ville}
                name="id_ville" // Handle change event here
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
              type={"text"}
              placeholder={"Numéro et nom de rue"}
              value={adresse.rue_adr}
              name={"rue_adr"}
              onChange={handleChangeValueAdresse}
            />
            <Input
              type={"text"}
              placeholder={"Code postal"}
              name={"code_adr"}
              value={adresse.code_adr}
              onChange={handleChangeValueAdresse}
            />
          </div>
        </form>
      </div>
      <div className="w-1/3  ">
        <p className="text-poppins font-semibold text-greenColor mb-7 text-[20px]">
          Votre Commande
        </p>
        <div className="space-y-7">
          <div>
            {cart.items.map((item) => (
              <div
                key={item.id_prod}
                className="flex items-center justify-between mb-3  "
              >
                <div className="flex items-center">
                  <Image
                    src={item.Image_thumbnail}
                    height={60}
                    width={60}
                    alt="image_thumbnail"
                    className="bg-grayColor rounded-md shadow-sm"
                  />
                  <p className="ml-3 text-[12.5px]">
                    {item.Libelle_prod} x {item.quantity}
                  </p>
                </div>
                <p className="flex items-end  text-[12.5px]">
                  {item.prix_prod * item.quantity} TND
                </p>
              </div>
            ))}
          </div>
          <table className="border w-full border-collapse bg-grayLight">
            <tr className="border ">
              <td className="border py-3 pl-5">
                <input
                  type="radio"
                  name="paiment"
                  value="livraison"
                  onClick={() => {
                    handleToggle("livraison");
                  }}
                />{" "}
                <span className="text-[13px] font-bold">
                  {" "}
                  Paiement à la livraison
                </span>
                {selectedOption === "livraison" && (
                  <p className="text-[12px] ml-4">
                    Payez en argent comptant à la livraison ou par chèque
                    libellé au nom de Autopro.
                  </p>
                )}
              </td>
            </tr>
            <tr className="border ">
              <td className="border py-3 pl-5">
                <input
                  type="radio"
                  name="paiment"
                  value="carte"
                  onClick={() => {
                    handleToggle("carte");
                  }}
                />{" "}
                <span className="text-[13px] font-bold"> Carte Bancaire</span>
                {selectedOption === "carte" && (
                  <p className="text-[12px] ml-4">
                    Désolé, cette étape est en construction...
                  </p>
                )}
              </td>
            </tr>
          </table>
          <table className="  w-full">
            <tbody className="  flex flex-col">
              <tr className="text-[13px] flex justify-between">
                <th className="text-start text-darkColor pt-4">sous-total</th>
                <td className="text-end pt-4">{cart.subTotalPrice},00 TND</td>
              </tr>
              <tr className="text-[13px] flex justify-between">
                <th className="text-start pt-3">Livraison</th>
                <td className="text-end pt-3">7,000 TND</td>
              </tr>
              <tr className="border-b text-start flex justify-between text-[13px]">
                <th className="text-start pt-3 pb-4">TVA</th>
                <td className="text-end pt-3 pb-4">{cart.TVA}</td>
              </tr>
              <tr className="text-[13px] flex justify-between">
                <th className="text-start pt-4">Total de la commande</th>
                <td className="text-end pt-4"> {cart.totalPrice} TND</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-center  my-5 mt-5">
          <form onSubmit={handleSubmit}>
            <button
              type="submit"
              className="bg-greenColor hover:bg-darkColor text-white p-3 rounded-md text-[13px]"
            >
              Commander
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const Setp3 = ({}) => {
  return <div></div>;
};

export default Panier;
