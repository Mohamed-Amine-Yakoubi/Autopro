"use client";
import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalBody, ModalHeader } from "@nextui-org/react";
import "../styles/Modal.scss";
import { Ellipsis } from "react-css-spinners";

import "../styles/stepper.scss";
import { useSession } from "next-auth/react";
import Textarea from "./Textarea";
import Image from "next/image";
import { IoMdPhotos } from "react-icons/io";
import { getAllStore } from "@/app/lib/Magasin";
import { toast, ToastContainer } from "react-toastify";

const ModalClaim = ({ isOpen, onClose, children }) => {
  const { data: session, status } = useSession();
  const [selectedImage, setSelectedImage] = useState("");
  const [store, setStore] = useState([]);
  useEffect(() => {
    getAllStore().then((itemstore) => {
      setStore(itemstore);
    });
  }, []);

  const [form, setForm] = useState({
    id_user: "",

    id_magasin: "",
    description_rec: "",
    file_rec: null,
  });

  const handleInput = (e) => {
    const { name, value, files } = e.target;
    if (name === "id_magasin") {
      // Handle the id_magasin field specifically
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value === "admin" ? 0 : value,
      }));
    } else if (files) {
      const file = files[0];
      setForm((prevForm) => ({
        ...prevForm,
        [name]: file,
      }));
      setSelectedImage(URL.createObjectURL(file));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const handleContact = async (e) => {
    e.preventDefault();
    try {
      let formData;

      if (session) {
        const NomPrenom_rec = session.user.Nom_user;
        const Email_rec = session.user.Email_user;
        const Telephone_rec = session.user.Telephone_user;
        const id_user = session.user.id_user;
        const id_magasin = form.id_magasin;
        const description_rec = form.description_rec;
        const Profil_user =form.Profil_user || "Client";
        const file_rec = form.file_rec;

        formData = new FormData();
        formData.append("id_user", id_user);
        formData.append("id_magasin", id_magasin);
        formData.append("Profil_user", Profil_user);
        formData.append("NomPrenom_rec", NomPrenom_rec);
        formData.append("Email_rec", Email_rec);
        formData.append("Telephone_rec", Telephone_rec);

        formData.append("description_rec", description_rec);
        if (file_rec) {
          formData.append("file_rec", file_rec);
        }
      } else {
        formData = new FormData();
        for (const key in form) {
          formData.append(key, form[key]);
        }
      }

      const res = await fetch("http://localhost:4000/api/v1/user/AddClaim", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        toast.success(
          `Félicitations ${session.user.Prenom_user} ${session.user.Nom_user} ! Votre réclamation a été soumise avec succès et sera traitée dans les plus brefs délais`
        );
        setForm({
          id_user: session.user.id_user,
          id_magasin: "",
          description_rec: "",
          file_rec: null,
        });
        setSelectedImage("");
      } else {
        toast.error(
          "Votre réclamation n'a pas pu être soumise. Veuillez réessayer ou contacter notre service client"
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="custom-modal-lg   "
      size="lg"
    >
<ToastContainer
  position="top-center"
  autoClose={2500}
  toastStyle={{    width: "50%", width: "700px" ,right:'50%',    }}
/>
      <div className="modal-overlay">
        <div>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1 rounded-t-2xl bg-grayLight text-center">
              Réclamations
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleContact} className="my-7">
                <p className="text-[12.4px] text-center color text-gray-500    mb-5">
                  Autopro vous permet de déposer une réclamation directement sur
                  la plateforme. Il vous suffit de choisir le destinataire de
                  votre réclamation et de remplir le formulaire ci-dessous.
                </p>
                <select
                  className="rounded-lg text-[12.5px] w-full py-3 px-2 outline-none border-2 border-gray-200 bg-grayLight text-textColor"
                  defaultValue=""
                  name="id_magasin"
                  onChange={handleInput}
                >
                  <option value="" disabled>
                    Veuillez sélectionner le destinataire
                  </option>
                  <option value="admin">Administrateur</option>

                  {store.map((item) => (
                    <option key={item.id_magasin} value={item.id_magasin}>
                      {item.Libelle_magasin}
                    </option>
                  ))}
                </select>
                <div className="mt-3 space-y-1">
                  <Textarea
                    type="textarea"
                    name="description_rec"
                    onChange={handleInput}
                    value={form.description_rec}
                    placeholder="Description"
                    rows={8}
                  />
                </div>
                {session.user?.Profil_user === "Fournisseur" ? (
                  <select
                    className="rounded-lg text-[12.5px] w-full mt-2 py-3 px-2 outline-none border-2 border-gray-200 bg-grayLight text-textColor"
                    defaultValue=""
                    name="Profil_user"
                    onChange={handleInput}
                  >
                    <option value="" disabled>Choisissez un profil pour la réclamation</option>
                    <option value="Fournisseur">Fournisseur</option>
                    <option value="Client">Client</option>
                  </select>
                ) : null}
                <div className="flex flex-col items-center mt-5">
                  {selectedImage ? (
                    <div className="flex flex-row space-x-2 mt-3">
                      <Image
                        src={selectedImage}
                        width={70}
                        height={70}
                        alt="Selected"
                        className="border-4 rounded-md border-gray-200"
                        style={{ maxWidth: "100%" }}
                      />
                    </div>
                  ) : (
                    <div className="rounded-md  border-2  border-gray-200  bg-grayLight py-4 px-10">
                      <label htmlFor="fileInput">
                        <IoMdPhotos className="  text-greenColor text-[50px] cursor-pointer" />
                      </label>

                      <input
                        type="file"
                        id="fileInput"
                        name="file_rec"
                        className="hidden"
                        onChange={handleInput}
                      />
                    </div>
                  )}
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-greenColor text-white hover:bg-darkColor rounded-full p-2 px-7 text-[13.5px] mt-5"
                  >
                    Envoyer
                  </button>
                </div>
              </form>
            </ModalBody>
          </ModalContent>
        </div>
      </div>
    </Modal>
  );
};

export default ModalClaim;