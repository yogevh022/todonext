import React from "react";
import styles from "./Task.module.css";
import {ITask} from "@/app/page";

interface TaskProps {
    task: ITask,
    taskId: string,
    onEdit: (id:string) => void,
    onDelete: (id: string) => void,
    onCompleted: (id: string) => void,
}

const Task: React.FC<TaskProps> = ({ task, taskId, onCompleted, onEdit, onDelete }) => {
    return (
      <div className={styles.wrapper}>
        <span className={styles.title}>{task.title}</span>
          <TaskButtons completed={task.completed} onCompleted={()=>onCompleted(taskId)} onEdit={()=>onEdit(taskId)} onDelete={()=>onDelete(taskId)} />
      </div>
    );
}

interface TaskButtonsProps {
    onEdit: () => void,
    onDelete: () => void,
    completed: boolean,
    onCompleted: () => void,
}

const TaskButtons: React.FC<TaskButtonsProps> = ({ completed, onCompleted, onEdit, onDelete }) => {
    return (
      <div className={styles.buttonsWrapper}>
          <input type="checkbox" className={styles.checkbox} checked={completed} onChange={onCompleted} />
        <button className={styles.editButton} onClick={onEdit}>Edit</button>
        <button className={styles.deleteButton} onClick={onDelete}>Delete</button>
      </div>
    );
}

export default Task;