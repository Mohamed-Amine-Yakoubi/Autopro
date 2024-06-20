"use client";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "../redux/slices/cartSlice";
import { Loading } from "@/components/Loading";
import Image from "next/image";
import "../../styles/table.scss";
import Link from "next/link";
import { getMatterById } from "../lib/Car";
import { getSubCategory } from "../lib/SubCategory";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";
import CommandeModal from "@/components/CommandeModal";
import "../../styles/stepper.scss";
const Panier = () => {
  const [loading, setLoading] = useState(true);
  const [matiere, setMatiere] = useState({});
  const [subcategory, setSubcategory] = useState({});
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const [step, setStep] = useState(1);
  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };
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

    if (!session) {
      throw new Error("User session is not available.");
    }

    // Initialize an array to collect all commandData objects
    const commandData = [];

    cart.items.forEach((item) => {
      // Check if there's already an entry for this id_magasin in commandData
      const existingCommandData = commandData.find(
        (data) => data.id_magasin === item.id_magasin
      );

      if (existingCommandData) {
        // If entry exists, push a new add_CommandeDetail to the existing entry
        existingCommandData.add_CommandeDetail.push({
          Qte_dtcmd: item.quantity,
          prix_Total_dtcmd: item.prix_prod * item.quantity,
          id_prod: item.id_prod,
          id_magasin: item.id_magasin,
        });

        // Update the total price
        existingCommandData.prix_total += item.prix_prod * item.quantity;
      } else {
        // If entry does not exist, create a new commandData entry
        commandData.push({
          id_user: session.user.id_user,
          id_magasin: item.id_magasin,
          prix_total: item.prix_prod * item.quantity,
          add_CommandeDetail: [
            {
              Qte_dtcmd: item.quantity,
              prix_Total_dtcmd: item.prix_prod * item.quantity,
              id_prod: item.id_prod,
              id_magasin: item.id_magasin,
            },
          ],
        });
      }
    });
    try {
      // Iterate over each commandData object and send a POST request for each one
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
      }
    } catch (error) {
      console.error("Failed to add commande:", error);
      alert("Failed to add commande: " + error.message);
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <div>
        <Header Title={"Panier"} />
      </div>

      <div className="flex justify-between">
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
                      <p className="text-gray-500 text-[13px] mt-2">
                        Etape {index}
                      </p>
                    </div>
                  ))}
                </div>
      <form onSubmit={handleSubmit}>
        {cart.items.length > 0 ? (
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
                    <th className="text-start text-darkColor pt-4">
                      sous-total
                    </th>
                    <td className="text-end pt-4">
                      {cart.subTotalPrice},00 TND
                    </td>
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
                        type="button"
                        onClick={toggleModal}
                        className="bg-greenColor p-4  text-[13px] text-white rounded-lg"
                      >
                        Valider la commande
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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
      </form>

      <CommandeModal submit={handleSubmit} isOpen={showModal} onClose={toggleModal} />
    </div>
  );
};

export default Panier;
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
  ModalHeader,
} from "@nextui-org/react";
import "../styles/Modal.scss";
import Input from "./Input";
import { getVille } from "@/app/lib/Category";

const CommandeModal = ({ isOpen, onClose,submit, children, props, icon }) => {
  const [userAdresse, setUserAdresse] = useState({});
  const [ville, setVille] = useState([]);
  useEffect(() => {
    getVille().then((Ville) => {
      setVille(Ville);
    });
  }, []);
  const handleChangeValue = (e) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        className="    bg-white  md:mt-0 md:mb-0 mb-8 mt-8 rounded-2xl   "
        size="lg"
        icon={icon}
      >
        <div className="modal-overlay  ">
          <ModalContent className="custom-modal-content">
            <ModalHeader className="custom-modal-header flex flex-col items-center">
              Modifier votre Profile
            </ModalHeader>
            <ModalBody className="custom-modal-body flex flex-col justify-center items-center space-y-1 my-5">
              <p className="text-[12.4px] text-center color text-gray-500    mb-3">
                Pour finaliser votre commande, nous vous prions de bien vouloir
                compléter le formulaire d'adresse. Cette étape est essentielle
                pour assurer la livraison correcte de vos produits. Nous vous
                remercions de votre compréhension et de votre coopération.
              </p>
              <Input
                type={"text"}
                placeholder={"Numéro et nom de rue"}
                name={"Adresse"}
                onChange={handleChangeValue}
              />
              <select
                className="flex rounded-lg h-[43px] py-2 w-full max-w-lg bg-grayLight text-gray-400 outline-none px-3 text-[12.5px]"
                onChange={handleChangeValue}
                name="id_ville" // Handle change event here
              >
                <option value="">Votre ville</option>
                {ville.map((item) => (
                  <option key={item.id_ville} value={item.id_ville}>
                    {item.Libelle_ville}
                  </option>
                ))}
              </select>
              <Input
                type={"text"}
                placeholder={"Code postal"}
                name={"Code_postal"}
                onChange={handleChangeValue}
              />

              <button
       onClick={submit}
       type="submit"
                className="bg-greenColor py-4  my-8 w-40 text-[13px] text-white rounded-lg"
              >
                Valider la commande
              </button>
            </ModalBody>
          </ModalContent>
        </div>
      </Modal>
    </div>
  );
};
export default CommandeModal;
