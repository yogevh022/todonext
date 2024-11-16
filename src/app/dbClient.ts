
interface ITaskID {
    id: string
}

export async function getTasks() {
    const response = await fetch("/api/tasks");
    return response.json();
}

export async function addTask(task: { title: string }): Promise<ITaskID> {
    return fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => {
        if (response.ok) {
            return response.json();
        }
        Promise.reject(response);
    });
}

export async function deleteTask(id: string) {
    fetch(`/api/tasks/${id}`, {
        method: "DELETE",
    }).then((response) => (response.ok ? response.json() : Promise.reject(response)))
}

export async function editTask(id: string, task: { title: string }) {
    fetch(`/api/tasks/${id}`, {
        method: "PUT",
        body: JSON.stringify(task),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => (response.ok ? response.json() : Promise.reject(response)))
}
