"use client";
import { DeleteUser, getAllUsers } from "@/app/lib/User";
import Cards from "@/components/Cards";
import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoEyeSharp, IoSearch } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
const Utilisateurs = () => {
  const [user, setUser] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    getAllUsers().then((itemUser) => {
      setUser(itemUser);
    });
  }, []);
  const handleDelete = async (id_user) => {
    DeleteUser(id_user).then(() => {
      setUser((prevUser) => prevUser.filter((e) => e.id_user !== id_user));
    });
  };
  const handleSearch = (e) => {
    setFilter(e.target.value);
  };

  const FilterUser = user.filter(
    (item) =>
      (item.Prenom_user?.toLowerCase().includes(filter.toLowerCase()) ??
        false) ||
      (item.Profil_user?.toLowerCase().includes(filter.toLowerCase()) ??
        false) ||
      (item.Nom_user?.toLowerCase().includes(filter.toLowerCase()) ?? false) ||
      (String(item.Telephone_user)?.includes(filter) ?? false) ||
      (item.Email_user?.toLowerCase().includes(filter.toLowerCase()) ?? false)
  );

  // Pagination calculations

  const [currentPage, setCurrentPage] = useState(1);
  const [userPerPage] = useState(6);
  const indexOfLastcommande = currentPage * userPerPage;
  const indexOfFirstcommande = indexOfLastcommande - userPerPage;
  const currentuser = FilterUser.slice(
    indexOfFirstcommande,
    indexOfLastcommande
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Render page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(user.length / userPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      {" "}
      <Cards className={"w-full h-full p-4  overflow-x-auto      "}>
        {" "}
        <div className="relative flex items-center justify-between">
          <div className="text-[20px] font-bold text-greenColor  ">
            List des utilisateurs
          </div>
          <div className="  flex md:flex-row flex-col flex-wrap md:justify-between md:items-center  space-x-4 ">
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

            <div className="flex md:flex-row flex-wrap     items-center  mb-2    ">
              <select
                className="  rounded-md  text-[13px]  px-4 py-2   outline-none border-2 border-gray-200 bg-grayLight text-textColor  "
                defaultValue="" // Set defaultValue here
                placeholder="Choisir la marque"
                onChange={handleSearch}
              >
                <option value="">Profil</option>

                <option value="Client">Client</option>
                <option value="Admin">Admin</option>
                <option value="Fournisseur">Fournisseur</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mt-8 h-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100  ">
                <th className="border-b border-gray-200  py-[12px]  w-1/12 mx-12  text-greenColor text-center dark:!border-navy-700">
                  <p className="text-[13px]   tracking-wide text-greenColor">
                    ID°
                  </p>
                </th>
                <th className="border-b w-1/2 border-gray-200 pr-28 py-[12px] text-start dark:!border-navy-700">
                  <p className="text-xs tracking-wide text-gray-600">
                    Nom et Prénom
                  </p>
                </th>
                <th className="border-b w-1/2 border-gray-200 pr-28 py-[12px] text-start dark:!border-navy-700">
                  <p className="text-xs tracking-wide text-gray-600">E-mail</p>
                </th>
                <th className="border-b w-1/2 border-gray-200 pr-24 py-[12px] text-start dark:!border-navy-700">
                  <p className="text-xs tracking-wide text-gray-600">
                    Téléphone
                  </p>
                </th>

                <th className="border-b w-1/2 border-gray-200 pr-28 py-[12px] text-start dark:!border-navy-700">
                  <p className="text-xs tracking-wide text-gray-600">Profil</p>
                </th>
                <th className="border-b w-1/2 border-gray-200 pr-28 py-[12px] text-start dark:!border-navy-700">
                  <p className="text-xs   tracking-wide text-gray-600 whitespace-nowrap">
                    Date d'inscription
                  </p>
                </th>
                <th className="border-b w-1/2 border-gray-200   py-[12px] text-start dark:!border-navy-700"></th>
              </tr>
            </thead>
            <tbody>
              {currentuser.map((item, index) => (
                <tr key={index} className="text-[13px]  border-b border-gray-200">
                  <td className="   text-center   py-3.5 text-greenColor  text-[13px]">
                    {item.id_user}
                  </td>

                  <td className=" py-2">
                    {item.Prenom_user} {item.Nom_user}
                  </td>
                  <td>{item.Email_user}</td>
                  <td>{item.Telephone_user}</td>
                  <td>{item.Profil_user}</td>
                  <td>{item.createdAt.substring(0, 10)}</td>

                  <td>
                    {" "}
                    <Dropdown className="bg-gray-100 p-4  rounded-md shadow-sm">
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
                              className="text-[13.5px]"
                              href={`/Dashboard/DemandeBoutique/${item.id_user}`}
                            >
                              Consulter
                            </Link>
                          </div>
                        </DropdownItem>
                        <DropdownItem>
                          <button
                            className=" hover:bg-greenColor rounded-md  hover:text-white p-2 flex items-center mt-3"
                            onClick={() => handleDelete(item.id_user)}
                          >
                            <MdDelete className="text-[20px] mr-2" />
                            <p className="text-[13.5px]"> Supprimer</p>
                          </button>
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
    </div>
  );
};
export default Utilisateurs;
