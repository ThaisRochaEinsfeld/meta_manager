import { Goal } from '../types/goal';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export interface ApiUser {
  id: string;
  name: string;
  email: string;
}

type BackendGoal = Goal & {
  userId?: string | null;
  target?: string | null;
  completed?: boolean;
  updatedAt?: string;
};

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.error || 'Erro ao comunicar com o servidor');
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

export const api = {
  login: async (email: string, password: string): Promise<ApiUser> => {
    const data = await request<{ user: ApiUser }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    return data.user;
  },

  getGoals: (userId?: string): Promise<BackendGoal[]> => {
    const query = userId ? `?userId=${encodeURIComponent(userId)}` : '';
    return request<BackendGoal[]>(`/goals${query}`);
  },

  createGoal: (goal: Omit<Goal, 'id' | 'createdAt'> & { userId?: string }): Promise<BackendGoal> => {
    return request<BackendGoal>('/goals', {
      method: 'POST',
      body: JSON.stringify(goal),
    });
  },

  updateGoal: (id: string, goal: Partial<Goal>): Promise<BackendGoal> => {
    return request<BackendGoal>(`/goals/${id}`, {
      method: 'PUT',
      body: JSON.stringify(goal),
    });
  },

  deleteGoal: (id: string): Promise<void> => {
    return request<void>(`/goals/${id}`, { method: 'DELETE' });
  },

  setCompleted: (id: string, completed: boolean): Promise<BackendGoal> => {
    return request<BackendGoal>(`/goals/${id}/completed`, {
      method: 'PATCH',
      body: JSON.stringify({ completed }),
    });
  },
};
