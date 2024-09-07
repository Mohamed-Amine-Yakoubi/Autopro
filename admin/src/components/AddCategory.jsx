"use client";
import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalBody, ModalHeader } from "@nextui-org/react";
import "../style/Modal.scss";
import Input from "./Input";
import {
  AddMarque,
  AddModele,
  AddMotor,
  AddPiece,
  getAllCategories,
  getAllMarque,
  GetAllModele,
} from "@/app/lib/Car";
import { IoMdPhotos } from "react-icons/io";
import Image from "next/image";

const AddCategory = ({ isOpen, onClose, type }) => {
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [marque, setMarque] = useState([]);
  const [modele, setModele] = useState([]);
  const [motor, setMotor] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    Libelle_marque: "",
    Libelle_modele: "",
    Libelle_motor: "",
    Libelle_cat: "",
    Libelle_subcat: "",
    id_marque: "",
    Image_cat: null,
    Image_subcat: null,
    annee_modele: "",
    id_modele: "",
    id_cat: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      setFormData({
        ...formData,
        [name]: files[0], // Set the first file
      });
      setSelectedImage(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Generate a list of years from 1900 to the current year
  const years = [];
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= 1900; year--) {
    years.push(year.toString());
  }

  useEffect(() => {
    getAllMarque().then((marque) => {
      setMarque(marque);
    });
    GetAllModele().then((modele) => {
      setModele(modele);
    });
    getAllCategories().then((category) => {
      setCategory(category);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (type === "Marque") {
        await AddMarque(formData.Libelle_marque);
      } else if (type === "Modele") {
        await AddModele(
          formData.Libelle_modele,
          formData.annee_modele,
          formData.id_marque
        );
      } else if (type === "Motorisation") {
        await AddMotor(formData.Libelle_motor, formData.id_modele);
      } else if (type === "Pieces") {
        // Prepare form data
        const formDataToSend = new FormData();
        formDataToSend.append("Libelle_cat", formData.Libelle_cat);
        formDataToSend.append("Image_cat", formData.Image_cat); // Add the image file

        try {
          const res = await fetch(
            `http://localhost:4000/api/v1/category/addCategory`,
            {
              method: "POST",
              body: formDataToSend, // Send the FormData
            }
          );

          if (!res.ok) {
            throw new Error("Failed to upload category");
          }

          const data = await res.json();
          console.log("Category uploaded successfully", data);
        } catch (error) {
          console.error("An error occurred during the file upload:", error);
          throw error;
        }
      } else if (type === "sousPieces") {
        // Prepare form data
        const formDataToSend = new FormData();
        formDataToSend.append("Libelle_subcat", formData.Libelle_subcat);
        formDataToSend.append("Image_subcat", formData.Image_subcat); // Add the image file
        formDataToSend.append("id_cat", formData.id_cat); // Add the image file

        try {
          const res = await fetch(
            `http://localhost:4000/api/v1/subcategory/addSubCategory`,
            {
              method: "POST",
              body: formDataToSend, // Send the FormData
            }
          );

          if (!res.ok) {
            throw new Error("Failed to upload category");
          }

          const data = await res.json();
          console.log("Category uploaded successfully", data);
        } catch (error) {
          console.error("An error occurred during the file upload:", error);
          throw error;
        }
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="custom-modal" size="lg">
      <div className="modal-overlay">
        <form onSubmit={handleSubmit}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1 rounded-t-2xl bg-grayLight text-center">
              {type === "Marque" ? (
                <p>Marque</p>
              ) : type === "Modele" ? (
                <p>Modele</p>
              ) : type === "Motorisation" ? (
                <p>Motorisation</p>
              ) : type === "Pieces" ? (
                <p>Piéces</p>
              ) : type === "sousPieces" ? (
                <p>sousPiéces</p>
              ) : null}
            </ModalHeader>
            <ModalBody className="my-10">
              {type === "Marque" ? (
                <div>
                  <Input
                    type={"text"}
                    name={"Libelle_marque"}
                    placeholder={"Marque"}
                    onChange={handleChange}
                    value={formData.marque}
                  />
                </div>
              ) : type === "Modele" ? (
                <div className="space-y-6">
                  <Input
                    type={"text"}
                    name={"Libelle_modele"}
                    placeholder={"Modele"}
                    onChange={handleChange}
                    value={formData.modele}
                  />
                  <div className="flex md:flex-row w-full items-center space-x-2">
                    <select
                      className="rounded-lg text-[12.5px] w-full py-3 px-2 outline-none border-2 border-gray-200 bg-grayLight text-textColor"
                      name="id_marque"
                      onChange={handleChange}
                      value={formData.id_marque}
                    >
                      <option value="">Marque</option>
                      {marque.map((item) => (
                        <option key={item.id_marque} value={item.id_marque}>
                          {item.Libelle_marque}
                        </option>
                      ))}
                    </select>
                    <select
                      className="rounded-lg text-[12.5px] w-full py-3 px-2 outline-none border-2 border-gray-200 bg-grayLight text-textColor"
                      name="annee_modele"
                      onChange={handleChange}
                      value={formData.year}
                    >
                      <option value="">Sélectionnez une année</option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ) : type === "Motorisation" ? (
                <div className="space-y-6">
                  <Input
                    type={"text"}
                    name={"Libelle_motor"}
                    placeholder={"Motorisation"}
                    onChange={handleChange}
                    value={formData.motorisation}
                  />

                  <select
                    className="rounded-lg text-[12.5px] w-full py-3 px-2 outline-none border-2 border-gray-200 bg-grayLight text-textColor"
                    name="id_modele"
                    onChange={handleChange}
                    value={formData.id_modele}
                  >
                    <option value="">Modele</option>
                    {modele.map((item) => (
                      <option key={item.id_modele} value={item.id_modele}>
                        {item.Libelle_modele}
                      </option>
                    ))}
                  </select>
                </div>
              ) : type === "Pieces" ? (
                <div>
                  <Input
                    type={"text"}
                    name={"Libelle_cat"}
                    placeholder={"Piéce"}
                    onChange={handleChange}
                    value={formData.Libelle_cat}
                  />
                  <div className="flex flex-col items-center">
                    <div className="flex flex-row   mt-3 ">
                      {selectedImage ? (
                        <div className="">
                          <h2>Selected Image:</h2>
                          <Image
                            src={selectedImage}
                            width={70}
                            height={70}
                            alt="Selected"
                            className="border-4  rounded-md border-gray-200"
                            style={{ maxWidth: "100%" }}
                          />
                        </div>
                      ) : (
                        <div>
                          <label htmlFor="fileInput">
                            <IoMdPhotos className="rounded-full bg-grayLight border-4 p-15 border-gray-200 text-greenColor text-[70px] cursor-pointer" />
                          </label>

                          <input
                            type="file"
                            id="fileInput"
                            name="Image_cat"
                            className="hidden"
                            onChange={handleChange}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : type === "sousPieces" ? (
                <div className="space-y-6">
                  <Input
                    type={"text"}
                    name={"Libelle_subcat"}
                    placeholder={"sous Piéces"}
                    onChange={handleChange}
                    value={formData.Libelle_subcat}
                  />
                      <select
                    className="rounded-lg text-[12.5px] w-full py-3 px-2 outline-none border-2 border-gray-200 bg-grayLight text-textColor"
                    name="id_cat"
                    onChange={handleChange}
                    value={formData.id_cat}
                  >
                    <option value="">Piéces</option>
                    {category.map((item) => (
                      <option key={item.id_cat} value={item.id_cat}>
                        {item.Libelle_cat}
                      </option>
                    ))}
                  </select>
                  <div className="flex flex-col items-center">
                    <div className="flex flex-row   mt-3 ">
                      {selectedImage ? (
                        <div className="">
                          <h2>Selected Image:</h2>
                          <Image
                            src={selectedImage}
                            width={70}
                            height={70}
                            alt="Selected"
                            className="border-4  rounded-md border-gray-200"
                            style={{ maxWidth: "100%" }}
                          />
                        </div>
                      ) : (
                        <div>
                          <label htmlFor="fileInput">
                            <IoMdPhotos className="rounded-full bg-grayLight border-4 p-5 border-gray-200 text-greenColor text-[70px] cursor-pointer" />
                          </label>

                          <input
                            type="file"
                            id="fileInput"
                            name="Image_subcat"
                            className="hidden"
                            onChange={handleChange}
                          />
                        </div>
                      )}
                    </div>
                  </div>
              
                </div>
              ) : null}
              <div className="flex justify-center my-5">
                <button
                  className="bg-greenColor hover:bg-darkColor text-white p-3 rounded-md text-[13.5px]"
                  type="submit"
                >
                  Enregistrer
                </button>
              </div>
            </ModalBody>
          </ModalContent>
        </form>
      </div>
    </Modal>
  );
};

export default AddCategory;
