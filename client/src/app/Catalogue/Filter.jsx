"use client";
import React, { useEffect, useState } from "react";
import CardsFilterCatalogue from "@/components/CardsFilterCatalogue";
import { getAllCategories, getVille } from "../lib/Category";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";

export const Filter = () => {
  const [categories, setCategories] = useState([]);
  const [ville, setVille] = useState([]);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const handleViewMoreCategories = () => {
    setShowAllCategories(true);
  };
  const handleViewLessCategories = () => {
    setShowAllCategories(false);
  };
  // Ville
  useEffect(() => {
    getVille().then((Ville) => {
      setVille(Ville);
    });
  }, []);
  // categories
  useEffect(() => {
    getAllCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);
  return (
    <div className="   ">
      <CardsFilterCatalogue />
      <hr className="mt-8 mb-8" />
      {/* checkobx */}
      <h1 className="font-bold mb-5">Catégories</h1>{" "}
      <div className="bg-grayLight rounded-md pt-4 pb-4">
        {categories
          .slice(0, showAllCategories ? categories.length : 3)
          .map((cat) => (
            <div key={cat.id_cat} className="mt-2 mx-5">
              <label className="text-[14px]">
                <input
                  type="checkbox"
                  className="mr-2  "
                  style={{ width: "13px", height: "13px" , border: "none" }}
                />{" "}
                {cat.Libelle_cat}
              </label>
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
        <h1 className="font-bold mb-5">Ville</h1>

        <select
          className="flex rounded-md h-9 p-2 w-full max-w-lg outline-none  bg-grayLight text-textColor mt-4 text-[14px]"
          placeholder="Choisir la marque"
        >
          {ville.map((item) => (
            <option
              key={item.id_ville}
              value={item.id_ville}
              className="border-none outline-none"
            >
              {item.Libelle_ville}
            </option>
          ))}
        </select>
      </div>
      <hr className="mt-8 mb-8" />
      {/* prix */}
      <div>
        <h1 className="font-bold mb-5">Prix</h1>
        <div className="relative mb-6">
          <label className="sr-only">Labels range</label>
          <input
            id="labels-range-input"
            type="range"
            min="100"
            max="1500"
            className="w-full h-2   rounded-lg appearance-none cursor-pointer  bg-greenColor  "
          />
          <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
            100 TND
          </span>

          <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">
            1500 TND
          </span>
        </div>{" "}
      </div>
    </div>
  );
};
