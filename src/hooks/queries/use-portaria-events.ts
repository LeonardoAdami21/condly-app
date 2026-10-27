import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { portariaEventsService } from '@/services/portaria-events';
import type { PortariaEventListParams, RespondPortariaEventInput } from '@/types/portaria-event';

export const portariaEventKeys = {
  all: ['portaria-events'] as const,
  list: (params?: PortariaEventListParams) => ['portaria-events', 'list', params ?? {}] as const,
  detail: (id: string) => ['portaria-events', 'detail', id] as const,
};

export function usePortariaEvents(params?: PortariaEventListParams) {
  return useQuery({
    queryKey: portariaEventKeys.list(params),
    queryFn: () => portariaEventsService.list(params),
  });
}

export function usePortariaEvent(id: string | undefined) {
  return useQuery({
    queryKey: portariaEventKeys.detail(id ?? ''),
    queryFn: () => portariaEventsService.get(id!),
    enabled: !!id,
  });
}

export function useRespondPortariaEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: RespondPortariaEventInput }) =>
      portariaEventsService.respond(id, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: portariaEventKeys.all }),
  });
}

export function useFinalizePortariaEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: portariaEventsService.finalize,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: portariaEventKeys.all }),
  });
}
