import Task from "../types/Task";

export function isOverdue(task: Task): boolean {
    return task.type !== 'done' && task.endDay < Date.now();
}
