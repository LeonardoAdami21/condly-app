import { createCrudService } from '@/services/crud';
import type {
  Apartment,
  ApartmentListParams,
  CreateApartmentInput,
  UpdateApartmentInput,
} from '@/types/apartment';

export const apartmentsService = createCrudService<
  Apartment,
  CreateApartmentInput,
  UpdateApartmentInput,
  ApartmentListParams
>('/apartments');
