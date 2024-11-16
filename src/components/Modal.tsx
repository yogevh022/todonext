import React, { useContext } from "react";
import styles from "./Modal.module.css";
import { ModalContext } from "@/components/TodoList";


interface ModalProps {
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
    const modalContext = useContext(ModalContext);
    if (!modalContext) {
        return null;
    }
    const { modalOpen, closeModal } = modalContext;

    return (
        <>
            <div className={`${styles.darkscreen} ${modalOpen ? styles.active : ''}`} onClick={closeModal}></div>
            <div className={`${styles.modal} ${ modalOpen ? styles.active : ''}`}>
                { children }
            </div>
        </>
    );
}
export default Modal;