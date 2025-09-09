import Task from "../types/Task";
import { getTodayTime } from "./dateOperations";

export function isOverdue(task: Task): boolean {
    return task.type !== 'done' && task.endDay < getTodayTime();
}
