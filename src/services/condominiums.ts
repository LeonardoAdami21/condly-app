import { createCrudService } from '@/services/crud';
import type {
  Condominium,
  CondominiumListParams,
  CreateCondominiumInput,
  UpdateCondominiumInput,
} from '@/types/condominium';

export const condominiumsService = createCrudService<
  Condominium,
  CreateCondominiumInput,
  UpdateCondominiumInput,
  CondominiumListParams
>('/condominiums');
