import styles from "./TaskList.module.css";
import React from "react";

interface TaskListProps {
    children: React.ReactNode,
}

const TaskList: React.FC<TaskListProps> = ({ children }) => {
    return (
      <div className={styles.wrapper}>
          {children}
      </div>
    );
}

export default TaskList;