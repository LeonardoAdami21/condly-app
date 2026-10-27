import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { QueryParams } from '@/services/api';
import type { createCrudService } from '@/services/crud';

/**
 * Gera os hooks do React Query para um recurso CRUD. Criar, atualizar e remover
 * invalidam o cache do recurso, então as listas na tela se atualizam sozinhas.
 */
export function createCrudHooks<T, CreateInput, UpdateInput, ListParams extends QueryParams>(
  key: string,
  service: ReturnType<typeof createCrudService<T, CreateInput, UpdateInput, ListParams>>,
) {
  const keys = {
    all: [key] as const,
    list: (params?: ListParams) => [key, 'list', params ?? {}] as const,
    detail: (id: string) => [key, 'detail', id] as const,
  };

  return {
    keys,
    useList: (params?: ListParams) =>
      useQuery({ queryKey: keys.list(params), queryFn: () => service.list(params) }),

    useDetail: (id: string | undefined) =>
      useQuery({
        queryKey: keys.detail(id ?? ''),
        queryFn: () => service.get(id!),
        enabled: !!id,
      }),

    useCreate: () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: service.create,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.all }),
      });
    },

    useUpdate: () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: ({ id, input }: { id: string; input: UpdateInput }) => service.update(id, input),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.all }),
      });
    },

    useRemove: () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: service.remove,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.all }),
      });
    },
  };
}
