import React from "react";
import styles from "./Modal.module.css";

interface ModalProps {
    children: React.ReactNode,
    modalOpen: boolean,
    onClose: () => void,
}

const Modal: React.FC<ModalProps> = ({ children, modalOpen, onClose }) => {
    return (
        <>
            <div className={`${styles.darkScreen} ${modalOpen ? styles.darkScreenOn : ''}`} onClick={onClose}></div>
            <div className={`${styles.wrapper} ${modalOpen ? styles.open : ''}`}>
                <button className={styles.closeButton} onClick={onClose}>X</button>
                {children}
            </div>
        </>
    )
}

export default Modal;