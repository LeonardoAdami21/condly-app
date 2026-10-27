import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, use, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';

import { setAuthToken, setUnauthorizedHandler } from '@/services/api';
import { authService } from '@/services/auth';
import { tokenStorage } from '@/services/token-storage';
import type { LoginInput } from '@/types/auth';
import type { User } from '@/types/user';

type AuthStatus = 'loading' | 'signedIn' | 'signedOut';

type AuthContextValue = {
  status: AuthStatus;
  user: User | undefined;
  signIn: (input: LoginInput) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const meQueryKey = ['auth', 'me'] as const;

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<AuthStatus>('loading');

  const signOut = useCallback(async () => {
    setAuthToken(null);
    await tokenStorage.remove();
    queryClient.clear();
    setStatus('signedOut');
  }, [queryClient]);

  // Restaura a sessão salva ao abrir o app.
  useEffect(() => {
    tokenStorage
      .get()
      .then((token) => {
        setAuthToken(token);
        setStatus(token ? 'signedIn' : 'signedOut');
      })
      .catch(() => setStatus('signedOut'));
  }, []);

  // Token expirado/inválido: desloga automaticamente.
  useEffect(() => {
    setUnauthorizedHandler(() => void signOut());
    return () => setUnauthorizedHandler(null);
  }, [signOut]);

  const { data: user } = useQuery({
    queryKey: meQueryKey,
    queryFn: authService.me,
    enabled: status === 'signedIn',
  });

  const signIn = useCallback(
    async (input: LoginInput) => {
      const { accessToken, user } = await authService.login(input);
      setAuthToken(accessToken);
      await tokenStorage.set(accessToken);
      if (user) queryClient.setQueryData(meQueryKey, user);
      setStatus('signedIn');
    },
    [queryClient],
  );

  const value = useMemo(() => ({ status, user, signIn, signOut }), [status, user, signIn, signOut]);

  return <AuthContext value={value}>{children}</AuthContext>;
}

export function useAuth() {
  const context = use(AuthContext);
  if (!context) throw new Error('useAuth precisa estar dentro de <AuthProvider>.');
  return context;
}
