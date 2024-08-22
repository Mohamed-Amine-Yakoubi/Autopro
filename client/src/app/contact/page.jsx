/* eslint-disable react/no-unescaped-entities */
"use client";
import Header from "@/components/Header";
import "../globals.scss";
import Input from "@/components/Input";
import { FaPhoneAlt } from "react-icons/fa";
import piece from "../../public/images/piece.png";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosMail, IoMdPhotos } from "react-icons/io";
import Textarea from "@/components/Textarea";
import { useSession } from "next-auth/react";
import { useState } from "react";

const Contact = () => {
  const { data: session, status } = useSession();
  const [selectedImage, setSelectedImage] = useState("");

  const [form, setForm] = useState({
    NomPrenom_rec: "",
    Email_rec: "",
    Telephone_rec: "",
    description_rec: "",
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

        formData = new FormData();
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
    <div className="mb-28">
      {/* section 1 */}
      <div>
        <Header Title={"Contactez-nous"} />
      </div>
      {/* section 2 */}

      <div className="md:w-1/1 flex md:flex-row flex-col mt-8 md:justify-center items-center mx-auto md:space-x-20">
        <div className="md:w-1/3">
          <h1 className="title md:text-start text-center text-[16px]">
            Informations de Contact
          </h1>
          <div className="mx-auto mt-4">
            <p className="text md:text-start text-center mt-2 flex font-poppins">
              <span>
                <FaLocationDot className="text-greenColor text-lg mx-2" />
              </span>
              <span className="font-bold text-darkColor mr-2">Adresse :</span>{" "}
              Ariana, 14 rue ons
            </p>
            <p className="text md:text-start text-center mt-2 flex font-poppins">
              <span>
                <FaPhoneAlt className="text-greenColor text-lg mx-2" />
              </span>
              <span className="font-bold text-darkColor mr-2">Téléphone :</span>
              +216 20166505
            </p>
            <p className="text md:text-start text-center mt-2 flex font-poppins">
              <span>
                <IoIosMail className="text-greenColor text-lg mx-2" />
              </span>
              <span className="font-bold text-darkColor mr-2">Email :</span>
              Autopro@gmail.com
            </p>
          </div>
        </div>
        <div className="md:w-1/3 mx-8">
          <h1 className="title md:text-start text-center text-[16px]">
            Nous sommes basés en Tunisie
          </h1>
          <div className="mx-auto mt-4">
            <p className="text md:text-start text-center font-poppins">
              Vous pouvez nous contacter en utilisant le formulaire de contact
              ci-dessous. Si vous avez quelque chose à nous dire sur un problème
              ou quelque chose que vous n'aimez pas sur notre site Web,
              faites-le nous savoir et nous le réglerons dès que possible.
            </p>
          </div>
        </div>
      </div>
 
      <div className="mx-auto w-1/2 mt-16 mb-16">
        <hr />
      </div>
      <div className="md:w-1/1 flex md:flex-row flex-col md:justify-center mx-auto md:space-x-20">
        <div className="md:w-1/3 mx-8">
          <h1 className="title md:text-start text-center text-[16px]">
            Contactez-nous
          </h1>
          <div className="mx-auto mt-4">
            <p className="text md:text-start text-center font-poppins">
              Toute l'équipe d'Autopro est à votre écoute. Une question ? Vous
              pouvez nous laisser un petit message dans notre formulaire de
              contact. Nous vous répondrons au plus vite !
            </p>
          </div>
          <div className="flex justify-center">
            <Image src={piece} alt="piece" className="w-auto mt-8" />
          </div>
        </div>
        <div className="md:w-1/3 md:mx-0 mx-5">
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
          
              {selectedImage   ? (
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
      </div>
    </div>
  );
};
export default Contact;
