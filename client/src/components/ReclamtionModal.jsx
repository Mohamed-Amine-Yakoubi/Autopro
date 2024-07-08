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
import ProfileUser from "./ProfileUser";
import { useSession } from "next-auth/react";
import Reclamation from "./Reclamtion";
const ReclamationModal = ({ isOpen, onClose, children,props, icon }) => {

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        className="    bg-white  md:mt-0 md:mb-0 mb-8 mt-8 rounded-2xl   "
        size="lg"
        icon={icon}
      >
        <div className="modal-overlay  ">
          <ModalContent className="custom-modal-content">
            <ModalHeader className="custom-modal-header flex flex-col items-center">
              Passer une Reclamation
            </ModalHeader>
            <ModalBody className="custom-modal-body  ">
              <Reclamation props={props}/>
            </ModalBody>
          </ModalContent>
        </div>
      </Modal>
    </div>
  );
};
export default ReclamationModal;
