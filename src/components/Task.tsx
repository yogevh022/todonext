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
    // CR: this is unneccessary, if the context is null, then onClick wont work,
    // which is a good sign for you that your doing something wrong. errors that shouldnt happen also shouldnt be suppressed
    // they should be loud.
    if (!todoListContext || !modalContext) {
        // CR: indentation
    return null;
    }
    const { deleteTask, updateTask } = todoListContext;
    const { openModal } = modalContext;
    // CR: useCallback
    const handleCheckboxChange = () => {
        updateTask({...task, completed: !task.completed});
    }
    return (
        <div className={styles.task}>
            <span style={{flexGrow: '1'}}>{task.title}</span>
            <input type="checkbox" checked={task.completed} onChange={handleCheckboxChange} />
            <button className={`${styles.button} ${styles.edit}`} onClick={/*be consistent, move this to a function declaration*/()=>{openModal(task)}}>Edit</button>
            <button className={`${styles.button} ${styles.delete}`} onClick={/*be consistent, move this to a function declaration*/()=>deleteTask(task._id as string)}>Delete</button>
        </div>
    );
}

export default Task;