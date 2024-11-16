"use client";
import React, { useContext } from "react";
import TaskData from "../types/task";
import styles from "./Task.module.css";
import { TodoListContext, ModalContext } from "./TodoList";

interface TaskProps {
    task: TaskData;
}

const Task: React.FC<TaskProps> = ({ task }) => {
    const todoListContext = useContext(TodoListContext);
    const modalContext = useContext(ModalContext);
    if (!todoListContext || !modalContext) {
    return null;
    }
    const { deleteTask, updateTask } = todoListContext;
    const { openModal } = modalContext;
    const handleCheckboxChange = () => {
        updateTask({...task, completed: !task.completed});
    }
    return (
        <div className={styles.task}>
            <span style={{flexGrow: '1'}}>{task.title}</span>
            <input type="checkbox" checked={task.completed} onChange={handleCheckboxChange} />
            <button className={`${styles.button} ${styles.edit}`} onClick={()=>{openModal(task)}}>Edit</button>
            <button className={`${styles.button} ${styles.delete}`} onClick={()=>deleteTask(task._id as string)}>Delete</button>
        </div>
    );
}

export default Task;