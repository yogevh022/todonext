import TodoList from "@/components/TodoList";
import TaskData from "@/types/task";
import styles from "@/app/page.module.css";

const fetchTasks = async (): Promise<TaskData[]> => {
    return await fetch('http://localhost:3000/api/tasks', { cache: 'no-store'})
        .then((response) => response.json())
        .catch((error) => {console.error('Error:', error); return []});
}

export default async function Home() {
    const initialTasksData: TaskData[] = await fetchTasks();

    return (
      <main className={styles.main}>
          <TodoList initialTasks={initialTasksData} />
      </main>
  );
}
