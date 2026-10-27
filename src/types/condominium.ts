import type { Entity, PaginationParams } from '@/types/api';

export type Condominium = Entity & {
  name: string;
  cnpj: string;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  zipCode: string;
  condlyPortariaId?: string;
};

export type CreateCondominiumInput = Omit<Condominium, keyof Entity>;

export type UpdateCondominiumInput = Partial<CreateCondominiumInput>;

export type CondominiumListParams = PaginationParams;
