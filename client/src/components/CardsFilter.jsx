"use client"
import React, { useEffect, useState } from "react";
import Select from "@/components/Select";
import { ModeleByIdMarque, MotoreByIdModele, getAllMarque } from "@/app/lib/Car";
const Cards = () => {

  const [marque, setMarque] = useState([]);
  const [filter, setFilter] = useState([]);
  const [modele, setModele] = useState([]);
  const [motor, setMotor] = useState([]);

  const [OptionYear, setOptionYear] = useState("");

  const years = [];
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= 1900; year--) {
    years.push(year.toString());
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };


  useEffect(() => {
    getAllMarque().then((marque) => {
      setMarque(marque);
    });
  }, []);
  const handleYear = (event) => {
    if (filter.id_marque) {
      
   
    setOptionYear(event.target.value);
  }
  };
  useEffect(() => {
    if (filter.id_marque) {
      ModeleByIdMarque(filter.id_marque, OptionYear).then((modele) => {
        setModele(modele);
      });
    } else {
      setModele([]);
    }
 
  }, [filter.id_marque  ]);
  useEffect(()=>{
    if (filter.id_modele  ) {
      MotoreByIdModele(filter.id_modele).then((motor) => {
        setMotor(motor);
      });
    } else {
      setMotor([]);
    }
  },[filter.id_modele, OptionYear])
  return (
    <div className="max-w-md mx-auto">
      <div className="  mx-auto my-2 shadow-sm rounded-lg">
        <div className="bg-greenColor text-center text-white px-3 py-3 text-lg font-semibold rounded-t-lg">
          Sélectionnez votre véhicule
        </div>
        <div className="bg-white bg-opacity-40 text-white backdrop-filter backdrop-blur-md p-3 rounded-b-lg flex flex-col justify-center">
         
        
          <Select
            placeholder="Choisir la marque"
            name="id_marque"
            onchange={handleChange}
            options={marque.map((item) => ({
              value: item.id_marque,
              label: item.Libelle_marque,
            }))}
          />
          <Select
            placeholder="Sélectionnez une année"
            onChange={(e) => {
              handleYear(e);
            }}
            options={years.map((year) => ({ value: year, label: year }))}
          />
          <Select
            placeholder="Choisir le modele"
            name="id_modele"
            onchange={handleChange}
            options={modele.map((item) => ({
              value: item.id_modele,
              label: item.Libelle_modele,
            }))}
          />
          <Select
            placeholder="Choisir le motor"
            name="id_motor"
            onchange={handleChange}
            options={motor.map((item) => ({
              value: item.id_motor,
              label: item.Libelle_motor,
            }))}
          />
          <button className="bg-buttonColor text-white p-3 rounded-lg mt-5 w-32  mx-auto mb-5 text-[13px] ">
            Rechercher
          </button>
         
        </div>
      </div>
    </div>
  );
};
export default Cards;
