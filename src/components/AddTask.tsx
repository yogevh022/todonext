import { useContext } from "react";
import { ModalContext } from "@/components/TodoList";
import styles from "./AddTask.module.css";

const AddTask = () => {
    const modalContext = useContext(ModalContext);
    if (!modalContext) {
        return null;
    }
    const { openModal } = modalContext;

    return (
        <button className={styles.addTask} onClick={()=>{openModal(null)}}>
            <span>Add Task</span>
        </button>
    );
}
export default AddTask;