import Task from "../../types/Task";
import { isOverdue } from "../../utils/isOverdue";

describe('isOverdue', () => {
    it('returns true for past dates and not done type', () => {
        const task: Task = {endDay: Date.now() - 1000, type: 'in_progress', startDay: 0, id: 1, text: 'Test Task'};
        expect(isOverdue(task)).toBe(true);
    });

    it('returns false for past dates and done type', () => {
        const task: Task = {endDay: Date.now() - 1000, type: 'done', startDay: 0, id: 1, text: 'Test Task'};
        expect(isOverdue(task)).toBe(false);
    });

    it('returns false for future dates', () => {
        const task: Task = {endDay: Date.now() + 1000, type: 'todo', startDay: 0, id: 1, text: 'Test Task'};
        expect(isOverdue(task)).toBe(false);
    });
});
