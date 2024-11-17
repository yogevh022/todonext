// since this only runs on the server, you should add 'use server'; to the top of the file.
import TaskData from "@/types/task";

class Database {
    tasks: TaskData[] = [];
    idIncrement = 0;
    private static instance: Database | null = null;
    private constructor() {}

    static getInstance(): Database {
        if (Database.instance === null) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    addTask(newTask: TaskData) {
        this.idIncrement++;
        const createdTask = {...newTask, _id: this.idIncrement.toString()};
        this.tasks.push(createdTask);
        return createdTask; // returning only in addTask because I need the id
    }

    deleteTask(taskId: string) {
        this.tasks = this.tasks.filter(task => task._id !== taskId);
    }

    updateTask(taskData: TaskData) {
        this.tasks = this.tasks.map(task => task._id === taskData._id ? taskData : task);
    }
}

export default Database;