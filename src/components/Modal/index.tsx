import { ReactNode, useEffect, useState } from "react";
import ReactModal from "react-modal";

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
  setIsOpen: () => void;
}

export function Modal({ setIsOpen, isOpen, children }: ModalProps) {
  const [modalStatus, setModalStatus] = useState<boolean>(false);

  useEffect(() => {
    setModalStatus(isOpen);
  }, [isOpen]);

  // function handleOpenModal() {
  //   setModalStatus(true);
  // }

  function handleCloseModal() {
    setModalStatus(false);
    setIsOpen();
  }

  return (
    <ReactModal
      shouldCloseOnOverlayClick={!false}
      onRequestClose={handleCloseModal}
      isOpen={modalStatus}
      ariaHideApp={false}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          background: "#F0F0F5",
          color: "#000000",
          borderRadius: "8px",
          width: "736px",
          border: "none",
        },
        overlay: {
          backgroundColor: "#121214e6",
        },
      }}
    >
      {children}
    </ReactModal>
  );
}
