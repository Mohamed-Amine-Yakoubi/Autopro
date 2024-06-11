import React from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
 
  ModalHeader,
} from "@nextui-org/react";
import "../styles/Modal.scss";
 
import { UpdateProduct } from "./UpdateProduct";
const ModalUpdateProduct = ({ isOpen, onClose, productData,children,props, icon }) => {

  return (
    <div>
      <Modal
          isOpen={isOpen}
          onClose={onClose}
          className="custom-modal"
      >
        <div className="modal-overlay  ">
          <ModalContent className="custom-modal-content">
            <ModalHeader className="custom-modal-header flex flex-col items-center">
              Modifier votre Produit
            </ModalHeader>
            <ModalBody className="custom-modal-body  ">
              <UpdateProduct  idprod={productData}/>
            </ModalBody>
          </ModalContent>
        </div>
      </Modal>
    </div>
  );
};
export default ModalUpdateProduct;
