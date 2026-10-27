import type { Entity, PaginationParams } from '@/types/api';

export type PortariaEventType = 'VISITANTE' | 'ENCOMENDA' | 'PRESTADOR_SERVICO';

export type PortariaEventStatus = 'PENDENTE' | 'AUTORIZADO' | 'NEGADO' | 'FINALIZADO';

export type PortariaEvent = Entity & {
  type: PortariaEventType;
  status: PortariaEventStatus;
  apartmentId: string;
  condominiumId?: string;
  personName?: string;
  personDocument?: string;
  description?: string;
  externalId?: string;
};

export type RespondPortariaEventInput = {
  status: Extract<PortariaEventStatus, 'AUTORIZADO' | 'NEGADO'>;
};

export type PortariaEventListParams = PaginationParams & {
  condominiumId?: string;
  apartmentId?: string;
  status?: PortariaEventStatus;
  type?: PortariaEventType;
};
