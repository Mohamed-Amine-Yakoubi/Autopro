"use client";
import { deleteProduct, getProductbyUserId } from "@/app/lib/Product";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { IoReloadCircle, IoEyeSharp, IoSearch } from "react-icons/io5";

import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import Image from "next/image";
import { getAllCategories } from "@/app/lib/Category";
import { getSubCategory, getSubCategoryByIdCat } from "@/app/lib/SubCategory";
import ModalAddProd from "@/components/ModalAddProd";
import Link from "next/link";
import ModalUpdateProduct from "@/components/ModalUpdateProduct";

const Article = () => {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const { data: session } = useSession();
  const [selectedOption, setSelectedOption] = useState("");
  const [filter, setFilter] = useState("");

  const [isModalProductOpen, setisModalProductOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [selectedProduct, setSelectedProduct] = useState(null); // State to hold the selected product

  // Function to open modal with product data
  const openModalProduct = (product) => {
    setSelectedProduct(product); // Set the selected product
    setisModalProductOpen(true); // Open the modal
  };
  const closeModalProduct = () => setisModalProductOpen(false);

  //modal

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
  //search
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  //get sub catgeories by id category

  useEffect(() => {
    if (selectedOption) {
      getSubCategoryByIdCat(selectedOption).then((SubCat) => {
        setSubCategory(SubCat);
      });
    }
  }, [selectedOption]);

  //deelete product
  const handleDelete = async (id_prod) => {
    deleteProduct(id_prod).then(() => {
      setProduct((prevProd) => prevProd.filter((e) => e.id_prod !== id_prod));
    });
  };
  const handleSearch = (e) => {
    setFilter(e.target.value);
  };

  const filteredData = product.filter(
    (item) =>
      (item.Libelle_prod?.toLowerCase().includes(filter.toLowerCase()) ??
        false) ||
      (item.Reference_prod?.toLowerCase().includes(filter.toLowerCase()) ??
        false) ||
      
      (String(item.id_subcat)?.includes(filter) ?? false)
  );

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

  const reloadPage = () => {
    location.reload();
  };
  console.log("id_subcat", filter);
  console.log("id_cat", selectedOption);
  return (
    <div className="  mb-10">
      <div className="  flex md:flex-row flex-col flex-wrap md:justify-between md:items-center  ">
        <div className="mb-3 relative  ">
          <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
            <IoSearch />
          </span>
          <input
            type="text"
            className="outline-none md:w-96 text-[13px] w-full bg-grayLight border-2 border-gray-200 py-2 pl-10 pr-3 rounded-md"
            onChange={handleSearch}
          />
        </div>

        <div className="flex md:flex-row flex-wrap     items-center  mb-2    ">
          <div className="mr-2 my-2">
            <select
              className="  rounded-lg  text-[13px]  p-3   outline-none border-2 border-gray-200 bg-grayLight text-textColor  "
              defaultValue="" // Set defaultValue here
              placeholder="Choisir la marque"
              onChange={handleSearch}
          
            >
              <option value="">sous-Catégories</option>
              {subcategory.map((item) => (
                <option key={item.id_subcat} value={item.id_subcat}>
                  {item.Libelle_subcat}
                </option>
              ))}
            </select>
          </div>
          <div className="mr-2 my-2">
            <select
              className="  rounded-lg  text-[13px]  p-3   outline-none border-2 border-gray-200 bg-grayLight text-textColor  "
              defaultValue="" // Set defaultValue here
              placeholder="Choisir la marque"
              onChange={handleSelectChange}
            >
              <option value=""  >
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
              <ModalAddProd
                icon={<IoMdAddCircleOutline className="  text-[25px]" />}
              />
            </Button>
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
                Référence
              </th>

              <th className="w-1/4 py-4 px-6 text-left text-textColor font-bold text-[13px]">
                Stock
              </th>
              <th className="w-20  py-4 px-6  ">
                {" "}
                <button className="text-[24px]" onClick={reloadPage}>
                  <IoReloadCircle />
                </button>{" "}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {currentProducts.map((item) => (
              <tr className="border-b border-gray-200   " key={item.id_prod}>
                <td className=" px-6  text-[13px]">{item.id_prod}</td>
                <td className="   px-6   ">
                  <div className="truncate flex items-center pr-3">
                    <Image
                      src={item.Image_thumbnail}
                      width={50}
                      height={50}
                      alt="image thumbnail"
                    />
                    <p className="px-4 text-[13px]">{item.Libelle_prod}</p>
                  </div>
                </td>
                <td className="  px-6 text-[13px]">{item.prix_prod},00 TND </td>
                <td className="  px-6 text-[13px]">{item.Reference_prod} </td>
                {item.Stock_prod === 0 ? (
                  <td className="  px-6  ">
                    <p className="bg-red-400 text-white py-2 px-2 w-12 text-center rounded-full text-[13px]">
                      {item.Stock_prod}
                    </p>
                  </td>
                ) : item.Stock_prod > 5 ? (
                  <td className="  px-6    ">
                    <p className="bg-greenColor text-white py-2 px-2 w-12 text-center rounded-full text-[10px]">
                      {item.Stock_prod}
                    </p>
                  </td>
                ) : (
                  <td className="  px-6    ">
                    <p className="bg-orange-300 text-white py-2 px-2 w-12 text-center rounded-full text-[10px]">
                      {item.Stock_prod}
                    </p>
                  </td>
                )}
                <td className="  px-6   flex justify-center items-center">
                  <div className="text-center py-2">
                    <Dropdown className="bg-gray-100 p-3 rounded-md shadow-sm">
                      <DropdownTrigger>
                        <Button variant="bordered">
                          <HiDotsHorizontal />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Dynamic Actions">
                        <DropdownItem>
                          <div className=" hover:bg-greenColor rounded-md  hover:text-white p-2 flex items-center mt-3">
                            <IoEyeSharp className="text-[20px] mr-2" />
                            <Link
                              className="text-[14px]"
                              href={`/Catalogue/${item.id_prod}`}
                            >
                              Consulter
                            </Link>
                          </div>
                        </DropdownItem>
                        <DropdownItem>
                          <button
                            className=" hover:bg-greenColor rounded-md  hover:text-white p-2 flex items-center mt-3"
                            onClick={() => handleDelete(item.id_prod)}
                          >
                            <MdDelete className="text-[20px] mr-2" />
                            <p className="text-[14px]"> Supprimer</p>
                          </button>
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => openModalProduct(item.id_prod)}
                        >
                          <div className=" hover:bg-greenColor rounded-md  hover:text-white p-2 flex items-center mt-3 mb-1">
                            <RiEdit2Fill className="text-[20px] mr-2" />

                            <button className="text-[14px]">Modifier</button>
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
              className={`px-3 py-1 rounded-full text-[13px] ${
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
      <ModalUpdateProduct
        productData={selectedProduct}
        isOpen={isModalProductOpen}
        onClose={closeModalProduct}
      />
    </div>
  );
};
export default Article;
