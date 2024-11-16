import React, {useRef, useContext, forwardRef, useImperativeHandle} from "react";
import { TaskFormContext, ModalContext, TodoListContext } from "@/components/TodoList";
import styles from "./TaskForm.module.css";
import TaskData from "@/types/task";

export interface FormInputHandle {
    focus: () => void;
    setValue: (value: string) => void;
}

const TaskForm = forwardRef<FormInputHandle>((props, ref) => {
    const [inputValue, setInputValue] = React.useState('');
    const inputRef = useRef<HTMLInputElement | null>(null);

    useImperativeHandle(ref, () => ({
        focus: () => {
            if ( inputRef.current && "focus" in inputRef.current) {
                inputRef.current.focus();
            }
        },
        setValue: (value: string) => {
            setInputValue(value);
        },
    }));

    const taskFormContext = useContext(TaskFormContext);
    const modalContext = useContext(ModalContext);
    const todoListContext = useContext(TodoListContext);
    if (!taskFormContext || !modalContext || !todoListContext) {
        return null;
    }
    const { currentTaskEdit } = taskFormContext;
    const { modalOpen, closeModal } = modalContext;
    const { addTask, updateTask } = todoListContext;

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!modalOpen) { return; }
        if (currentTaskEdit.current !== null) {
            const newTask: TaskData = {...currentTaskEdit.current as TaskData, title: inputValue};
            updateTask(newTask);
        } else {
            addTask({ title: inputValue, completed: false });
        }
        closeModal();
    }

    return (
        <div className={styles.taskForm}>
            <span style={{fontWeight: 'bold'}}>{currentTaskEdit.current ? 'Edit' : 'Add'}</span>
            <form onSubmit={onSubmit}>
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button>Confirm</button>
            </form>
        </div>
    )
});

TaskForm.displayName = 'TaskForm'; // naming the forwardRef component
export default TaskForm;