import { api, type QueryParams } from '@/services/api';
import type { Paginated } from '@/types/api';

/** Gera as operações padrão (listar, buscar, criar, atualizar, remover) de um recurso REST. */
export function createCrudService<T, CreateInput, UpdateInput, ListParams extends QueryParams>(
  path: string,
) {
  return {
    list: (params?: ListParams) => api<Paginated<T>>(path, { params }),
    get: (id: string) => api<T>(`${path}/${id}`),
    create: (input: CreateInput) => api<T>(path, { method: 'POST', body: input }),
    update: (id: string, input: UpdateInput) =>
      api<T>(`${path}/${id}`, { method: 'PATCH', body: input }),
    remove: (id: string) => api<void>(`${path}/${id}`, { method: 'DELETE' }),
  };
}
