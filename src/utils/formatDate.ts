export function formatDate(timestamp: number): string {
    const d = new Date(timestamp);
    return d.toLocaleDateString("ru-RU"); 
}

export function parseDate(str: string): number {
  const [day, month, year]: number[] = str.split(".").map(Number);
  return new Date(year, month - 1, day).getTime();
}
