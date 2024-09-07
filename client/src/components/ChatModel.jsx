import React from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
  ModalHeader,
} from "@nextui-org/react";
import "../styles/Modal.scss";
import AddProduct from "./AddProduct";
import Chat from "./Chat";
 

const ChatModel = ({ icon ,props}) => {
  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();

  return (
    <div>
      <Button onClick={openModal} className="">
        {icon}
      </Button>
      <Modal isOpen={isModalOpen} onClose={closeModal} className="custom-modal">
        <div className="modal-overlay">
          <ModalContent className="custom-modal-content">
            <ModalHeader className="custom-modal-header flex flex-col items-center">
              Votre messagerie{" "}
            </ModalHeader>
            <ModalBody className="custom-modal-body  ">
              <Chat props={props}/>
            </ModalBody>
          </ModalContent>
        </div>
      </Modal>
    </div>
    
  );
};

export default ChatModel;
