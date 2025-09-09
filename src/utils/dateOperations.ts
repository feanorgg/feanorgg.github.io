import Task from "../types/Task";

export function getTodayTime(): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today.getTime();
}

export function formatDate(timestamp: number): string {
    const d = new Date(timestamp);
    return d.toLocaleDateString("ru-RU"); 
}

export function parseDate(str: string): number {
    const [d, m, y]: number[] = str.split(".").map(Number);
    const date = new Date(y, m - 1, d);
    if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) {
        return getTodayTime();
    }
    return date.getTime();
}

export function containsDate(task: Task, date: string): boolean {
    const [d, m, y]: number[] = date.split(".").map(Number);
    const dayStart = new Date(y, m - 1, d).getTime();
    const dayEnd = new Date(y, m - 1, d, 23, 59, 59, 999).getTime();
    return (task.startDay <= dayEnd && task.startDay >= dayStart) || (task.endDay <= dayEnd && task.endDay >= dayStart);
}
