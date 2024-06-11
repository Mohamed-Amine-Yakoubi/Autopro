"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoMdPhotos } from "react-icons/io";
import { FaPlus } from "react-icons/fa";

import { getSubCategory } from "@/app/lib/SubCategory";
import { getAllCategories } from "@/app/lib/Category";
import {
  ModeleByIdMarque,
  MotoreByIdModele,
  getAllMarque,
  getAllMatter,
} from "@/app/lib/Car";

import { useSession } from "next-auth/react";
import Input from "./InputWhite";
import Textarea from "./Textarea";

const AddProduct = () => {
  const { data: session } = useSession();
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [marque, setMarque] = useState([]);
  const [modele, setModele] = useState([]);
  const [motor, setMotor] = useState([]);
  const [matiere, setMatiere] = useState([]);

  const [OptionCategory, setOptionCategory] = useState("");
  const [OptionModele, setOptionModele] = useState("");
  const [OptionMarque, setOptionMarque] = useState("");
  const [OptionYear, setOptionYear] = useState("");
  const [OptionMotor, setOptionMotor] = useState("");
  const [OptionMatiere, setOptionMatiere] = useState("");
  const [selectedImage, setSelectedImage] = useState([]);
  const HandleMatiere = (event) => {
    setOptionMatiere(event.target.value);
  };

  const HandleCategory = (event) => {
    setOptionCategory(event.target.value);
  };

  const HandleMarque = (event) => {
    setOptionMarque(event.target.value);

    setOptionModele("");
    setOptionMotor("");
    setOptionYear("");
  };

  const HandleModele = (event) => {
    setOptionModele(event.target.value);
    setOptionMotor("");
  };

  const HandleMotor = (event) => {
    setOptionMotor(event.target.value);
  };

  // Generate a list of years from 1900 to the current year
  const years = [];
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= 1900; year--) {
    years.push(year.toString());
  }

  const handleYear = (event) => {
    setOptionYear(event.target.value);
    setOptionModele("");
    setOptionMotor("");
  };

  useEffect(() => {
    getAllCategories().then((category) => {
      setCategory(category);
    });
    getAllMatter().then((matiere) => {
      setMatiere(matiere);
    });

    if (OptionCategory) {
      getSubCategory(OptionCategory).then((SubCat) => {
        setSubCategory(SubCat);
      });
    }

    getAllMarque().then((marque) => {
      setMarque(marque);
    });

    if (OptionMarque && OptionYear) {
      ModeleByIdMarque(OptionMarque, OptionYear)
        .then((modele) => {
          setModele(modele);
        })
        .catch((error) => {
          console.error("Error fetching models:", error);
        });
    } else {
      setModele([]);
    }
    if (OptionModele && OptionYear) {
      MotoreByIdModele(OptionModele)
        .then((motor) => {
          setMotor(motor);
        })
        .catch((error) => {
          console.error("Error fetching motors:", error);
        });
    } else {
      setMotor([]);
    }
  }, [OptionCategory, OptionYear, OptionMarque, OptionModele]);

  const [formData, setFormData] = useState({
    Libelle_prod: "",
    Caracteristiques_prod: "",
    prix_prod: "",
    Stock_prod: "",
    Reference_prod: "",
    Image_prod: null,
    id_subcat: 0,
    id_magasin: 28,
    id_cat: OptionCategory,
    id_marque: OptionMarque,
    id_modele: OptionModele,
    id_motor: OptionMotor,
    id_mat: OptionMatiere,
    createdBy: session.user.id,
  });
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData({
        ...formData,
        [name]: files, // Store the files in the state
      });
      setSelectedImage([...files].map((file) => URL.createObjectURL(file)));
    } else {
      const parsedValue =
        name === "id_mat" ||
        name === "id_marque" ||
        name === "id_modele" ||
        name === "id_motor" ||
        name === "id_cat" ||
        name === "id_subcat" ||
        name === "prix_prod" ||
        name === "Stock_prod"
          ? parseInt(value)
          : value;

      setFormData({ ...formData, [name]: parsedValue });
    }
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formData.id_marque = parseInt(formData.id_marque);
    formData.id_mat = parseInt(formData.id_mat);
    formData.id_modele = parseInt(formData.id_modele);
    formData.id_motor = parseInt(formData.id_motor);
    formData.id_subcat = parseInt(formData.id_subcat);
    for (const key in formData) {
      if (key === "Image_prod" && formData[key] instanceof FileList) {
        Array.from(formData[key]).forEach((file) => {
          formDataToSend.append(key, file);
        });
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      const res = await fetch(
        `http://localhost:4000/api/v1/product/AddProducts`,
        {
          method: "POST",
          body: formDataToSend, // Send FormData directly
        }
      );

      if (!res.ok) {
        throw new Error("Failed to add store");
      }else {
        location.reload();
      }
    } catch (error) {
      alert("Failed to add store");
    }
  };

  return (
    <div className="py-5 px-4  rounded-lg overflow-y-auto bg-grayLight shadow-lg">
      <form onSubmit={HandleSubmit}>
        <div className=" flex md:flex-row flex-col md:items-center md:space-y-0 space-y-4 md:space-x-10 space-x-0 md:justify-around">
          <div className="md:w-1/2 w-full space-y-8 flex flex-col justify-center items-center">
            <div className="relative  ">
              <div className="flex flex-col items-center">
                <div>
                  <label htmlFor="fileInput">
                    <IoMdPhotos className="rounded-full bg-white border-4 p-10 border-gray-200 text-greenColor text-[170px] cursor-pointer" />
                  </label>

                  <input
                    type="file"
                    id="fileInput"
                    name="Image_prod"
                    className="hidden"
                    onChange={handleChange}
                    multiple
                  />
                </div>
                <div className="flex flex-row space-x-2 mt-3 ">
                  {selectedImage.map((item) => (
                    <Image
                      key={item}
                      src={item}
                      width={70}
                      height={70}
                      alt="Selected"
                      className="border-4  rounded-md border-gray-200"
                      style={{ maxWidth: "100%" }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className=" space-y-2  w-full">
              <select
                className="rounded-lg text-[12.5px] w-full py-3 px-2 outline-none border-2 border-gray-200 bg-white text-textColor"
                defaultValue=""
                name="id_mat"
                onChange={(e) => {
                  handleChange(e);
                  HandleMatiere(e);
                }}
              >
                <option value="" disabled>
                  Matiere
                </option>
                {matiere.map((item) => (
                  <option key={item.id_mat} value={item.id_mat}>
                    {item.Libelle_mat}
                  </option>
                ))}
              </select>
              <div className="flex md:flex-row w-full items-center mb-2 space-x-2">
                <select
                  className="rounded-lg text-[12.5px] w-full py-3 px-2 outline-none border-2 border-gray-200 bg-white text-textColor"
                  defaultValue=""
                  onChange={(e) => {
                    handleChange(e);
                    HandleMarque(e);
                  }}
                  name="id_marque"
                >
                  <option value="" disabled>
                    Marque
                  </option>
                  {marque.map((item) => (
                    <option key={item.id_marque} value={item.id_marque}>
                      {item.Libelle_marque}
                    </option>
                  ))}
                </select>

                <select
                  className="rounded-lg text-[12.5px] w-full py-3 px-2 outline-none border-2 border-gray-200 bg-white text-textColor"
                  defaultValue=""
                  onChange={(e) => {
                    handleYear(e);
                  }}
                >
                  <option value="">Select a year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex md:flex-row w-full items-center space-x-2">
                <select
                  className="rounded-lg text-[12.5px] w-full py-3 px-2 outline-none border-2 border-gray-200 bg-white text-textColor"
                  defaultValue=""
                  name="id_modele"
                  onChange={(e) => {
                    handleChange(e);
                    HandleModele(e);
                  }}
                >
                  <option value="">Modele</option>
                  {modele.map((item) => (
                    <option key={item.id_modele} value={item.id_modele}>
                      {item.Libelle_modele}
                    </option>
                  ))}
                </select>

                <select
                  className="rounded-lg text-[12.5px] w-full py-3 px-2 outline-none border-2 border-gray-200 bg-white text-textColor"
                  defaultValue=""
                  name="id_motor"
                  onChange={(e) => {
                    handleChange(e);
                    HandleMotor(e);
                  }}
                >
                  <option value="">motor</option>
                  {motor.map((item) => (
                    <option key={item.id_motor} value={item.id_motor}>
                      {item.Libelle_motor}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 w-full flex flex-col  items-center space-y-3 ">
            <Input
              type={"text"}
              name={"Libelle_prod"}
              placeholder={"Libelle de produit"}
              onChange={handleChange}
              value={formData.Libelle_prod}
            />
            <div className="flex flex-row w-full  space-x-4">
              <div className="flex-1 w-full ">
                <Input
                  type={"text"}
                  name={"prix_prod"}
                  placeholder={"Prix"}
                  value={formData.prix_prod}
                  onChange={handleChange}
                />
              </div>
              <div className="flex-1 w-full ">
                <Input
                  type={"text"}
                  name={"Stock_prod"}
                  placeholder={"Stock"}
                  value={formData.Stock_prod}
                  onChange={handleChange}
                />
              </div>
            </div>
            <Input
              type={"text"}
              name={"Reference_prod"}
              placeholder={"Référence"}
              value={formData.Reference_prod}
              onChange={handleChange}
            />
            <div className="flex md:flex-row w-full items-center mb-2 space-x-2">
              <select
                className="rounded-lg text-[12.5px] py-3 px-2 w-full outline-none border-2 border-gray-200 bg-white text-textColor"
                defaultValue=""
                name="id_cat"
                onChange={(e) => {
                  handleChange(e);
                  HandleCategory(e);
                }}
              >
                <option value="" disabled>
                  Catégories
                </option>
                {category.map((item) => (
                  <option key={item.id_cat} value={item.id_cat}>
                    {item.Libelle_cat}
                  </option>
                ))}
              </select>

              <select
                className="rounded-lg text-[12.5px] py-3 px-2 w-full outline-none border-2 border-gray-200 bg-white text-textColor"
                defaultValue=""
                name="id_subcat"
                onChange={handleChange}
              >
                <option value="">sous-Catégories</option>
                {subcategory.map((item) => (
                  <option key={item.id_subcat} value={item.id_subcat}>
                    {item.Libelle_subcat}
                  </option>
                ))}
              </select>
            </div>
            <div className=" w-full">
              <Textarea
                type={"textarea"}
                name={"Caracteristiques_prod"}
                rows="6"
                value={formData.Caracteristiques_prod}
                placeholder={"Caractéristiques de produit"}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center my-5">
          <button className="bg-greenColor hover:bg-darkColor text-white p-3 rounded-md text-sm">
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
