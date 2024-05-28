import React from 'react';
import { Modal, ModalContent, ModalBody, Button, useDisclosure } from "@nextui-org/react";
import "../styles/Modal.scss";
import Login from './LoginPage/Login';
 
const ModalLogin = ({ isOpen, onClose, children, icon }) => {
    const { isOpen: isModalOpen, onOpen: openModal, onClose: closeModal } = useDisclosure();
  
    return (
        <div>
            <Button onClick={openModal} className=''>{icon}</Button>
            <Modal isOpen={isModalOpen} onClose={closeModal} className="  md:mt-0 md:mb-0 mb-8 mt-8 rounded-2xl   " size="xl">
                <div className="modal-overlay  ">
                    <ModalContent   >
                        <ModalBody  >
                            <Login/>
                        </ModalBody>
                    </ModalContent>
                </div>
            </Modal>
        </div>
    );
};

export default ModalLogin;
