export type GoalFrequency = 'daily' | 'weekly' | 'custom';

export interface Goal {
  id: string;
  title: string;
  description: string;
  frequency: GoalFrequency;
  targetDaysPerWeek?: number; // Para frequência custom
  createdAt: string;
  color: string;
  completed?: boolean;
  userId?: string | null;
  updatedAt?: string;
}

export interface GoalCompletion {
  id: string;
  goalId: string;
  date: string; // ISO format YYYY-MM-DD
  completedAt: string; // ISO timestamp
}

export interface GoalStats {
  goalId: string;
  currentStreak: number;
  longestStreak: number;
  totalCompletions: number;
  weeklyCompletions: number;
  monthlyCompletions: number;
  completionRate: number; // Percentage
}
