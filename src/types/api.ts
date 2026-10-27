/**
 * Tipos compartilhados das respostas da API.
 * ATENÇÃO: o Swagger não documenta o formato das respostas, então `Paginated`
 * é uma suposição — confira com uma resposta real de GET /api/users.
 */
export type Paginated<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
};

export type PaginationParams = {
  page?: number;
  limit?: number;
};

export type Entity = {
  id: string;
  createdAt: string;
  updatedAt: string;
};
