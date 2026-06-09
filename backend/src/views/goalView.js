export class GoalView {
    constructor(goal) {
        this.id = String(goal.id);
        this.title = goal.title;
        this.description = goal.description || '';
        this.frequency = goal.frequency;
        this.target = goal.target;
        this.completed = Boolean(goal.completed);
        this.userId = goal.userId ? String(goal.userId) : null;
        this.targetDaysPerWeek = goal.targetDaysPerWeek;
        this.color = goal.color || '#3b82f6';
        this.createdAt = goal.createdAt;
        this.updatedAt = goal.updatedAt;
    }
}
