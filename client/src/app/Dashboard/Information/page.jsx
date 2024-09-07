"use client";

import {   getStoreByUserID } from "@/app/lib/Magasin";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoLocation, IoLogoLinkedin } from "react-icons/io5";
import { FaPhoneAlt, FaFacebook } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaSquareInstagram, FaCamera } from "react-icons/fa6";
import { TbWorldWww } from "react-icons/tb";
import { MdOutlineTitle } from "react-icons/md";
import { getVille } from "@/app/lib/Category";
import { PiCityFill } from "react-icons/pi";
import { useRouter } from 'next/navigation'
import { toast, ToastContainer } from "react-toastify";
 
 

const Information = () => {
  const { data: session, status } = useSession();
  const [store, setStore] = useState([]);
  const [ville, setVille] = useState([]);
   const [imageFile, setImageFile] = useState(null);
   const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      getStoreByUserID(session.user.id_user).then((store) => {
        setStore(store);
      });
    }
  }, [status, session]);

  useEffect(() => {
    getVille().then((Ville) => {
      setVille(Ville);
    });
  }, []);

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setStore((prevStore) =>
      prevStore.map((item) => ({
        ...item,
        [name]: value,
      }))
    );
    
  };
 
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);  
    
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    const formData = new FormData();
    if (imageFile) {
      formData.append("Logo_magasin", imageFile); // Append the image file if it exists
    }
    Object.keys(store[0]).forEach((key) => {
      formData.append(key, store[0][key]);
    });

    try {
      const res = await fetch(`http://localhost:4000/api/v1/magasin/updateStore/${store[0].id_magasin}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to update store");
      }

      const result = await res.json();

      if (result) {
        toast.success(
          `Les informations de votre magasin ont été modifiées avec succès.`
        );
      }else{
        toast.error(
          `Échec de la modification des informations de votre boutique, veuillez réessayer.`
        );
      }  
    } catch (error) {
      console.error("Failed to update store:", error.message);
      alert("Failed to update store");
    }
  };
  return (
    <div className="  py-5 px-4  shadow-lg rounded-lg overflow-hidden bg-grayLight ">
             <ToastContainer
        position="top-center"
        autoClose={2500}
        toastStyle={{ width: "50%", width: "700px", right: "50%" }}
      />
      <form onSubmit={handleSubmit}>
        {" "}
        {store.map((item) => (
          <div
            key={item.id_magasin}
            className="p-5 flex md:flex-row flex-col md:items-center md:space-y-0 space-y-4 md:justify-around"
          >
            <div className=" space-y-4 flex flex-col justify-center items-center  ">
              <div className="  relative mb-3 ">
                <div>
                  {" "}
                  <label
                    htmlFor="fileInput"
                    className="cursor-pointer text-[25px] bg-white p-2 shadow rounded-full text-greenColor absolute -right-3 top-[120px]  "
                  >
                    <FaCamera />
                  </label>
                  <input
                    type="file"
                    id="fileInput"
                    name="Logo_magasin"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
                <Image
                  src={item.Logo_magasin}
                  className="rounded-full p-5 bg-white border-4 border-gray-200"
                  width={200}
                  height={200}
                  alt="alt"
                />
              </div>
      
              <div className="flex items-center">
                <div className="  relative  ">
                  <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                    <FaFacebook className="text-[20px] mr-2 text-greenColor" />
                  </span>

                  <input
                    type="text"
                    className="outline-none lg:w-96  w-full bg-white border-2 border-gray-200 py-2 pl-10 pr-3 text-[14px] rounded-md"
                    value={item.Lien_facebook}
                    onChange={handleChangeValue}
                    name="Lien_facebook"
                  />
                </div>{" "}
              </div>

              <div className="flex items-center">
                <div className="  relative  ">
                  <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                    <FaSquareInstagram className="text-[20px] mr-2 text-greenColor" />
                  </span>
                  <input
                    type="text"
                    className="outline-none lg:w-96  w-full bg-white border-2 border-gray-200 py-2 pl-10 pr-3 text-[14px] rounded-md"
                    value={item.Lien_instagram}
                    onChange={handleChangeValue}
                    name="Lien_instagram"
                  />
                </div>{" "}
              </div>

              <div className="flex items-center">
                <div className="  relative  ">
                  <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                    <IoLogoLinkedin className="text-[20px] mr-2 text-greenColor" />
                  </span>
                  <input
                    type="text"
                    className="outline-none lg:w-96  w-full bg-white border-2 border-gray-200 py-2 pl-10 pr-3 text-[14px] rounded-md"
                    value={item.Lien_linkedin}
                    onChange={handleChangeValue}
                    name="Lien_linkedin"
                  />
                </div>{" "}
              </div>

              <div className="flex items-center">
                <div className="  relative  ">
                  <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                    <TbWorldWww className="text-[20px] mr-2 text-greenColor" />
                  </span>
                  <input
                    type="text"
                    className="outline-none lg:w-96  w-full bg-white border-2 border-gray-200 py-2 pl-10 pr-3 text-[14px] rounded-md"
                    value={item.Lien_siteWeb}
                    onChange={handleChangeValue}
                    name="Lien_siteWeb"
                  />
                </div>{" "}
              </div>
            </div>

            <div className="space-y-4 flex flex-col justify-center items-center  ">
              <div className="flex items-center">
                <div className="  relative  ">
                  <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                    <MdOutlineTitle className="text-[20px] mr-2 text-greenColor" />
                  </span>
                  <input
                    type="text"
                    className="outline-none lg:w-96  w-full bg-white border-2 border-gray-200 py-2 pl-10 pr-3 text-[14px] rounded-md"
                    value={item.Libelle_magasin}
                    onChange={handleChangeValue}
                    name="Libelle_magasin"
                  />
                </div>{" "}
              </div>
              <div className="flex items-center">
                <div className="  relative  ">
                  <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                    <IoIosMail className="text-[20px] mr-2 text-greenColor" />
                  </span>
                  <input
                    type="text"
                    className="outline-none lg:w-96  w-full bg-white border-2 border-gray-200 py-2 pl-10 pr-3 text-[14px] rounded-md"
                    value={item.Email_magasin}
                    onChange={handleChangeValue}
                    name="Email_magasin"
                  />
                </div>{" "}
              </div>

              <div className="flex items-center">
                <div className="  relative  ">
                  <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                    <IoLocation className="text-[20px] mr-2 text-greenColor" />
                  </span>
                  <input
                    type="text"
                    className="outline-none lg:w-96  w-full bg-white border-2 border-gray-200 py-2 pl-10 pr-3 text-[14px] rounded-md"
                    value={item.Adresse_magasin}
                    onChange={handleChangeValue}
                    name="Adresse_magasin"
                  />
                </div>{" "}
              </div>

              <div className="flex items-center">
                <div className="  relative  ">
                  <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                    <FaPhoneAlt className="text-[20px] mr-2 text-greenColor" />
                  </span>
                  <input
                    type="text"
                    name="Telephone_magasin"
                    className="outline-none lg:w-96  w-full bg-white border-2 border-gray-200 py-2 pl-10 pr-3 text-[14px] rounded-md"
                    value={item.Telephone_magasin}
                    onChange={handleChangeValue}
                  />
                </div>{" "}
              </div>

              <div className="flex items-center">
                <div className="  relative  ">
                  <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                    <PiCityFill className="text-[20px] mr-2 text-greenColor" />
                  </span>

                  <select
                    className="outline-none lg:w-96  w-full bg-white border-2 border-gray-200 py-2 pl-10 pr-3 text-[14px] rounded-md"
                    value={item.id_ville} // Bind the selected value to the formData
                    name="id_ville"
                    onChange={handleChangeValue}
                    // Handle change event here
                  >
                    <option value="">Votre ville</option>
                    {ville.map((item) => (
                      <option key={item.id_ville} value={item.id_ville}>
                        {item.Libelle_ville}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <textarea
                name="Description_magasin"
                rows="6"
                className="bg-white border-2 border-gray-200 rounded-lg lg:w-96  w-full outline-none px-5 text-[14px]   h-40"
                placeholder="Description"
                value={item.Description_magasin}
                onChange={handleChangeValue}
              />
            </div>
          </div>
        ))}
        <div className="flex justify-center m-4">
          <button className="bg-greenColor hover:bg-darkColor text-white p-3 rounded-md text-sm">
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
};
export default Information;
