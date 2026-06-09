import { Goal, GoalCompletion } from '../types/goal';
import { formatDate } from './date-helpers';

export const createSampleData = () => {
  const now = new Date();
  
  const sampleGoals: Goal[] = [
    {
      id: 'goal-1',
      title: 'Estudar Programação',
      description: 'Dedicar tempo para aprender novas tecnologias e melhorar habilidades de programação',
      frequency: 'daily',
      color: '#3b82f6',
      createdAt: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'goal-2',
      title: 'Praticar Exercícios',
      description: 'Manter uma rotina saudável com atividades físicas',
      frequency: 'custom',
      targetDaysPerWeek: 4,
      color: '#10b981',
      createdAt: new Date(now.getTime() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'goal-3',
      title: 'Ler Livros',
      description: 'Desenvolver o hábito da leitura com pelo menos 30 minutos por dia',
      frequency: 'daily',
      color: '#8b5cf6',
      createdAt: new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'goal-4',
      title: 'Meditar',
      description: 'Praticar mindfulness e meditação para saúde mental',
      frequency: 'custom',
      targetDaysPerWeek: 5,
      color: '#f59e0b',
      createdAt: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'goal-5',
      title: 'Aprender Inglês',
      description: 'Estudar inglês com apps e prática de conversação',
      frequency: 'custom',
      targetDaysPerWeek: 3,
      color: '#ec4899',
      createdAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  const sampleCompletions: GoalCompletion[] = [];

  // Generate completions for the last 30 days with realistic patterns
  for (let i = 0; i < 30; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dateStr = formatDate(date);

    // Goal 1: Estudar Programação - Very consistent (90% completion)
    if (Math.random() < 0.9) {
      sampleCompletions.push({
        id: `completion-1-${i}`,
        goalId: 'goal-1',
        date: dateStr,
        completedAt: new Date(date.getTime() + Math.random() * 12 * 60 * 60 * 1000).toISOString(),
      });
    }

    // Goal 2: Praticar Exercícios - 4x per week pattern
    if (i % 2 === 0 || Math.random() < 0.5) {
      sampleCompletions.push({
        id: `completion-2-${i}`,
        goalId: 'goal-2',
        date: dateStr,
        completedAt: new Date(date.getTime() + Math.random() * 12 * 60 * 60 * 1000).toISOString(),
      });
    }

    // Goal 3: Ler Livros - Good consistency (80%)
    if (Math.random() < 0.8) {
      sampleCompletions.push({
        id: `completion-3-${i}`,
        goalId: 'goal-3',
        date: dateStr,
        completedAt: new Date(date.getTime() + Math.random() * 12 * 60 * 60 * 1000).toISOString(),
      });
    }

    // Goal 4: Meditar - 5x per week pattern (70% consistency)
    const dayOfWeek = date.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6 && Math.random() < 0.8) {
      sampleCompletions.push({
        id: `completion-4-${i}`,
        goalId: 'goal-4',
        date: dateStr,
        completedAt: new Date(date.getTime() + Math.random() * 12 * 60 * 60 * 1000).toISOString(),
      });
    }

    // Goal 5: Aprender Inglês - 3x per week (moderate consistency, 50%)
    if (i < 10 && Math.random() < 0.5) {
      sampleCompletions.push({
        id: `completion-5-${i}`,
        goalId: 'goal-5',
        date: dateStr,
        completedAt: new Date(date.getTime() + Math.random() * 12 * 60 * 60 * 1000).toISOString(),
      });
    }
  }

  return { goals: sampleGoals, completions: sampleCompletions };
};
