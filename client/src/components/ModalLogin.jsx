import React from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import "../styles/Modal.scss";

import Login from "./LoginPage/Login";
const ModalLogin = ({  icon }) => {
  const {
    isOpen: isOpen,
    onOpen: openModal,
    onClose: onClose,
  } = useDisclosure();
  return (
    <div  >
      <Button onClick={openModal} className="">
        {icon}
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        className="custom-modal   "
        icon={icon}
      >
     
        <div className="modal-overlay  "  >
          <ModalContent className="custom-modal-content "  >
            <ModalBody className="custom-modal-body ">
              <Login />
            </ModalBody>
          </ModalContent>
        </div>
       
      </Modal>
    </div>
  );
};
export default ModalLogin;
