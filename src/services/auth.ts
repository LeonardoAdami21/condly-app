import { api } from '@/services/api';
import type { LoginInput, LoginResponse } from '@/types/auth';
import type { User } from '@/types/user';

export const authService = {
  login: (input: LoginInput) => api<LoginResponse>('/auth/login', { method: 'POST', body: input }),
  me: () => api<User>('/auth/me'),
};
