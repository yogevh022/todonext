import styles from "./ConfirmButton.module.css";
import React, {FormEvent} from "react";

interface ConfirmButtonProps {
    onClick: (e: FormEvent | undefined) => void
}

const ConfirmButton: React.FC<ConfirmButtonProps> = ({ onClick }) => {
    return (
        <button onClick={onClick} className={styles.confirmButton}>Confirm</button>
    )
}

export default ConfirmButton;