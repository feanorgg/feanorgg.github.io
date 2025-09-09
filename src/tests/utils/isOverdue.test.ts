import Task from "../../types/Task";
import { getTodayTime } from "../../utils/dateOperations";
import { isOverdue } from "../../utils/isOverdue";

describe('isOverdue', () => {
    it('returns true for past dates and not done type', () => {
        const task: Task = {endDay: new Date(2023, 0, 1).getTime(), type: 'in_progress', startDay: 0, id: 1, text: 'Test Task'};
        expect(isOverdue(task)).toBe(true);
    });

    it('returns false for past dates and done type', () => {
        const task: Task = {endDay: new Date(2023, 0, 1).getTime(), type: 'done', startDay: 0, id: 1, text: 'Test Task'};
        expect(isOverdue(task)).toBe(false);
    });

    it('returns false for today', () => {
        const task: Task = {endDay: getTodayTime(), type: 'todo', startDay: 0, id: 1, text: 'Test Task'};
        expect(isOverdue(task)).toBe(false);
    });

    it('returns false for future dates', () => {
        const task: Task = {endDay: Date.now() + 8.64e7, type: 'todo', startDay: 0, id: 1, text: 'Test Task'};
        expect(isOverdue(task)).toBe(false);
    });
});
