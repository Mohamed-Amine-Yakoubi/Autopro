import React, { useEffect, useState } from "react";
import Select from "@/components/Select";
import {
  ModeleByIdMarque,
  MotoreByIdModele,
  getAllMarque,
} from "@/app/lib/Car";
const CardsFilterCatalogue = ({ filter, onFilterChange }) => {
  const [marque, setMarque] = useState([]);
 
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
    onFilterChange(name, value);
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
 console.log("filterrrrrrrrrrr",filter)
  return (
    <div className="max-w-md mx-auto">
      <div className="  mx-auto my-2 shadow-sm rounded-lg">
        <div className="bg-greenColor text-center text-white px-3 py-3 text-[14px] font-semibold rounded-t-lg">
          Sélectionnez votre véhicule
        </div>
        <div className="bg-gray-200 bg-opacity-40 text-white  p-3 pb-5 rounded-b-lg flex flex-col justify-center">
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
 
        </div>
      </div>
    </div>
  );
};
export default CardsFilterCatalogue;
