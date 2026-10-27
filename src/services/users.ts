import { api } from '@/services/api';
import { createCrudService } from '@/services/crud';
import type { CreateUserInput, UpdateUserInput, User, UserListParams } from '@/types/user';

export const usersService = {
  ...createCrudService<User, CreateUserInput, UpdateUserInput, UserListParams>('/users'),
  /** Registra o token de push (Firebase) do aparelho para o usuário logado. */
  registerPushToken: (fcmToken: string) =>
    api<void>('/users/me/fcm-token', { method: 'PATCH', body: { fcmToken } }),
};
