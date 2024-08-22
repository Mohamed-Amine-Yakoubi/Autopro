"use client";
import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalBody, ModalHeader } from "@nextui-org/react";
import "../styles/Modal.scss";
import { Ellipsis } from "react-css-spinners";

import "../styles/stepper.scss";
import { useSession } from "next-auth/react";
import Textarea from "./Textarea";
import Image from "next/image";
import { IoMdPhotos } from "react-icons/io";
import { getAllStore } from "@/app/lib/Magasin";
import Reclamation from "./Reclamtion";

const ReclamationModal = ({  isOpen, onClose, children,props, icon }) => {
  

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="custom-modal-lg   "
      size="lg"
    >
      <div className="modal-overlay">
        <div>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1 rounded-t-2xl bg-grayLight text-center">
              Réclamations
            </ModalHeader>
            <ModalBody>
            <Reclamation props={props}/>
            </ModalBody>
          </ModalContent>
        </div>
      </div>
    </Modal>
  );
};

export default ReclamationModal;
