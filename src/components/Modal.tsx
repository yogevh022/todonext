import React, { useContext } from "react";
import styles from "./Modal.module.css";
import { ModalContext } from "@/components/TodoList";


interface ModalProps {
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
    const modalContext = useContext(ModalContext);
    // CR: this is unneccessary, if the context is null, then onClick wont work,
    // which is a good sign for you that your doing something wrong. errors that shouldnt happen also shouldnt be suppressed
    // they should be loud.
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