
interface ITask {
    title: string,
    completed: boolean,
}

class database {
    tasks: { [key: string]: ITask} = {};
    private static instance: database;

    constructor() {
        this.tasks = {};
    }

    static getInstance(): database {
        if (!database.instance) {
            console.log(database);
            database.instance = new database();
        }
        return database.instance;
    }

    getTasks() {
        return this.tasks;
    }

    getTask(id: string): ITask | undefined {
        return this.tasks[id];
    }

    addTask(task: ITask): string {
        const id = Object.keys(this.tasks).length.toString();
        this.tasks[id] = task;
        return id;
    }

    deleteTask(id: string) {
        if (!this.tasks[id]) {
            return;
        }
        delete this.tasks[id];
    }

    editTask(id: string, task: ITask) {
        if (!this.tasks[id]) {
            return;
        }
        this.tasks[id] = task;
    }
}
export {database};