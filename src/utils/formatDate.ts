export function formatDate(timestamp: number): string {
    const d = new Date(timestamp);
    return d.toLocaleDateString("ru-RU"); 
}

export function parseDate(str: string): number {
    const [d, m, y]: number[] = str.split(".").map(Number);
    const date = new Date(y, m - 1, d);
    if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) {
        return new Date().getTime();
    }
    return date.getTime();
}
