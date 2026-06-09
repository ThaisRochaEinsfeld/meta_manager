import { useState, useEffect } from 'react';
import { Goal, GoalCompletion, GoalStats } from '../types/goal';
import { storage } from '../utils/storage';
import { calculateStreak } from '../utils/streak-calculator';
import { getWeekRange, getMonthRange, formatDate, parseDateString, isDateInRange } from '../utils/date-helpers';
import { api } from '../lib/api';
import { useAuth } from './useAuth';

function normaliseGoal(goal: Goal): Goal {
  return {
    ...goal,
    id: String(goal.id),
    description: goal.description || '',
    color: goal.color || '#3b82f6',
    createdAt: goal.createdAt || new Date().toISOString(),
  };
}

export const useGoals = () => {
  const { user } = useAuth();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [completions, setCompletions] = useState<GoalCompletion[]>([]);
  const [useLocalFallback, setUseLocalFallback] = useState(false);

  useEffect(() => {
    const loadGoals = async () => {
      try {
        const apiGoals = await api.getGoals(user?.id);
        setGoals(apiGoals.map(normaliseGoal));
        setUseLocalFallback(false);
      } catch {
        setGoals(storage.getGoals());
        setUseLocalFallback(true);
      }

      setCompletions(storage.getCompletions());
    };

    loadGoals();
  }, [user?.id]);

  const saveGoals = (newGoals: Goal[]) => {
    setGoals(newGoals);
    if (useLocalFallback) {
      storage.saveGoals(newGoals);
    }
  };

  const saveCompletions = (newCompletions: GoalCompletion[]) => {
    setCompletions(newCompletions);
    storage.saveCompletions(newCompletions);
  };

  const createGoal = async (goal: Omit<Goal, 'id' | 'createdAt'>) => {
    if (useLocalFallback) {
      const newGoal: Goal = {
        ...goal,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      saveGoals([...goals, newGoal]);
      return newGoal;
    }

    const createdGoal = normaliseGoal(await api.createGoal({ ...goal, userId: user?.id }));
    saveGoals([...goals, createdGoal]);
    return createdGoal;
  };

  const updateGoal = async (id: string, updates: Partial<Goal>) => {
    if (useLocalFallback) {
      const updatedGoals = goals.map(goal =>
        goal.id === id ? { ...goal, ...updates } : goal
      );
      saveGoals(updatedGoals);
      return;
    }

    const updatedGoal = normaliseGoal(await api.updateGoal(id, updates));
    saveGoals(goals.map(goal => (goal.id === id ? updatedGoal : goal)));
  };

  const deleteGoal = async (id: string) => {
    if (!useLocalFallback) {
      await api.deleteGoal(id);
    }

    saveGoals(goals.filter(goal => goal.id !== id));
    saveCompletions(completions.filter(c => c.goalId !== id));
  };

  const toggleCompletion = async (goalId: string, date: string = formatDate(new Date())) => {
    const existing = completions.find(
      c => c.goalId === goalId && c.date === date
    );

    if (existing) {
      if (!useLocalFallback) {
        await api.setCompleted(goalId, false);
      }
      saveCompletions(completions.filter(c => c.id !== existing.id));
      saveGoals(goals.map(goal => goal.id === goalId ? { ...goal, completed: false } : goal));
      return;
    }

    if (!useLocalFallback) {
      await api.setCompleted(goalId, true);
    }

    const newCompletion: GoalCompletion = {
      id: crypto.randomUUID(),
      goalId,
      date,
      completedAt: new Date().toISOString(),
    };

    saveCompletions([...completions, newCompletion]);
    saveGoals(goals.map(goal => goal.id === goalId ? { ...goal, completed: true } : goal));
  };

  const isCompleted = (goalId: string, date: string = formatDate(new Date())): boolean => {
    const isCompletedLocally = completions.some(c => c.goalId === goalId && c.date === date);
    const isCompletedInApi = date === formatDate(new Date()) && goals.some(goal => goal.id === goalId && Boolean((goal as Goal & { completed?: boolean }).completed));

    return isCompletedLocally || isCompletedInApi;
  };

  const getGoalCompletions = (goalId: string): GoalCompletion[] => {
    const goal = goals.find(g => g.id === goalId) as Goal & { completed?: boolean } | undefined;
    const today = formatDate(new Date());
    const existingCompletions = completions.filter(c => c.goalId === goalId);

    if (goal?.completed && !existingCompletions.some(c => c.date === today)) {
      return [
        ...existingCompletions,
        {
          id: `api-completion-${goalId}-${today}`,
          goalId,
          date: today,
          completedAt: new Date().toISOString(),
        },
      ];
    }

    return existingCompletions;
  };

  const getGoalStats = (goalId: string): GoalStats => {
    const goalCompletions = getGoalCompletions(goalId);
    const { currentStreak, longestStreak } = calculateStreak(goalCompletions);

    const weekRange = getWeekRange();
    const monthRange = getMonthRange();

    const weeklyCompletions = goalCompletions.filter(c => {
      const date = parseDateString(c.date);
      return isDateInRange(date, weekRange.start, weekRange.end);
    }).length;

    const monthlyCompletions = goalCompletions.filter(c => {
      const date = parseDateString(c.date);
      return isDateInRange(date, monthRange.start, monthRange.end);
    }).length;

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentCompletions = goalCompletions.filter(c => {
      return new Date(c.date) >= thirtyDaysAgo;
    }).length;
    const completionRate = (recentCompletions / 30) * 100;

    return {
      goalId,
      currentStreak,
      longestStreak,
      totalCompletions: goalCompletions.length,
      weeklyCompletions,
      monthlyCompletions,
      completionRate,
    };
  };

  const getAllStats = (): GoalStats[] => {
    return goals.map(goal => getGoalStats(goal.id));
  };

  return {
    goals,
    completions,
    createGoal,
    updateGoal,
    deleteGoal,
    toggleCompletion,
    isCompleted,
    getGoalCompletions,
    getGoalStats,
    getAllStats,
  };
};
