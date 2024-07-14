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
import { getSpecProduct } from "@/app/lib/Product";
import { useRouter } from 'next/navigation';
import Textarea from "@/components/Textarea";

const UpdateProduct = (props) => {
  const { data: session } = useSession();
  const idprod = props.params.UpdateProduct;
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [marque, setMarque] = useState([]);

  const [product, setProduct] = useState([]);
  const [modele, setModele] = useState([]);
  const [motor, setMotor] = useState([]);
  const [matiere, setMatiere] = useState([]);
  const [OptionYear, setOptionYear] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const router = useRouter();
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);  
    
  };
  

  // Generate a list of years from 1900 to the current year
  const years = [];
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= 1900; year--) {
    years.push(year.toString());
  }
  const handleYear = (event) => {
    setOptionYear(event.target.value);
  };

  useEffect(() => {
    getSpecProduct(idprod).then((product) => {
        
      setProduct(product);
    });

    getAllCategories().then((category) => {
      setCategory(category);
    });
    getAllMarque().then((marque) => {
  
      setMarque(marque);
    });
    getAllMatter().then((matiere) => {
      setMatiere(matiere);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (product.id_marque ) {
      ModeleByIdMarque(product.id_marque, OptionYear).then((modele) => {
        setModele(modele);
      });
    }else {
        setModele([]);
      }
  }, [product.id_marque, OptionYear]);

  useEffect(() => {
    // Fetch motor based on selected modele
    if (product.id_modele) {
      MotoreByIdModele(product.id_modele).then((motor) => {
        setMotor(motor);
      });
    }else {
        setMotor([]);
      }
  }, [product.id_modele]);

 
  useEffect(() => {
    // Fetch motor based on selected modele
    if (product.id_cat) {
        getSubCategory(product.id_cat).then((SubCat) => {
          setSubCategory(SubCat);
        });
      }
  }, [product.id_cat]);

  const imageProd = product && product.Image_prod ? product.Image_prod.split(",") : [];
 


  const handleSubmit = async (e) => {
    e.preventDefault();
 
    const formData = new FormData();
    if (imageFile) {
      formData.append("Image_prod", imageFile); // Append the image file if it exists
    }
    Object.keys(product).forEach((key) => {
      formData.append(key, product[key]);
    });

    try {
      const res = await fetch(`http://localhost:4000/api/v1/product/UpdateProduct/${idprod}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to update product");
      }

      const result = await res.json();

      if (result) {
        location.reload();
      }  
    } catch (error) {
      console.error("Failed to update store:", error.message);
      alert("Failed to update store");
    }
  };
  console.log(product)
  return (
    <div className="  p-10 shadow-lg rounded-lg overflow-hidden bg-grayLight ">
      <form onSubmit={handleSubmit}>
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
                    onChange={handleImageChange}
                    multiple
                  />
                </div>
                <div className="flex flex-row md:space-x-2 mt-3 flex-wrap ">
                {imageProd.map((url, index) => (
                    <Image
                    key={index}
                      src={url}
                      alt={`Image ${index + 1}`}
                      width={70}
                      height={70}
                 
                      className="border-4  rounded-md border-gray-200"
                      style={{ maxWidth: "100%" }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className=" space-y-2  w-full">
              <select
                className="rounded-lg text-[13px] w-full py-3 px-2 outline-none border-2 border-gray-200 bg-white text-textColor"
                value={product.id_mat}
                name="id_mat"
                onChange={handleChange}
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
                  className="rounded-lg text-[13px] w-full py-3 px-2 outline-none border-2 border-gray-200 bg-white text-textColor"
                 value={product.id_marque}
                  onChange={handleChange}
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
                  className="rounded-lg text-[13px] w-full py-3 px-2 outline-none border-2 border-gray-200 bg-white text-textColor"
       
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
                  className="rounded-lg text-[13px] w-full py-3 px-2 outline-none border-2 border-gray-200 bg-white text-textColor"
                 value={product.id_modele}
                  name="id_modele"
                  onChange={handleChange}
                >
                  <option value="">Modele</option>
                  {modele.map((item) => (
                    <option key={item.id_modele} value={item.id_modele}>
                      {item.Libelle_modele}
                    </option>
                  ))}
                </select>

                <select
                  className="rounded-lg text-[13px] w-full py-3 px-2 outline-none border-2 border-gray-200 bg-white text-textColor"
                  value={product.id_motor}
                  name="id_motor"
                  onChange={handleChange}
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
            <input
              type="text"
              name="Libelle_prod"
              className="outline-none pl-3    w-full border-2 border-gray-200 py-2  bg-white text-[13px] rounded-md"
              placeholder="Libelle de produit"
              value={product.Libelle_prod}
              onChange={handleChange}
            />
            <div className="flex flex-row w-full space-x-4">
              <div className="flex-1 w-full  ">
                <input
                  type="text"
                  name="prix_prod"
                  placeholder="Prix"
                  value={product.prix_prod}
                  className="outline-none pl-3    w-full border-2 border-gray-200 py-2  bg-white text-[13px] rounded-md"
                  onChange={handleChange}
                />
              </div>
              <div className="flex-1 w-full  ">
                <input
                  type="text"
                  name="Stock_prod"
                  placeholder="Stock"
                  value={product.Stock_prod}
                  className="outline-none pl-3    w-full border-2 border-gray-200 py-2  bg-white text-[13px] rounded-md"
                  onChange={handleChange}
                />
              </div>
            </div>
            <input
              type="text"
              className="outline-none   pl-3 w-full border-2 border-gray-200 py-2  bg-white text-[13px] rounded-md"
              name="Reference_prod"
              placeholder="Référence"
              value={product.Reference_prod}
              onChange={handleChange}
            />
            <div className="flex md:flex-row w-full items-center mb-2 space-x-2">
              <select
                className="rounded-lg text-[13px] py-3 px-2 w-full outline-none border-2 border-gray-200 bg-white text-textColor"
                value={product.id_cat}
                name="id_cat"
                onChange={handleChange}
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
                className="rounded-lg text-[13px] py-3 px-2 w-full outline-none border-2 border-gray-200 bg-white text-textColor"
                value={product.id_subcat}
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
                value={product.Caracteristiques_prod}
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

export default UpdateProduct;
