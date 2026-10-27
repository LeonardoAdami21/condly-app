import type { Entity, PaginationParams } from '@/types/api';

export type Apartment = Entity & {
  condominiumId: string;
  number: string;
  /** Bloco/torre. */
  block?: string;
  floor?: number;
};

export type CreateApartmentInput = Omit<Apartment, keyof Entity>;

export type UpdateApartmentInput = Partial<Omit<CreateApartmentInput, 'condominiumId'>>;

export type ApartmentListParams = PaginationParams & {
  condominiumId?: string;
  block?: string;
};
