import { Goal, GoalCompletion } from '../types/goal';
import { createSampleData } from './sample-data';

const GOALS_KEY = 'metamanager_goals';
const COMPLETIONS_KEY = 'metamanager_completions';
const INITIALIZED_KEY = 'metamanager_initialized';

export const storage = {
  // Goals
  getGoals: (): Goal[] => {
    try {
      // Initialize with sample data if first time
      if (!localStorage.getItem(INITIALIZED_KEY)) {
        const { goals, completions } = createSampleData();
        localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
        localStorage.setItem(COMPLETIONS_KEY, JSON.stringify(completions));
        localStorage.setItem(INITIALIZED_KEY, 'true');
        return goals;
      }
      
      const data = localStorage.getItem(GOALS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveGoals: (goals: Goal[]): void => {
    localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
  },

  // Completions
  getCompletions: (): GoalCompletion[] => {
    try {
      const data = localStorage.getItem(COMPLETIONS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveCompletions: (completions: GoalCompletion[]): void => {
    localStorage.setItem(COMPLETIONS_KEY, JSON.stringify(completions));
  },

  // Clear all data
  clearAll: (): void => {
    localStorage.removeItem(GOALS_KEY);
    localStorage.removeItem(COMPLETIONS_KEY);
    localStorage.removeItem(INITIALIZED_KEY);
  },
};