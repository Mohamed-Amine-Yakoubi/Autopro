"use client";
import { deleteProduct, getProductbyUserId } from "@/app/lib/Product";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";

import {
  Modal,
  ModalContent,
  ModalBody,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  useDisclosure,
  ModalHeader,
} from "@nextui-org/react";
import { IoReloadCircle,IoEyeSharp, IoSearch } from "react-icons/io5";


import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import Image from "next/image";
import { getAllCategories } from "@/app/lib/Category";
 

const Article = () => {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const { data: session } = useSession();
  const [selectedOption, setSelectedOption] = useState("");
  const [filter, setFilter] = useState("");
 
  //modal
  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();
  //getuserbyuserid
  useEffect(() => {
    getProductbyUserId(session.user.id).then((product) => {
      setProduct(product);
    });
  }, [session]);
  //getAll categories
  useEffect(() => {
    getAllCategories().then((category) => {
      setCategory(category);
    });
  }, []);
  //deelete product
  const handleDelete = async (id_prod) => {
 
      deleteProduct(id_prod).then(() => {
        setProduct((prevProd) => prevProd.filter((e) => e.id_prod !== id_prod));

      });
 
  };

  //search
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const filteredData = product.filter(
    (product) =>
      (product.Libelle_prod?.toLowerCase().includes(filter.toLowerCase()) ??
        false) &&
      (selectedOption ? product.id_cat === selectedOption : true)
  );

  const handleSearch = (e) => {
    setFilter(e.target.value);
  };

  // Pagination calculations

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredData.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Render page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(product.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }
 
  //reload page
  
const reloadPage =()=> {
  location.reload();
}
  return (
    <div className="mx-4 md:mx-10 mb-10">
    
      <div className="  flex md:flex-row flex-col flex-wrap md:justify-between md:items-center  ">
       
        <div className="mb-3 relative  ">
          <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
            <IoSearch />
          </span>
          <input
            type="text"
            className="outline-none md:w-96  w-full bg-grayLight border-2 border-gray-200 py-2 pl-10 pr-3 rounded-md"
            onChange={handleSearch}
          />
        </div>

        <div className="flex md:flex-row flex-wrap     items-center  mb-2    ">
          <div className="mr-2 my-2">
            <select
              className="  rounded-lg  text-[14px]  p-3   outline-none border-2 border-gray-200 bg-grayLight text-textColor  "
              defaultValue="" // Set defaultValue here
              placeholder="Choisir la marque"
            >
              <option value="">sous-Catégories</option>
              <option value="brand1">sdqsd</option>
            </select>
          </div>
          <div className="mr-2 my-2">
            <select
              className="  rounded-lg  text-[14px]  p-3   outline-none border-2 border-gray-200 bg-grayLight text-textColor  "
              defaultValue="" // Set defaultValue here
              placeholder="Choisir la marque"
              onChange={handleSelectChange}
            >
              <option value="" disabled>
                Catégories
              </option>
              {category.map((item) => (
                <option key={item.id_cat} value={item.id_cat}>
                  {item.Libelle_cat}
                </option>
              ))}
            </select>
          </div>
          <div className="mr-2 my-2">
            <Button
              onClick={openModal}
              className="bg-greenColor text-white p-3 rounded-lg    "
            >
              {" "}
              <IoMdAddCircleOutline className="  text-[25px]" />{" "}
            </Button>
            <Modal
              isOpen={isModalOpen}
              onClose={closeModal}
              className="md:mt-0 md:mb-0 mb-8 mt-8 rounded-2xl bg-white"
              size="lg"
            >
              <div className="modal-overlay  ">
                <ModalContent>
                  <ModalHeader className="flex flex-col gap-1 rounded-t-2xl bg-grayLight text-center">
                    Merci pour votre patience
                  </ModalHeader>
                  <ModalBody className="bg-white space-y-4">
                    <input
                      type="text"
                      name="Libelle_prod"
                      className="bg-grayColor rounded-lg outline-none px-5  h-11  text-[14px]      "
                      placeholder="Libélle de produit"
                    />
                    <input
                      type="textarea"
                      name="Description_prod"
                      className="bg-grayColor rounded-lg outline-none px-5  h-11  text-[14px]      "
                      placeholder="Description de produit"
                      rows="5"
                      height={100}
                    />
                    <input
                      type="text"
                      name="prix_prod"
                      className="bg-grayColor rounded-lg outline-none px-5  h-11  text-[14px]      "
                      placeholder="Prix de produit"
                    />
                  </ModalBody>
                </ModalContent>
              </div>
            </Modal>
          </div>
        </div>
      </div>
      <div className="shadow-lg rounded-lg overflow-hidden ">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-gray-100">
              <th className="w-2 py-4 px-6 text-left text-textColor font-bold text-[13px]">
                N°
              </th>
              <th className="w-1/4 py-4 px-6 text-left text-textColor font-bold text-[13px]">
                Libelle
              </th>
              <th className="w-1/4 py-4 px-6 text-left text-textColor font-bold text-[13px]">
                Prix
              </th>
              <th className="w-1/4 py-4 px-6 text-left text-textColor font-bold text-[13px]">
                Stock
              </th>
              <th className="w-10  py-4 px-6  ">  <button className="text-[24px]" onClick={reloadPage}><IoReloadCircle /></button> </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {currentProducts.map((item) => (
              <tr className="border-b border-gray-200   " key={item.id_prod}>
                <td className=" px-6  ">{item.id_prod}</td>
                <td className="   px-6   ">
                  <div className="truncate flex items-center pr-3">
                    <Image
                      src={item.Image_thumbnail}
                      width={50}
                      height={50}
                      alt="image thumbnail"
                    />
                    <p className="px-4">{item.Libelle_prod}</p>
                  </div>
                </td>
                <td className="  px-6 ">{item.prix_prod},00 TND </td>
                {item.Stock_prod === 0 ? (
                  <td className="  px-6  ">
                    <p className="bg-red-400 text-white py-2 px-2 w-12 text-center rounded-full text-xs">
                      {item.Stock_prod}
                    </p>
                  </td>
                ) : item.Stock_prod > 5 ? (
                  <td className="  px-6    ">
                    <p className="bg-greenColor text-white py-2 px-2 w-12 text-center rounded-full text-xs">
                      {item.Stock_prod}
                    </p>
                  </td>
                ) : (
                  <td className="  px-6    ">
                    <p className="bg-orange-300 text-white py-2 px-2 w-12 text-center rounded-full text-xs">
                      {item.Stock_prod}
                    </p>
                  </td>
                )}
                <td className="  px-6   flex justify-center items-center">
                  <div className="text-center py-2">
                    <Dropdown className="bg-gray-100 p-3 rounded-md shadow-sm">
                      <DropdownTrigger >
                        <Button variant="bordered">
                          <HiDotsHorizontal />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Dynamic Actions" >
                        <DropdownItem >
                          <div className=" hover:bg-greenColor rounded-md  hover:text-white p-2 flex items-center mt-3">
                            <IoEyeSharp className="text-[20px] mr-2" />
                            <p>Consulter</p>
                          </div>
                        </DropdownItem>
                        <DropdownItem>
                          <button
                            className=" hover:bg-greenColor rounded-md  hover:text-white p-2 flex items-center mt-3"
                            onClick={() => handleDelete(item.id_prod)}
                          >
                            <MdDelete className="text-[20px] mr-2" />
                            <p> Supprimer</p>
                          </button>
                        </DropdownItem>
                        <DropdownItem>
                          <div className=" hover:bg-greenColor rounded-md  hover:text-white p-2 flex items-center mt-3 mb-1">
                            <RiEdit2Fill className="text-[20px] mr-2" />
                            <p>Modifier</p>
                          </div>
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center py-4">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-3 py-1 rounded-full text-[14px] ${
                number === currentPage
                  ? "bg-greenColor text-white"
                  : "bg-gray-200"
              } mx-1`}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Article;
