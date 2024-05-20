import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { FaUserCircle } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { ImProfile } from "react-icons/im";

const DropDown = ({ openMenu }) => {
  const { data: session, status } = useSession();
  return (
    <Dropdown
      showArrow
      className="bg-white py-5 px-5 rounded-md shadow-md border-2 border-gray-200 "
    >
      <DropdownTrigger>
        <Button variant="bordered">{openMenu}</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem className="mb-5 ">
          {" "}
          <div className="flex flex-row items-center   mb-5">
            <div className=" ">
              <FaUserCircle className="mr-2 text-[30px]" />
            </div>
            <div>
              <div>{session.user.name}</div>
              <div className="text-[12px] text-gray-400">
                {session.user.email}
              </div>
            </div>
          </div>
        </DropdownItem>
        <DropdownItem
        
        > 
          <div className="flex items-center">
            <ImProfile className="text-iconColor mr-2 text-[23px]" />
          Profile
          </div>
        </DropdownItem>
        <DropdownItem
          key="delete"
          color="danger"
          onClick={() => {
            signOut();
          }}
        >
          <hr className="w-72   h-px my-2  mb-4  mt-4  dark:bg-gray-300" />
          <div className="flex items-center">
            <HiOutlineLogout className="text-iconColor mr-2 text-[24px]" />
            Se déconnecter{" "}
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
export default DropDown;
