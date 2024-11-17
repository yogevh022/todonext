import { useContext } from "react";
import { ModalContext } from "@/components/TodoList";
import styles from "./AddTask.module.css";

const AddTask = () => {
    const modalContext = useContext(ModalContext);
    // CR: this is unneccessary, if the context is null, then onClick wont work,
    // which is a good sign for you that your doing something wrong. errors that shouldnt happen also shouldnt be suppressed
    // they should be loud.
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