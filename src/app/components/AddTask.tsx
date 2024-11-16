import React from "react";
import styles from "./AddTask.module.css";

interface AddTaskProps {
    onAdd: () => void
}

const AddTask: React.FC<AddTaskProps> = ({onAdd}) => {
    return (
        <button onClick={onAdd} className={styles.addTask}>Add Task</button>
    )
}

export default AddTask;