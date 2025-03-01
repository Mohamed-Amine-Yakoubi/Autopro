"use client";
import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalBody, ModalHeader } from "@nextui-org/react";
import "../styles/Modal.scss";
import { Ellipsis } from "react-css-spinners";

import "../styles/stepper.scss";

import { MdAddPhotoAlternate } from "react-icons/md";
import { useSession } from "next-auth/react";
import { getVille } from "@/app/lib/Category";
import { TiTick } from "react-icons/ti";
import { getStoreByUserID } from "@/app/lib/Magasin";
import Input from "./Input";
import Textarea from "./Textarea";
import { useDispatch } from "react-redux";
import { addItem } from "@/app/redux/slices/storeSlice";

const ModalStore = ({ isOpen, onClose, children }) => {
  const { data: session } = useSession();
  const [step, setStep] = useState(1);
  const [store, setStore] = useState([]);

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    Libelle_magasin: "",
    Adresse_magasin: "",
    Email_magasin: "",
    Telephone_magasin: "",
    Description_magasin: "",
    Logo_magasin: null,
    Lien_facebook: "",
    Lien_instagram: "",
    Lien_linkedin: "",
    Lien_siteWeb: "",
    id_proprietaire: session?.user?.id || "",
    id_ville: 0,
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formData.id_ville = parseInt(formData.id_ville);
    for (const key in formData) {
      // Check if the field is a File object (for the image)
      if (formData[key] instanceof File) {
        formDataToSend.append(key, formData[key]);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      const res = await fetch(`http://localhost:4000/api/v1/magasin/addStore`, {
        method: "POST",
        body: formDataToSend, // Send FormData directly
      });

      if (!res.ok) {
        throw new Error("Failed to add store");
      }

      const result = await res.json();

      if (result) {
        dispatch(addItem(result));
        window.location.reload();
      }
    } catch (error) {
      alert("Failed to add store");
    }
  };

  useEffect(() => {
    if (session) {
      getStoreByUserID(session.user.id_user).then((data) => {
        setStore(data);
      });
    }
  }, [session?.user?.id]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="custom-modal-lg   "
      size="lg"
    >
      <div className="modal-overlay">
        {store != null && session ? (
          <div>
            <ModalContent>
              <ModalHeader className="flex flex-col gap-1 rounded-t-2xl bg-grayLight text-center">
                Merci pour votre patience
              </ModalHeader>
              <ModalBody>
                <p className="text-[15px] text-center text-blueDark mt-10">
                  Cher {session?.user.name}, votre demande est en cours
                  d'examen, vous recevrez bientôt un email de confirmation
                </p>
                <div className="flex justify-center">
                  <Ellipsis color="#4BAF4F" size={80} thickness={15} />
                </div>
              </ModalBody>
            </ModalContent>
          </div>
        ) : (
          <div>
            <ModalContent>
              <ModalHeader className="flex flex-col gap-1 rounded-t-2xl bg-grayLight text-center">
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
              </ModalHeader>
              <ModalBody>
                <div>
                  {step === 1 && (
                    <Step1
                      formData={formData}
                      setFormData={setFormData}
                      nextStep={nextStep}
                    />
                  )}
                  {step === 2 && (
                    <Step2
                      formData={formData}
                      setFormData={setFormData}
                      prevStep={prevStep}
                      nextStep={nextStep}
                    />
                  )}
                  {step === 3 && (
                    <Step3
                      formData={formData}
                      setFormData={setFormData}
                      prevStep={prevStep}
                      HandleSubmit={HandleSubmit}
                      session={session}
                    />
                  )}
                </div>
              </ModalBody>
            </ModalContent>
          </div>
        )}
      </div>
    </Modal>
  );
};
const Step1 = ({ formData, setFormData, nextStep }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    // Validation for empty fields
    if (!formData.Libelle_magasin)
      newErrors.Libelle_magasin = "Le nom de boutique est requis.";
    if (!formData.Email_magasin)
      newErrors.Email_magasin = "Email est requis.";
    if (!formData.Adresse_magasin)
      newErrors.Adresse_magasin = "Adrésse est requis.";
    if (!formData.Telephone_magasin)
      newErrors.Telephone_magasin = "Le numéro de telephone est requis.";
    if (!formData.Description_magasin)
      newErrors.Description_magasin = "La description est requis.";
    // If there are any validation errors, do not proceed
    if (Object.keys(newErrors).length > 0) {
      // Display errors or handle them accordingly
      setErrors(newErrors);
      return; // Stop execution if validation fails
    }
    nextStep();
  };

  return (
    <form onSubmit={HandleSubmit}>
      <div className="flex flex-col space-y-5 h-[450px] overflow-y-auto">
        <p className="text-[12.4px] text-center color text-gray-500 mt-2  mb-2">
          Autopro vous offre la possibilité de créer votre propre boutique sur
          notre plateforme. Il vous suffit de remplir le formulaire ci-dessous,
          et nous étudierons votre demande pour vous répondre dans un délai
          maximum de 3 jours.
        </p>
        <div>
          <Input
            type={"text"}
            name={"Libelle_magasin"}
            placeholder={"Nom de la boutique"}
            value={formData.Libelle_magasin}
            onChange={handleChange}
          />
          {errors.Libelle_magasin && (
            <p className="text-red-500 text-[10px] mt-2">
              {errors.Libelle_magasin}
            </p>
          )}
        </div>
        <div>
          <Input
            type={"text"}
            name={"Email_magasin"}
            placeholder={"Email"}
            value={formData.Email_magasin}
            onChange={handleChange}
          />{" "}
          {errors.Email_magasin && (
            <p className="text-red-500 text-[10px] mt-2">
              {errors.Email_magasin}
            </p>
          )}
        </div>
        <div>
          <Input
            type={"text"}
            name={"Adresse_magasin"}
            placeholder={"Adresse"}
            value={formData.Adresse_magasin}
            onChange={handleChange}
          />{" "}
          {errors.Adresse_magasin && (
            <p className="text-red-500 text-[10px] mt-2">
              {errors.Adresse_magasin}
            </p>
          )}
        </div>
        <div>
          <Input
            type={"text"}
            name={"Telephone_magasin"}
            placeholder={"Téléphone"}
            value={formData.Telephone_magasin}
            onChange={handleChange}
          />{" "}
          {errors.Telephone_magasin && (
            <p className="text-red-500 text-[10px] mt-2">
              {errors.Telephone_magasin}
            </p>
          )}
        </div>
        <div>
          <Textarea
            name={"Description_magasin"}
            placeholder={"Description"}
            value={formData.Description_magasin}
            onChange={handleChange}
          />{" "}
          {errors.Description_magasin && (
            <p className="text-red-500 text-[10px] mt-2">
              {errors.Description_magasin}
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="btn text-[13px] bg-green-500 text-white rounded-full py-2  px-8 mt-8 mb-7 "
          type="submit"
        >
          Suivant
        </button>
      </div>
    </form>
  );
};
const Step2 = ({ formData, setFormData, prevStep, nextStep }) => {
  const [ville, setVille] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Si le champ est id_ville, convertissez la valeur en nombre entier
    const parsedValue = name === "id_ville" ? parseInt(value) : value;
    if (files) {
      setFormData({
        ...formData,
        [name]: files[0], // Store the first file in the state
      });
      setSelectedImage(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: parsedValue });
    }
  };
  const HandleSubmit = (e) => {
    e.preventDefault();
   
    nextStep();
  };
  // Ville
  useEffect(() => {
    getVille().then((Ville) => {
      setVille(Ville);
    });
  }, []);
  return (
    <form onSubmit={HandleSubmit}>
      <div className="flex flex-col space-y-5 h-[450px] mt-8">
        <select
          className="flex rounded-lg h-[43px] py-2 w-full max-w-lg bg-grayLight text-gray-400 outline-none px-5 text-[13px]"
          value={formData.id_ville} // Bind the selected value to the formData
          onChange={handleChange}
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
          name={"Lien_facebook"}
          placeholder={"Lien de page facebook"}
          value={formData.Lien_facebook}
          onChange={handleChange}
        />
        <Input
          type={"text"}
          name={"Lien_instagram"}
          placeholder={"Lien de page instagram"}
          value={formData.Lien_instagram}
          onChange={handleChange}
        />
        <Input
          type={"text"}
          name={"Lien_linkedin"}
          placeholder={"Lien de page Linkedin"}
          value={formData.Lien_linkedin}
          onChange={handleChange}
        />
        <Input
          type={"text"}
          name={"Lien_siteWeb"}
          placeholder={"Lien de page de site web"}
          value={formData.Lien_siteWeb}
          onChange={handleChange}
        />
        <div className=" flex items-center justify-center my-3">
          <div className=" flex items-center justify-center w-[20px] bg-grayLight rounded-md py-7 px-16">
            {selectedImage ? (
              <div className="">
                <h2>Selected Image:</h2>
                <img
                  src={selectedImage}
                  alt="Selected"
                  style={{ maxWidth: "10%" }}
                />
              </div>
            ) : (
              <div>
                {" "}
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer text-[35px]  text-blueDark"
                >
                  <MdAddPhotoAlternate />
                </label>
                <input
                  type="file"
                  id="fileInput"
                  name="Logo_magasin"
                  className="hidden"
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          className="btn bg-gray-300 text-gray-600 rounded-full text-[13px] py-2 px-6 mt-8 mb-7 "
          type="button"
          onClick={prevStep}
        >
          Précédent
        </button>
        <button
          className="btn bg-green-500 text-white rounded-full py-2  text-[13px] px-8 mt-8 mb-7 "
          type="submit"
        >
          Suivant
        </button>
      </div>
    </form>
  );
};

const Step3 = ({ formData, setFormData, prevStep, HandleSubmit, session }) => {
  return (
    <form onSubmit={HandleSubmit}>
      <div>
        <p className="text-[15px] text-center color text-blueDark mt-8 mb-3">
          Merci {session.user.name}, d'avoir pris le temps de remplir le
          formulaire. Vous êtes maintenant à un seul clic de terminer le
          processus d'envoi de votre demande pour l'examen. Une fois que vous
          aurez cliqué sur "terminer", votre demande sera soumise et vous
          recevrez bientôt un e-mail de confirmation . Nous apprécions votre
          patience et votre engagement dans cette procédure, et nous sommes
          impatients de traiter votre demande avec soin et efficacité.
        </p>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          className="btn bg-gray-300 text-[13px] text-gray-600 rounded-full py-2 px-6 mt-8 mb-7 "
          type="button"
          onClick={prevStep}
        >
          Précédent
        </button>
        <button
          className="btn bg-green-500 text-[13px] text-white rounded-full py-2  px-8 mt-8 mb-7 "
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
export default ModalStore;
