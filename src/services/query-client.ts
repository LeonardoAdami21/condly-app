import { QueryClient } from '@tanstack/react-query';

import { ApiError } from '@/services/api';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      // Não adianta repetir erros do cliente (ex.: 401, 404, validação); só falhas de rede/servidor.
      retry: (failureCount, error) =>
        !(error instanceof ApiError && error.status < 500) && failureCount < 2,
    },
  },
});
