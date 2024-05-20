import React from "react";
import Select from "@/components/Select";
const Cards = () => {
  return (
    <div className="max-w-md mx-auto">
      <div className="  mx-auto my-2 shadow-sm rounded-lg">
        <div className="bg-greenColor text-center text-white px-3 py-3 text-lg font-semibold rounded-t-lg">
          Sélectionnez votre véhicule
        </div>
        <div className="bg-white bg-opacity-40 text-white backdrop-filter backdrop-blur-md p-3 rounded-b-lg flex flex-col justify-center">
         
          <Select placeholder="Choisir la marque" option="option1" />
          <Select placeholder="Année" option="option1" />
          <Select placeholder="Choisir le modéle" option="option1" />
          <Select placeholder="Choisir la motorisation" option="option1" />
          <button className="bg-buttonColor text-white p-3 rounded-lg mt-5 w-32  mx-auto mb-5 ">
            Rechercher
          </button>
        </div>
      </div>
    </div>
  );
};
export default Cards;
