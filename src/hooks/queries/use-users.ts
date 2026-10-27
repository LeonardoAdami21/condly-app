import { useMutation } from '@tanstack/react-query';

import { createCrudHooks } from '@/hooks/queries/create-crud-hooks';
import { usersService } from '@/services/users';

const users = createCrudHooks('users', usersService);

export const userKeys = users.keys;
export const useUsers = users.useList;
export const useUser = users.useDetail;
export const useCreateUser = users.useCreate;
export const useUpdateUser = users.useUpdate;
export const useRemoveUser = users.useRemove;

export function useRegisterPushToken() {
  return useMutation({ mutationFn: usersService.registerPushToken });
}
