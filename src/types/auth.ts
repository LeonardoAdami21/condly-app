import type { User } from '@/types/user';

export type LoginInput = {
  email: string;
  password: string;
};

/** ATENÇÃO: formato suposto — confira o nome do campo do token na resposta real de /api/auth/login. */
export type LoginResponse = {
  accessToken: string;
  user?: User;
};
