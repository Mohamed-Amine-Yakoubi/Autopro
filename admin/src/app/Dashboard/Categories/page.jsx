"use client";
import React, { useEffect, useState } from "react";
import Cards from "@/components/Cards";

import { IoEyeSharp, IoSearch } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

import { DeleteCatByID } from "@/app/lib/boutique";

import { useRouter } from "next/navigation";
import {
  DeleteMarque,
  DeleteModele,
  DeleteMotor,
  DeletePiece,
  DeletesousPiece,
  getAllCategories,
  getAllMarque,
  GetAllModele,
  GetAllMotors,
  GetAllsubCategories,
} from "@/app/lib/Car";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { HiDotsHorizontal } from "react-icons/hi";
import { RiEdit2Fill } from "react-icons/ri";
import { IoMdAddCircleOutline } from "react-icons/io";
import AddCategory from "@/components/AddCategory";
import Image from "next/image";
const Categories = () => {
  const router = useRouter();
  const [filter, setFilter] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("Marque");
  const [marque, setMarque] = useState([]);
  const [modele, setModele] = useState([]);
  const [motorisation, setMotorisation] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [isModalClaimOpen, setIsModalClaimOpen] = useState(false);

  const openModalClaim = () => setIsModalClaimOpen(true);
  const closeModalClaim = () => setIsModalClaimOpen(false);
  useEffect(() => {
    getAllMarque().then((itemMarque) => {
      setMarque(itemMarque);
    });
    GetAllModele().then((itemModele) => {
      setModele(itemModele);
    });
    GetAllMotors().then((itemMotor) => {
      setMotorisation(itemMotor);
    });
    getAllCategories().then((itemCat) => {
      setCategories(itemCat);
    });
    GetAllsubCategories().then((itemsubCat) => {
      setSubcategories(itemsubCat);
    });
  }, []);
  const handleDelete = async (id) => {
    try {
      if (category === "Modele") {
        await DeleteModele(id);
        setModele((prev) => prev.filter((item) => item.id_modele !== id));
      } else if (category === "Marque") {
        await DeleteMarque(id);
        setMarque((prev) => prev.filter((item) => item.id_marque !== id));
      } else if (category === "Motorisation") {
        await DeleteMotor(id);
        setMotorisation((prev) => prev.filter((item) => item.id_motor !== id));
      } else if (category === "Pieces") {
        await DeletePiece(id);
        setCategories((prev) => prev.filter((item) => item.id_cat !== id));
      } else if (category === "sousPieces") {
        await DeletesousPiece(id);
        setSubcategories((prev) =>
          prev.filter((item) => item.id_subcat !== id)
        );
      }
    } catch (error) {
      console.error("Failed to delete item", error);
    }
  };

  const handleSearch = (e) => {
    setFilter(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setFilter(""); // Clear the filter when changing categories
  };

  const FilterCat =
    category === "Marque"
      ? marque.filter(
          (item) =>
            item.Libelle_marque?.toLowerCase().includes(filter.toLowerCase()) ??
            false
        )
      : category === "Modele"
      ? modele.filter(
          (item) =>
            item.Libelle_modele?.toLowerCase().includes(filter.toLowerCase()) ??
            false
        )
      : category === "Motorisation"
      ? motorisation.filter(
          (item) =>
            item.Libelle_motor?.toLowerCase().includes(filter.toLowerCase()) ??
            false
        )
      : category === "Pieces"
      ? Categories.filter(
          (item) =>
            item.Libelle_cat?.toLowerCase().includes(filter.toLowerCase()) ??
            false
        )
      : category === "sousPieces"
      ? subcategories.filter(
          (item) =>
            item.Libelle_subcat?.toLowerCase().includes(filter.toLowerCase()) ??
            false
        )
      : null;
  // Pagination calculations

  const [currentPage, setCurrentPage] = useState(1);
  const [CatPerPage] = useState(6);
  const indexOfLastcommande = currentPage * CatPerPage;
  const indexOfFirstcommande = indexOfLastcommande - CatPerPage;
  const currentItems = FilterCat.slice(
    indexOfFirstcommande,
    indexOfLastcommande
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Render page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(FilterCat.length / CatPerPage); i++) {
    pageNumbers.push(i);
  }
  console.log("currentItems", currentItems);
  return (
    <div>
      <Cards className={"w-full h-full p-4 sm:overflow-x-auto     "}>
        {" "}
        <div className="relative flex items-center justify-between">
          <div className="text-[20px] font-bold text-greenColor  ">
            Catégoires
          </div>
          <div className="  flex md:flex-row flex-col flex-wrap md:justify-between md:items-center  md:space-x-4 space-x-0 ">
            <div className="mb-3 relative  ">
              <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                <IoSearch />
              </span>
              <input
                type="text"
                className="outline-none md:w-96 text-[13px] w-full bg-grayLight border-2 border-gray-200 py-2 pl-8 pr-3 rounded-md"
                onChange={handleSearch}
                placeholder="Chercher"
              />
            </div>

            <div className="flex md:flex-row flex-wrap     items-center  mb-3    ">
              <select
                className="  rounded-md  text-[13px]  px-4 py-2   outline-none border-2 border-gray-200 bg-grayLight text-textColor  "
                value={category}
                placeholder="Choisir la marque"
                onChange={handleCategoryChange}
              >
                <option value="Marque">Marque</option>
                <option value="Modele">Modele</option>
                <option value="Motorisation">Motorisation</option>
                <option value="Pieces">Piéces</option>
                <option value="sousPieces">sousPiéces</option>
              </select>
            </div>
            <div className="   mb-3    ">
              {[
                "Marque",
                "Modele",
                "Motorisation",
                "Pieces",
                "sousPieces",
              ].includes(category) && (
                <button
                  onClick={openModalClaim}
                  className="bg-greenColor text-white p-2 rounded-lg    "
                >
                  <IoMdAddCircleOutline className="  text-[25px]" />
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="mt-8 h-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="border-b border-gray-200 py-[12px] w-1/12 text-greenColor text-center">
                  <p className="text-xs tracking-wide text-gray-600">N°</p>
                </th>
                <th className="border-b border-gray-200 py-[12px] text-start">
                  <p className="text-xs tracking-wide text-gray-600">
                    {category === "Marque"
                      ? "Libelle marque"
                      : category === "Modele"
                      ? "Libelle modele"
                      : category === "Motorisation"
                      ? "Libelle motor"
                      : category === "Pieces"
                      ? "Libelle Piéces"
                      : category === "sousPieces"
                      ? "Libelle sousPiéces"
                      : null}
                  </p>
                </th>
                <th className="border-b border-gray-200 py-[12px] text-start">
                  <p className="text-xs tracking-wide text-gray-600">Date</p>
                </th>
                <th className="border-b border-gray-200 py-[12px] text-start"></th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr
                  key={index}
                  className="text-[13px] border-b border-gray-200"
                >
                  <td className="text-center py-3.5 text-greenColor text-[13px]">
                    {category === "Marque"
                      ? item.id_marque
                      : category === "Modele"
                      ? item.id_modele
                      : category === "Motorisation"
                      ? item.id_motor
                      : category === "Pieces"
                      ? item.id_cat
                      : category === "sousPieces"
                      ? item.id_subcat
                      : null}
                  </td>
                  <td className="flex  flex-row    items-center   space-x-4 my-2  ">
                    <div>
                      {category === "Pieces" ? (
                        <Image
                          src={item.Image_cat}
                          width={50}
                          height={50}
                          alt="Selected"
                          className="border-2  rounded-md border-gray-200"
                          style={{ maxWidth: "100%" }}
                        />
                      ) : category === "sousPieces" ? (
                        <Image
                          src={item.Image_subcat}
                          width={50}
                          height={50}
                          alt="Selected"
                          className="border-2  rounded-md border-gray-200"
                          style={{ maxWidth: "100%" }}
                        />
                      ) : null}
                    </div>
                    <div>
                      {category === "Marque"
                        ? item.Libelle_marque
                        : category === "Modele"
                        ? item.Libelle_modele
                        : category === "Motorisation"
                        ? item.Libelle_motor
                        : category === "Pieces"
                        ? item.Libelle_cat
                        : category === "sousPieces"
                        ? item.Libelle_subcat
                        : null}
                    </div>
                  </td>
                  <td>{item.createdAt.substring(0, 10)}</td>
                  <td>
                    <Dropdown className="bg-gray-100 p-4  rounded-md shadow-lg">
                      <DropdownTrigger>
                        <Button variant="bordered">
                          <HiDotsHorizontal />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Dynamic Actions">
                        <DropdownItem>
                          <button
                            className=" hover:bg-greenColor rounded-md  hover:text-white p-2 flex items-center mt-3"
                            onClick={() =>
                              handleDelete(
                                category === "Marque"
                                  ? item.id_marque
                                  : category === "Modele"
                                  ? item.id_modele
                                  : category === "Motorisation"
                                  ? item.id_motor
                                  : category === "Pieces"
                                  ? item.id_cat
                                  : category === "sousPieces"
                                  ? item.id_subcat
                                  : null
                              )
                            }
                          >
                            <MdDelete className="text-[20px] mr-2" />
                            <p className="text-[14px]"> Supprimer</p>
                          </button>
                        </DropdownItem>

                        <DropdownItem>
                          {[
                            "Marque",
                            "Modele",
                            "Motorisation",
                            "Pieces",
                            "sousPieces",
                          ].includes(category) && (
                            <button
                              onClick={openModalClaim}
                              className=" hover:bg-greenColor rounded-md  hover:text-white p-2 flex items-center mt-3"
                            >
                              <RiEdit2Fill className="text-[20px] mr-2" />
                              <p className="text-[14px]"> Modifier</p>
                            </button>
                          )}
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
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
      </Cards>
      <AddCategory
        isOpen={isModalClaimOpen}
        type={category}
        onClose={closeModalClaim}
      />
    </div>
  );
};
export default Categories;
