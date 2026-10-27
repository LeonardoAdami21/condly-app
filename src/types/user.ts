import type { Entity, PaginationParams } from '@/types/api';

export type UserRole = 'ADMIN' | 'SINDICO' | 'PORTEIRO' | 'MORADOR';

export type User = Entity & {
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  condominiumId?: string;
  apartmentId?: string;
};

export type CreateUserInput = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: UserRole;
  /** Obrigatório para SINDICO e PORTEIRO. */
  condominiumId?: string;
  apartmentId?: string;
};

export type UpdateUserInput = Partial<CreateUserInput>;

export type UserListParams = PaginationParams & {
  condominiumId?: string;
  apartmentId?: string;
  role?: UserRole;
};
