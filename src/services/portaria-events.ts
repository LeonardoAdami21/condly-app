import { api } from '@/services/api';
import type { Paginated } from '@/types/api';
import type {
  PortariaEvent,
  PortariaEventListParams,
  RespondPortariaEventInput,
} from '@/types/portaria-event';

export const portariaEventsService = {
  list: (params?: PortariaEventListParams) =>
    api<Paginated<PortariaEvent>>('/portaria-events', { params }),
  get: (id: string) => api<PortariaEvent>(`/portaria-events/${id}`),
  /** Morador autoriza ou nega a entrada. */
  respond: (id: string, input: RespondPortariaEventInput) =>
    api<PortariaEvent>(`/portaria-events/${id}/respond`, { method: 'PATCH', body: input }),
  /** Marca a entrada/entrega como concluída. */
  finalize: (id: string) =>
    api<PortariaEvent>(`/portaria-events/${id}/finalize`, { method: 'PATCH' }),
};
