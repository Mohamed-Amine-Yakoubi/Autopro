"use client";
import React, { useEffect, useState } from "react";
import CardsFilterCatalogue from "@/components/CardsFilterCatalogue";
import { getAllCategories, getVille } from "../lib/Category";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { getAllMarque, getAllMatter } from "../lib/Car";
import { getSubCategory } from "../lib/SubCategory";

export const Filter = () => {
  const [categories, setCategories] = useState([]);
  const [ville, setVille] = useState([]);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [filter, setFilter] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const [subcategory, setSubCategory] = useState([]);
  const [marque, setMarque] = useState([]);
  const [modele, setModele] = useState([]);
  const [motor, setMotor] = useState([]);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [minPrice, setMinPrice] = useState(0);
  const [matiere, setMatiere] = useState([]);
  const [categorySelected, setCategorySelected] = useState(false);
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: checked ? value : "",
    }));
    if (name === "id_cat") {
      setSelectedCategoryId(checked ? value : null); // Set the category ID if checked, otherwise reset to null
      setCategorySelected(checked); // Set categorySelected based on whether the checkbox is checked
    }
    
  };

  const handleViewMoreCategories = () => {
    setShowAllCategories(true);
  };
  const handleViewLessCategories = () => {
    setShowAllCategories(false);
  };

  useEffect(() => {
    getVille().then((Ville) => {
      setVille(Ville);
    });

    getAllCategories().then((categories) => {
      setCategories(categories);
    });
    if (filter.id_cat) {
      getSubCategory(filter.id_cat).then((categories) => {
        setSubCategory(categories);
      });
    } else {
      setSubCategory([]);
      setCategorySelected(false);
    }
    getAllMatter().then((matiere) => {
      setMatiere(matiere);
    });
  }, [filter.id_cat]);
  // categories
  console.log("subcat,", subcategory);
  console.log("selected,", selectedCategoryId);
  return (
    <div className=" overflow-y-auto  ">
      <CardsFilterCatalogue />
      <hr className="mt-8 mb-8" />
      {/* checkobx */}
      <h1 className="font-bold mb-5 text-[14px]  ">Catégories</h1>{" "}
      <div className="bg-grayLight rounded-md pt-4 pb-4">
        {categories
          .slice(0, showAllCategories ? categories.length : 3)
          .map((cat) => (
            <div key={cat.id_cat} className="mt-2 mx-5">
              <label className="text-[12.5px]">
                <input
                  type="checkbox"
                  className="mr-2"
                  style={{ width: "13px", height: "13px", border: "none" }}
                  onChange={handleChange}
                  value={cat.id_cat}
                  name="id_cat"
                />{" "}
                {cat.Libelle_cat}
              </label>
              {/* Only show subcategories if the category is selected */}
              {categorySelected === true &&
                selectedCategoryId === String(cat.id_cat) && (
                  <div>
                    {subcategory.map((item) => (
                      <div key={item.id_subcat} className="mt-2 mx-5">
                        <label className="text-[12.5px]">
                          <input
                            type="checkbox"
                            className="mr-2"
                            style={{
                              width: "13px",
                              height: "13px",
                              border: "none",
                            }}
                            onChange={handleChange}
                            value={item.id_subcat}
                            name="id_subcat"
                          />{" "}
                          {item.Libelle_subcat}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
            </div>
          ))}
        <div className="flex justify-center mt-3">
          {!showAllCategories ? (
            <button
              onClick={handleViewMoreCategories}
              className="text-gray-700 font-bold hover:text-greenColor text-[15px]"
            >
              <TiArrowSortedDown className="text-[25px]" />
            </button>
          ) : (
            categories.length > 3 && (
              <button
                onClick={handleViewLessCategories}
                className="text-gray-700 font-bold hover:text-greenColor text-[15px]"
              >
                <TiArrowSortedUp className="text-[25px]" />
              </button>
            )
          )}
        </div>
      </div>
      <hr className="mt-8 mb-8" />
      {/* ville */}
      <div>
        <h1 className="font-bold mb-5 text-[14px]">Ville</h1>

        <select
          className="flex rounded-md h-9 p-2 w-full max-w-lg outline-none  bg-grayLight text-textColor mt-4 text-[14px]"
          placeholder="Choisir la marque"
          name="id_ville"
        >
          <option value="" className="text-[12.5px]" disabled>
            Votre ville
          </option>
          {ville.map((item) => (
            <option
              key={item.id_ville}
              value={item.id_ville}
              className="border-none outline-none text-[12.5px]"
            >
              {item.Libelle_ville}
            </option>
          ))}
        </select>
      </div>
      {/* Matiere */}
      <hr className="mt-8 mb-8" />
      <div>
        <h1 className="font-bold mb-5 text-[14px]">Matiere</h1>

        <select
          className="flex rounded-md h-9 p-2 w-full max-w-lg outline-none  bg-grayLight text-textColor mt-4 text-[14px]"
          placeholder="Choisir la marque"
        >
          <option value="" className="text-[12.5px]" disabled>
            Matiere
          </option>

          {matiere.map((item) => (
            <option
              key={item.id_mat}
              value={item.id_mat}
              className="border-none outline-none text-[12.5px] "
            >
              {item.Libelle_mat}
            </option>
          ))}
        </select>
      </div>
      <hr className="mt-8 mb-8" />
      {/* prix */}
      <div>
        <h1 className="font-bold mb-5 text-[15px]">Prix</h1>
        <div className="relative mb-6">
          <label className="sr-only">Labels range</label>
          <input
            id="labels-range-input"
            type="range"
            min="100"
            max="1500"
             name="Price"
            className="w-full h-2   rounded-lg appearance-none cursor-pointer  bg-greenColor  "
          />
          
          <span   className=" text-gray-500 text-[13px] dark:text-gray-400 absolute start-0 -bottom-6">
            {minPrice} TND
          </span>

          <span name="maxPrice" className=" text-gray-500 text-[13px] dark:text-gray-400 absolute end-0 -bottom-6">
            {maxPrice} TND
          </span>
        </div>{" "}
      </div>
    </div>
  );
};
