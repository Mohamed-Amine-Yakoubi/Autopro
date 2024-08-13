import Image from "next/image";
import Link from "next/link";
import { FaBoxOpen, FaUserCircle } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import Autopro_logo from "../../public/img/Autopro_logo.svg";
import { IoHome } from "react-icons/io5";
import { PiUsersFill } from "react-icons/pi";
import { BsFillSendExclamationFill } from "react-icons/bs";
import { MdCategory } from "react-icons/md";

 

const Sidebar = () => {

  return (
    <div className=" h-[650px] w-72 md:mb-28 bg-white border-2 text-iconColor m-5 rounded-lg">
      <div>
        <div className="flex py-10 px-4 flex-col items-center justify-center">
          <Image
            src={Autopro_logo}
            className="rounded-full bg-white "
            width={250}
            height={250}
            alt="alt"
          />
        </div>
        <ul className="px-5 mt-10">
          <li className="px-4 py-4 hover:bg-greenColor hover:text-white flex items-center space-x-3 rounded-md">
            <IoHome className="text-[20px]" />
            <Link href="/Dashboard/Home_Dashboard" className="font-poppins text-[14px]">
              Dashboard
            </Link>
          </li>
          <li className="px-4 py-4 hover:bg-greenColor hover:text-white flex items-center space-x-3 rounded-md">
            <PiUsersFill className="text-[20px]" />
            <Link
              href="/Dashboard/Utilisateurs"
              className="font-poppins text-[14px]"
            >
              Utilisateurs
            </Link>
          </li>
          <li className="p-4 hover:bg-greenColor hover:text-white flex items-center space-x-3 rounded-md">
            <FaBoxOpen className="text-[20px]" />
            <Link
              href="/Dashboard/DemandeBoutique"
              className="font-poppins text-[14px]"
            >
              Demandes boutique{" "}
            </Link>
          </li>
          <li className="p-4 hover:bg-greenColor hover:text-white flex items-center space-x-3 rounded-md">
            <BsFillSendExclamationFill className="text-[20px]" />
            <Link
              href="/Dashboard/Reclamations"
              className="font-poppins text-[14px]"
            >
              Reclamations
            </Link>
          </li>
          <li className="p-4 hover:bg-greenColor hover:text-white flex items-center space-x-3 rounded-md">
            <MdCategory className="text-[20px]" />
            <Link
              href="/Dashboard/Categories"
              className="font-poppins text-[14px]"
            >
              Catégories
            </Link>
          </li>
          <li className="p-4 hover:bg-greenColor hover:text-white flex items-center space-x-3 rounded-md">
            <FaUserCircle className="text-[20px]" />
            <Link
              href="/Dashboard/Compte"
              className="font-poppins text-[14px]"
            >
              Profile
            </Link>
          </li>
     
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
