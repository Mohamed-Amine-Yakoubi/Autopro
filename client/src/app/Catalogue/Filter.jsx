"use client";
import React, { useEffect, useState } from "react";

import { getAllCategories, getVille } from "../lib/Category";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { getAllMatter } from "../lib/Car";
import { getSubCategoryByIdCat } from "../lib/SubCategory";

export const Filter = ({ filter, onFilterChange }) => {
  const [categories, setCategories] = useState([]);
  const [ville, setVille] = useState([]);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [subcategory, setSubCategory] = useState([]);
  const [matiere, setMatiere] = useState([]);

  useEffect(() => {
    getVille().then((Ville) => {
      setVille(Ville);
    });
    getAllCategories().then((categories) => {
      setCategories(categories);
    });
    getAllMatter().then((matiere) => {
      setMatiere(matiere);
    });
  }, []);

  useEffect(() => {
    if (filter.id_cat) {
      console.log("Selected Category ID:", filter.id_cat); // Debugging purpose
      getSubCategoryByIdCat(filter.id_cat).then((categories) => {
        setSubCategory(categories);
      });
    } else {
      setSubCategory([]);
    }
  }, [filter.id_cat]); // Dependency on filter.id_cat to re-run when it changes

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? (checked ? value : null) : value;
    onFilterChange(name, newValue);
    console.log(name, newValue); // Debugging purpose
  };

  const handleViewMoreCategories = () => {
    setShowAllCategories(true);
  };
  const handleViewLessCategories = () => {
    setShowAllCategories(false);
  };

  return (
    <div className="overflow-y-auto">
      <style jsx>{`
        .range-input::-webkit-slider-thumb {
          appearance: none;
          width: 15px;
          height: 15px;
          background: #4BAF4F; /* Change this to your desired color */
          border-radius: 50%;
          cursor: pointer;
        }

        .range-input::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: red; /* Change this to your desired color */
          border-radius: 50%;
          cursor: pointer;
        }
      `}</style>
      <hr className="my-6" />
      <h1 className="font-semibold text-textColor mb-5 text-[14px]">
        Piéces
      </h1>
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
                  checked={Number(filter.id_cat) === cat.id_cat} // Ensure comparison is correct
                />{" "}
                {cat.Libelle_cat}
              </label>
              {Number(filter.id_cat) === cat.id_cat && (
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
                          checked={Number(filter.id_subcat) === item.id_subcat} // Ensure correct comparison
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
      <hr className="my-6" />
      <div>
        <h1 className="font-semibold text-textColor  mb-5 text-[14px]">
          Ville
        </h1>
        <select
          className="flex rounded-md h-9 p-2 w-full max-w-lg outline-none bg-grayLight text-textColor mt-4 text-[13px]"
          placeholder="Choisir la ville"
          name="id_ville"
          value={filter.id_ville || ""}
          onChange={handleChange}
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
      <hr className="my-6" />
      <div>
        <h1 className="font-semibold text-textColor mb-5 text-[14px]">
          Matiere
        </h1>
        <select
          className="flex rounded-md h-9 p-2 w-full max-w-lg outline-none bg-grayLight text-textColor mt-4 text-[13px]"
          placeholder="Choisir la matière"
          name="id_mat"
          value={filter.id_mat || ""}
          onChange={handleChange}
        >
          <option value="" className="text-[12.5px]" disabled>
            Matiere
          </option>
          {matiere.map((item) => (
            <option
              key={item.id_mat}
              value={item.id_mat}
              className="border-none outline-none text-[12.5px]"
            >
              {item.Libelle_mat}
            </option>
          ))}
        </select>
      </div>
      <hr className="my-6" />
      <div>
        <h1 className="font-semibold text-textColor mb-5 text-[14px]">Prix</h1>
        <div className="relative mb-6">
          <label className="sr-only">Labels range</label>
          <input
            id="labels-range-input"
            type="range"
            min="0"
            max="5000"
            name="price"
            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-textColor range-input"
            value={filter.price || 5000}
            onChange={handleChange}
          />
          <span className="text-gray-500 text-[13px] dark:text-gray-400 absolute start-0 -bottom-6">
            {0} TND
          </span>
          <span className="text-gray-500 text-[13px] dark:text-gray-400 absolute end-0 -bottom-6">
            {filter.price || 5000} TND
          </span>
        </div>
      </div>
    </div>
  );
};
