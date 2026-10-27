import { createCrudHooks } from '@/hooks/queries/create-crud-hooks';
import { apartmentsService } from '@/services/apartments';

const apartments = createCrudHooks('apartments', apartmentsService);

export const apartmentKeys = apartments.keys;
export const useApartments = apartments.useList;
export const useApartment = apartments.useDetail;
export const useCreateApartment = apartments.useCreate;
export const useUpdateApartment = apartments.useUpdate;
export const useRemoveApartment = apartments.useRemove;
