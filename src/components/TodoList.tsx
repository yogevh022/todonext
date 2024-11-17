"use client";
import React, {createContext, MutableRefObject, useRef} from "react";
import styles from "./TodoList.module.css";
import Task from "@/components/Task";
import TaskData from "@/types/task";
import Modal from "@/components/Modal";
import TaskForm, { FormInputHandle } from "@/components/TaskForm";
import AddTask from "@/components/AddTask";

interface TodoListContextProps {
    deleteTask: (taskId: string) => Promise<void>;
    updateTask: (updatedTask: TaskData) => Promise<void>;
    addTask: (newTask: TaskData) => Promise<void>;
}
export const TodoListContext = createContext<TodoListContextProps | null>(null);

interface ModalContextProps {
    modalOpen: boolean;
    closeModal: () => void;
    openModal: (editTask: TaskData | null) => void;
}
export const ModalContext = createContext<ModalContextProps | null>(null);

interface TaskFormContextProps {
    currentTaskEdit: MutableRefObject<TaskData | null>;
}
export const TaskFormContext = createContext<TaskFormContextProps | null>(null);

interface TodoListProps {
    initialTasks: TaskData[];
}


const TodoList: React.FC<TodoListProps> = ({ initialTasks }) => {
    const [tasks, setTasks] = React.useState(initialTasks);
    const [modalOpen, setModalOpen] = React.useState(false);
    // this is a state, it shouldnt be a ref.
    const currentTaskEdit = useRef<TaskData | null>(null);
    const taskFormRef = useRef<FormInputHandle | null>(null);

    const addTask = async (newTask: TaskData) => {
        const response = await fetch('http://localhost:3000/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTask)
        });
        const task = await response.json();
        setTasks([...tasks, task]);
    }

    const deleteTask = async (taskId: string) => {
        await fetch(`http://localhost:3000/api/tasks/${taskId}`, { method: 'DELETE' });
        setTasks(tasks.filter(task => task._id !== taskId));
    }

    const updateTask = async (updatedTask: TaskData) => {
        await fetch(`http://localhost:3000/api/tasks/${updatedTask._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTask)
        });
        setTasks(tasks.map(task => task._id === updatedTask._id ? updatedTask : task));
    }

    const openModal = (editTask: TaskData | null) => {
        currentTaskEdit.current = editTask;
        taskFormRef.current?.setValue('');
        taskFormRef.current?.focus();
        if (editTask) taskFormRef.current?.setValue(editTask.title);
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    return (
        <TodoListContext.Provider value={{ deleteTask, updateTask, addTask }}>
            <ModalContext.Provider value={{ modalOpen, closeModal, openModal }}>
                <TaskFormContext.Provider value={{ currentTaskEdit }}>
                    <div className={styles.list}>
                        <AddTask />
                        {tasks.map((task) => (
                            <Task
                                key={"task_"+task._id}
                                task={task}
                            />
                        ))}
                    </div>
                    <Modal>
                        <TaskForm ref={taskFormRef}/>
                    </Modal>
                </TaskFormContext.Provider>
            </ModalContext.Provider>
        </TodoListContext.Provider>
    );
}

export default TodoList;