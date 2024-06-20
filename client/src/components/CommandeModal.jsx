import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
  ModalHeader,
} from "@nextui-org/react";
import "../styles/Modal.scss";
import Input from "./Input";
import { getVille } from "@/app/lib/Category";

const CommandeModal = ({ isOpen, onClose,submit, children, props, icon }) => {
  const [userAdresse, setUserAdresse] = useState({});
  const [ville, setVille] = useState([]);
  useEffect(() => {
    getVille().then((Ville) => {
      setVille(Ville);
    });
  }, []);
  const handleChangeValue = (e) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        className="    bg-white  md:mt-0 md:mb-0 mb-8 mt-8 rounded-2xl   "
        size="lg"
        icon={icon}
      >
        <div className="modal-overlay  ">
          <ModalContent className="custom-modal-content">
            <ModalHeader className="custom-modal-header flex flex-col items-center">
              Modifier votre Profile
            </ModalHeader>
            <ModalBody className="custom-modal-body flex flex-col justify-center items-center space-y-1 my-5">
              <p className="text-[12.4px] text-center color text-gray-500    mb-3">
                Pour finaliser votre commande, nous vous prions de bien vouloir
                compléter le formulaire d'adresse. Cette étape est essentielle
                pour assurer la livraison correcte de vos produits. Nous vous
                remercions de votre compréhension et de votre coopération.
              </p>
              <Input
                type={"text"}
                placeholder={"Numéro et nom de rue"}
                name={"Adresse"}
                onChange={handleChangeValue}
              />
              <select
                className="flex rounded-lg h-[43px] py-2 w-full max-w-lg bg-grayLight text-gray-400 outline-none px-3 text-[12.5px]"
                onChange={handleChangeValue}
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
                placeholder={"Code postal"}
                name={"Code_postal"}
                onChange={handleChangeValue}
              />

              <button
       onClick={submit}
       type="submit"
                className="bg-greenColor py-4  my-8 w-40 text-[13px] text-white rounded-lg"
              >
                Valider la commande
              </button>
            </ModalBody>
          </ModalContent>
        </div>
      </Modal>
    </div>
  );
};
export default CommandeModal;
