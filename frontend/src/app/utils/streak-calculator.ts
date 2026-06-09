import { GoalCompletion } from '../types/goal';
import { formatDate, parseDateString, getDaysDifference } from './date-helpers';

export interface StreakInfo {
  currentStreak: number;
  longestStreak: number;
}

export const calculateStreak = (completions: GoalCompletion[]): StreakInfo => {
  if (completions.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  // Ordenar completions por data (mais recente primeiro)
  const sortedCompletions = [...completions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Remover duplicatas de mesma data
  const uniqueDates = Array.from(
    new Set(sortedCompletions.map(c => c.date))
  ).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  const today = formatDate(new Date());
  const todayDate = new Date(today);

  // Calcular streak atual
  for (let i = 0; i < uniqueDates.length; i++) {
    const currentDate = new Date(uniqueDates[i]);
    const expectedDate = new Date(todayDate);
    expectedDate.setDate(expectedDate.getDate() - i);

    const diff = getDaysDifference(currentDate, expectedDate);

    if (diff === 0) {
      currentStreak++;
    } else {
      break;
    }
  }

  // Calcular maior streak
  for (let i = 0; i < uniqueDates.length; i++) {
    tempStreak = 1;

    for (let j = i + 1; j < uniqueDates.length; j++) {
      const prevDate = new Date(uniqueDates[j - 1]);
      const currDate = new Date(uniqueDates[j]);
      const diff = getDaysDifference(prevDate, currDate);

      if (diff === 1) {
        tempStreak++;
      } else {
        break;
      }
    }

    longestStreak = Math.max(longestStreak, tempStreak);
  }

  return {
    currentStreak,
    longestStreak: Math.max(longestStreak, currentStreak),
  };
};
