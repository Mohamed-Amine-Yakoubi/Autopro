"use client"; // Ensure this is at the very top

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Input from "./Input";
import { IoMdPhotos } from "react-icons/io";
import Textarea from "./Textarea";
import Image from "next/image";

const Reclamation = ({ props }) => {
  const { data: session, status } = useSession();
  const [selectedImage, setSelectedImage] = useState("");

  const [form, setForm] = useState({
    NomPrenom_rec: "",
    Email_rec: "",
    Telephone_rec: "",
    description_rec: "",
    id_magasin: null,
    file_rec: null,
  });

  const handleInput = (e) => {
    const { name, value, files } = e.target;
    if (files) {
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
        const description_rec = form.description_rec;
        const file_rec = form.file_rec;
        const id_magasin = props;

        formData = new FormData();
        formData.append("NomPrenom_rec", NomPrenom_rec);
        formData.append("Email_rec", Email_rec);
        formData.append("Telephone_rec", Telephone_rec);
        formData.append("description_rec", description_rec);
        formData.append("id_magasin", id_magasin);
        if (file_rec) {
          formData.append("file_rec", file_rec);
        }
      } else {
        formData = new FormData();
        for (const key in form) {
          formData.append(key, form[key]);
        }
      }

      console.log("Form Data being sent:", formData);
      const res = await fetch("http://localhost:4000/api/v1/user/AddClaim", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("Success");
      } else {
        alert("Failed");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="p-6 py-8  ">
      <p className="text-[12.4px] text-center color text-gray-500    mb-5">
        Autopro vous permet de déposer une réclamation directement sur la
        plateforme. Il vous suffit de choisir le destinataire de votre
        réclamation et de remplir le formulaire ci-dessous.
      </p>
      <form onSubmit={handleContact}>
        {!session ? (
          <div>
            <div className="mt-3 space-y-1">
              <Input
                type="text"
                name="NomPrenom_rec"
                placeholder="Nom et Prenom"
                onChange={handleInput}
                value={form.NomPrenom_rec}
              />
            </div>
            <div className="mt-5 space-y-1">
              <Input
                type="text"
                name="Email_rec"
                onChange={handleInput}
                placeholder="Email"
                value={form.Email_rec}
              />
            </div>
            <div className="mt-5 space-y-1">
              <Input
                type="text"
                name="Telephone_rec"
                onChange={handleInput}
                placeholder="Téléphone"
                value={form.Telephone_rec}
              />
            </div>
          </div>
        ) : null}
        <div className="mt-5 space-y-1">
          <Textarea
            type="textarea"
            name="description_rec"
            onChange={handleInput}
            value={form.description_rec}
            placeholder="Description"
            rows={10}
          />
        </div>
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
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-greenColor text-white hover:bg-darkColor rounded-full p-2 px-7 text-[13.5px] mt-5"
          >
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
};

export default Reclamation;
