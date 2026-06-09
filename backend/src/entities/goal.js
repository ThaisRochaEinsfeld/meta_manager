export class Goal {
    id
    title
    description
    frequency
    target
    completed
    userId
    targetDaysPerWeek
    color
    createdAt
    updatedAt

    constructor(
        id,
        title,
        description,
        frequency,
        target = null,
        completed = false,
        userId = null,
        targetDaysPerWeek = null,
        color = '#3b82f6',
        createdAt = new Date(),
        updatedAt = new Date()
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.frequency = frequency;
        this.target = target;
        this.completed = Boolean(completed);
        this.userId = userId;
        this.targetDaysPerWeek = targetDaysPerWeek;
        this.color = color;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    updateEntity() {
        this.updatedAt = new Date();
    }
}
