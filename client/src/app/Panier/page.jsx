"use client";
import React, { useEffect, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";

import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  removeAllItems,
  removeItem,
  updateQuantity,
} from "../redux/slices/cartSlice";
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
import { Get_AllCommandeUsers, getAllMainCommande } from "../lib/Commande";

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

 
  return (
    <div>
      <Header Title={"Panier"} />

      {  cart.items.length > 0 ? (
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
if (session) {
  

    nextStep();
  }else{
    alert("il faut connecter")
  }
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
                    <div    className="w-[100px] h-[100px] bg-grayColor rounded-md shadow-sm">
                      <Image
                        src={item.Image_thumbnail}
                        height={100}
                        width={100}
                        alt="image_thumbnail"
                        className=" shadow-sm w-[100px] h-[100px]  rounded-md  object-contain p-2 mix-blend-multiply"
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
                          {item.prix_prod.toFixed(2)} TND
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
                    {item.prix_prod.toFixed(
                          3
                        ) * item.quantity} TND
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
                  <td className="text-end pt-4">{cart.subTotalPrice.toFixed(2)} TND</td>
                </tr>
                <tr className="text-[13px] flex justify-between">
                  <th className="text-start pt-3">Livraison</th>
                  <td className="text-end pt-3">7,000 TND</td>
                </tr>
                <tr className="border-b text-start flex justify-between text-[13px]">
                  <th className="text-start pt-3 pb-4">TVA</th>
                  <td className="text-end pt-3 pb-4">{cart.TVA.toFixed(2)}</td>
                </tr>
                <tr className="text-[13px] flex justify-between">
                  <th className="text-start pt-4">Total de la commande</th>
                  <td className="text-end pt-4"> {cart.totalPrice.toFixed(2)} TND</td>
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
    const [commande, setCommande] = useState([]);
    const [commandeUsers, setCommandeUsers] = useState([]);
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
  
    const { data: session, status } = useSession();
    const id_user = session?.user?.id_user;
    const router = useRouter();
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
      id_user: id_user || "",
    });
    const [ville, setVille] = useState([]);
    const [confirmMdp, setConfirmMdp] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const [error, setError] = useState(null);
  
    useEffect(() => {
      if (id_user) {
        // Fetch user details
        getUser(id_user)
          .then((item) => {
            setUser(item);
          })
          .catch((err) => {
            console.error("Failed to fetch user:", err);
            setError("Failed to fetch user details.");
          });
  
        // Fetch address by user ID
        getAdrByIdUser(id_user)
          .then((item) => {
            if (item) {
              setAdresse(item);
            }
          })
          .catch((err) => {
            console.error("Failed to fetch address:", err);
            setError("Failed to fetch address.");
          });
      }
  
      // Fetch cities
      getVille()
        .then((Ville) => {
          setVille(Ville);
        })
        .catch((err) => {
          console.error("Failed to fetch cities:", err);
          setError("Failed to fetch cities.");
        });
  
      // Fetch all commandes for users
      Get_AllCommandeUsers()
        .then((item) => {
          setCommandeUsers(item);
        })
        .catch((err) => {
          console.error("Failed to fetch commandes:", err);
          setError("Failed to fetch commandes.");
        });
  
      // Fetch all main commandes
      if (id_user) {
        getAllMainCommande(id_user)
          .then((item) => {
            setCommande(item);
          })
          .catch((err) => {
            console.error("Failed to fetch main commandes:", err);
            setError("Failed to fetch main commandes.");
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
  
    const handleChangeValueAdresse = (e) => {
      const { name, value } = e.target;
  
      setAdresse((prevAdr) => ({
        ...prevAdr,
        [name]: value,
      }));
    };
  
    const handleToggle = (option) => {
      setSelectedOption(option);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null); // Reset error state
  
      try {
        if (!id_user) {
          throw new Error("User session is not available.");
        }
  
        // Determine if the address exists by checking if adresse has an ID (assuming id_adr exists)
        const isAddressExist = adresse && adresse.id_adr;
  
        if (!isAddressExist) {
          // Add new address
          const res1 = await fetch(`http://localhost:4000/api/v1/user/Add_Adresse`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...adresse,
              id_user: id_user, // Ensure id_user is included
            }),
          });
  
          if (!res1.ok) {
            const errorData = await res1.json();
            throw new Error(errorData.message || "Failed to add address.");
          }
        } else {
          // Update existing address
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
            const errorData = await res1.json();
            throw new Error(errorData.message || "Failed to update address.");
          }
        }
  
        // Update user information (excluding password)
        const { MotDePasse_user, ...updatedUser } = user;
  
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
          const errorData = await res2.json();
          throw new Error(errorData.message || "Failed to update user.");
        }
  
        // Fetch product details
        const productDetails = await Promise.all(
          cart.items.map(async (item) => {
            const res = await fetch(`http://localhost:4000/api/v1/product/get_specProduct/${item.id_prod}`);
            if (!res.ok) {
              const errorData = await res.json();
              throw new Error(errorData.message || "Failed to fetch product details.");
            }
            return await res.json();
          })
        );
  
        // Prepare command data
        const commandData = [];
        const maxIdMainCmdResult =
          commandeUsers.length > 0
            ? Math.max(...commandeUsers.map((cmd) => cmd.id_MainCmd))
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
              id_user: id_user,
              id_magasin: item.id_magasin,
              prix_total: item.prix_prod * item.quantity,
              Date_cmd: new Date().toISOString().slice(0,10),
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
  
        // Prepare email content
        const Autopro_logo_URL =
          "https://res.cloudinary.com/dszbzybhk/image/upload/v1723404962/c76ktevrn9lvxad0pmux.png";
  
        const mailContent = `
          <html>
            <head>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  display: flex; justify-content: center;
                  margin: 0;
                  padding: 0;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  border-radius: 5px;
                  background-color:white;
                }
                h1 {
                  color: #333;
                  padding-bottom:10px;
                }
                p {
                  color: #666;
                }
                .button {
                  display: inline-block;
                  padding: 10px 20px;
                  background-color: #007bff;
                  color:white;
                  text-decoration: none;
                  border-radius: 5px;
                }
                table {
                  width: 100%;
                  margin-top:25px;
                  border: 1px solid #fafafa ;
                  border-collapse: collapse;
                }
                .logo {
                  width: 200px;
                  text-align:center
                }
              </style>
            </head>
            <body class="container">
              <div style="display:flex;justify-content:center">
                <img src="${Autopro_logo_URL}" class="logo" alt="logo" />
              </div>
              <h1 style="color:#4BAF4F">En Cours De Traitement</h1>
              <h4> Bonjour ${session.user.Prenom_user} ${session.user.Nom_user}, </h4>
              <p>Pour information – nous avons reçu votre commande n°${id_MainCmd}, elle est maintenant en cours de traitement :</p>
              <p>Payer en argent comptant à la livraison ou par chèque libellé au nom de Autopro.</p>
              <div style="display:flex;justify-content: center; align-items:center;">
                <table>
                  <thead style="border: 1px solid #e0e0e0; text-align: start; background-color: #F5F5F7;">
                    <tr>
                      <th style="border: 1px solid #e0e0e0; font-size: 14px; color: #666; padding: 10px;">Produit</th>
                      <th style="border: 1px solid #e0e0e0; font-size: 14px; color: #666; padding: 10px;">Quantité</th>
                      <th style="border: 1px solid #e0e0e0; font-size: 14px; color: #666; padding: 10px;" colspan="4">Prix</th>
                    </tr>
                  </thead>
                  <tbody style="border: 1px solid #e0e0e0;">
                    ${productDetails
                      .map(
                        (product, index) => `
                      <tr>
                        <td style="border: 1px solid #e0e0e0; font-size: 13px; padding: 10px; display: flex; align-items: center;">
                          <img src="${product.Image_thumbnail}" alt="image" style="border: 1px solid #e0e0e0; width:50px;height:50px" />
                          <span style="margin-left:10px;">${product.Libelle_prod}</span>
                        </td>
                        <td style="border: 1px solid #e0e0e0; font-size: 13px; padding: 10px;">${cart.items[index].quantity}</td>
                        <td style="border: 1px solid #e0e0e0; font-size: 13px; padding: 10px;" colspan="4">${product.prix_prod} TND</td>
                      </tr>
                    `
                      )
                      .join("")}
                  </tbody>
                  <tfoot style="border: 1px solid #e0e0e0;">
                    <tr style="border: 1px solid #e0e0e0;">
                      <td style="border: 1px solid #e0e0e0; font-size: 14px; color: #666; font-weight: bold; padding: 10px;" colspan="5">Sous-total :</td>
                      <td style="border: 1px solid #e0e0e0; font-size: 13px; padding: 10px;">${cart.subTotalPrice.toFixed(2)} TND</td>
                    </tr>
                    <tr style="border: 1px solid #e0e0e0;">
                      <td style="border: 1px solid #e0e0e0; font-size: 14px; color: #666; font-weight: bold; padding: 10px;" colspan="5">Moyen de paiement :</td>
                      <td style="border: 1px solid #e0e0e0; font-size: 13px; padding: 10px;">Paiement à la livraison</td>
                    </tr>
                    <tr style="border: 1px solid #e0e0e0;">
                      <td style="border: 1px solid #e0e0e0; font-size: 14px; color: #666; font-weight: bold; padding: 10px;" colspan="5">Total :</td>
                      <td style="border: 1px solid #e0e0e0; font-size: 13px; padding: 10px;">${cart.totalPrice.toFixed(2)} TND</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div style="margin-top:30px;border:1px solid #e0e0e0; padding:10px">
                <p>
                  <span style="font-weight: 600; color:#4BAF4F">Nom et Prénom :</span>
                  ${session.user.Prenom_user} ${session.user.Nom_user}
                </p>
                <p>
                  <span style="font-weight: 600; color:#4BAF4F">Numéro et nom de rue :</span> ${adresse.rue_adr}
                </p>
                ${ville
                  .filter((item) => item.id_ville === adresse.id_ville)
                  .map(
                    (filtereditem) => `
                    <p key="${filtereditem.id_ville}">
                      <span style="font-weight: 600; color:#4BAF4F">Region : </span>
                      ${filtereditem.Libelle_ville}
                    </p>
                  `
                  )
                  .join("")}
                <p>
                  <span style="font-weight: 600; color:#4BAF4F">Code postal :</span> ${adresse.code_adr}
                </p>
                <p>
                  <span style="font-weight: 600; color:#4BAF4F">Numéro de télephone :</span> ${session.user.Telephone_user}
                </p>
                <p className="mt-3 text-[13.5px]">
                  <span style="font-weight: 600; color:#4BAF4F">E-mail :</span> ${session.user.Email_user}
                </p>
              </div>
            </body>
          </html>
        `;
  
        // Send confirmation email
        const MailCommande = await fetch(
          `http://localhost:4000/api/v1/commande/MailCommande`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              to: session.user.Email_user,
              subject: "Votre commande est en cours de traitement",
              html: mailContent,
            }),
          }
        );
  
        if (!MailCommande.ok) {
          const errorData = await MailCommande.json();
          throw new Error(errorData.message || "Failed to send confirmation email.");
        }
  
        // Add commandes to the database
        for (const data of commandData) {
          const res = await fetch(`http://localhost:4000/api/v1/commande/add_Commande`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
  
          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to add commande.");
          }
        }
  
        // Redirect and clear cart
        router.push(`/Panier/${id_MainCmd}`);
        dispatch(removeAllItems());
      } catch (error) {
        console.error("Error:", error.message);
        setError(error.message);
        alert(`Failed to process order: ${error.message}`);
      }
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
                value={adresse?.id_ville}
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
              value={adresse?.rue_adr}
              name={"rue_adr"}
              onChange={handleChangeValueAdresse}
            />
            <Input
              type={"text"}
              placeholder={"Code postal"}
              name={"code_adr"}
              value={adresse?.code_adr}
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
                  <div className="bg-grayColor rounded-md">
                  <Image
                    src={item.Image_thumbnail}
                    height={60}
                    width={60}
                    alt="image_thumbnail"
                    className=" rounded-md shadow-sm   object-contain p-2 mix-blend-multiply"
                  /></div>
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
                <td className="text-end pt-4">{cart.subTotalPrice.toFixed(2)} TND</td>
              </tr>
              <tr className="text-[13px] flex justify-between">
                <th className="text-start pt-3">Livraison</th>
                <td className="text-end pt-3">7,000 TND</td>
              </tr>
              <tr className="border-b text-start flex justify-between text-[13px]">
                <th className="text-start pt-3 pb-4">TVA</th>
                <td className="text-end pt-3 pb-4">{cart.TVA.toFixed(2)}</td>
              </tr>
              <tr className="text-[13px] flex justify-between">
                <th className="text-start pt-4">Total de la commande</th>
                <td className="text-end pt-4"> {cart.totalPrice.toFixed(2)} TND</td>
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
