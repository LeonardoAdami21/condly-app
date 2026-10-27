import { createCrudHooks } from '@/hooks/queries/create-crud-hooks';
import { condominiumsService } from '@/services/condominiums';

const condominiums = createCrudHooks('condominiums', condominiumsService);

export const condominiumKeys = condominiums.keys;
export const useCondominiums = condominiums.useList;
export const useCondominium = condominiums.useDetail;
export const useCreateCondominium = condominiums.useCreate;
export const useUpdateCondominium = condominiums.useUpdate;
export const useRemoveCondominium = condominiums.useRemove;
