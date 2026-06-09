import goalRepository from '../repositories/goalRepository.js';
import { GoalView } from '../views/goalView.js'

function goalValidator(goal) {
    return goal !== null && goal !== undefined;
}

function toView(goal) {
    return new GoalView(goal);
}

async function getAllGoals(userId = null) {
    const goals = await goalRepository.findAll(userId);
    return goals.map(toView);
}

async function getGoalById(id, userId = null) {
    const goal = await goalRepository.findById(id, userId);
    return goal ? toView(goal) : null;
}

async function createNewGoal(goal) {
    const newGoal = {
        title: goal.title,
        description: goal.description || '',
        target: goal.target || null,
        frequency: goal.frequency,
        completed: Boolean(goal.completed),
        userId: goal.userId || null,
        targetDaysPerWeek: goal.targetDaysPerWeek || null,
        color: goal.color || '#3b82f6'
    };

    const createdGoal = await goalRepository.create(newGoal);
    return createdGoal ? toView(createdGoal) : null;
}

async function updateGoal(id, data) {
    const goal = await goalRepository.findById(id);

    if (!goalValidator(goal)) return null;

    const updatedGoal = await goalRepository.update(id, {
        title: data.title ?? goal.title,
        description: data.description ?? goal.description,
        target: data.target ?? goal.target,
        frequency: data.frequency ?? goal.frequency,
        targetDaysPerWeek: data.targetDaysPerWeek ?? goal.targetDaysPerWeek,
        color: data.color ?? goal.color
    });

    return updatedGoal ? toView(updatedGoal) : null;
}

async function removeGoal(id) {
    const goal = await goalRepository.findById(id);

    if (goalValidator(goal)) {
        await goalRepository.remove(id);
        return true;
    }

    return false;
}

async function setGoalCompleted(id, completed) {
    const goal = await goalRepository.findById(id);

    if (!goalValidator(goal)) return null;

    const updatedGoal = await goalRepository.setCompleted(id, completed);
    return updatedGoal ? toView(updatedGoal) : null;
}

async function completeGoal(id) {
    return setGoalCompleted(id, true);
}

export default {
    getAllGoals,
    getGoalById,
    createNewGoal,
    updateGoal,
    removeGoal,
    setGoalCompleted,
    completeGoal
}
