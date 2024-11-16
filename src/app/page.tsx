"use client";
import styles from "./page.module.css";
import Task from "@/app/components/Task";
import TaskList from "@/app/components/TaskList";
import React, {useState, useEffect, useRef, FormEvent} from "react";
import {editTask, deleteTask, getTasks, addTask} from "@/app/dbClient";
import AddTask from "@/app/components/AddTask";
import Modal from "@/app/components/Modal";
import ConfirmButton from "@/app/components/ConfirmButton";

export interface ITask {
    title: string,
    completed: boolean,
}

const defaultObject: ITask = {
    title: "",
    completed: false,
}

interface ITasks {
    [key: string]: ITask
}

export default function Home() {
    const [tasks, setTasks] = useState<ITasks>({});
    const inputRef = useRef<HTMLInputElement>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [currentInput, setCurrentInput] = useState<string>("");
    const [editTaskId, setEditTaskId] = useState<string | null>(null);

    useEffect(() => {
        getTasks().then((tasksObject) => {
            setTasks(tasksObject.tasks);
        }).catch((error) => console.error(error));
    }, []);

    const openModal = () => {
        setModalOpen(true);
        inputRef.current?.focus();
    }

    const onDelete = (id: string) => {
        deleteTask(id).then(() => {
            const newTasks = { ...tasks };
            delete newTasks[id];
            setTasks(newTasks);
        }).catch((error) => console.error(error));
    }

    const onAdd = () => {
        setEditTaskId(null);
        setCurrentInput("");
        openModal();
    }

    const onEdit = (id: string) => {
        setEditTaskId(id);
        if (!inputRef.current) { return; }
        setCurrentInput(tasks[id].title);
        openModal();
    }

    const onMarkComplete = (id: string) => {
        const newTask: ITask = { ...tasks[id], completed: !tasks[id].completed };
        setTasks({ ...tasks, [id]: newTask });
        onEditConfirm(id, newTask);
    }

    const onEditConfirm = (id: string, task: ITask) => {
        editTask(id, task).then(() => {
            setTasks({ ...tasks, [id]: task });
        }).catch((error) => console.error(error));
    }

    const onAddConfirm = (newTask: ITask) => {
        addTask(newTask).then((taskObject) => {
            setTasks({ ...tasks, [taskObject.id]: newTask });
        }).catch((error) => console.error(error));
    }

    const onConfirm = (e: FormEvent | undefined) => {
        if (e) {
            e.preventDefault();
        }
        const newTask = {...defaultObject};
        newTask.title = currentInput;
        if (!editTaskId) {
            onAddConfirm(newTask);
        } else {
            onEditConfirm(editTaskId, newTask);
        }
        setModalOpen(false);
    }


  return (
    <div className={styles.page}>
      <main className={styles.main}>
          <AddTask
              onAdd={onAdd}
          />
          <TaskList>
              {Object.entries(tasks).map(([id, task]) => (
                  <Task
                      key={id}
                      task={task}
                      taskId={id}
                      onEdit={onEdit}
                      onDelete={onDelete}
                      onCompleted={onMarkComplete}
                  />
              ))}
          </TaskList>
          <Modal modalOpen={modalOpen} onClose={()=>{setModalOpen(false)}}>
              <span style={{fontWeight: 'bold', marginTop: '10px'}}>{editTaskId ? 'Edit' : 'Create'}</span>
              <form onSubmit={onConfirm} style={{width:'100%', display:'flex', gap: '10px'}}>
                  <input
                      style={{width: '100%'}}
                      ref={inputRef}
                      type="text"
                      onChange={(e) => setCurrentInput(e.target.value)}
                      value={currentInput}
                  />
                  <ConfirmButton
                      onClick={onConfirm}
                  />
              </form>
          </Modal>
      </main>
    </div>
  );
}
