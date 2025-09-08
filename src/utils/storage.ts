import defaultTasks from "../assets/tasks.json";
import Task from "../types/Task";

export function loadTasks() {
    const tasks = localStorage.getItem("tasks");
    if(!tasks) {
        localStorage.setItem("tasks", JSON.stringify(defaultTasks));
        return defaultTasks;
    }
    return JSON.parse(tasks) as Array<Task>;
}

export function saveTasks(tasks: Array<Task>) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
