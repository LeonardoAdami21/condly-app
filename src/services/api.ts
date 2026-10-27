import { env } from '@/config/env';

export class ApiError extends Error {
  constructor(
    public status: number,
    public body: unknown,
  ) {
    super(getErrorMessage(body) ?? `Erro na requisição (${status})`);
  }
}

/** Extrai a mensagem de erro do corpo padrão do NestJS ({ message: string | string[] }). */
function getErrorMessage(body: unknown): string | undefined {
  if (!body || typeof body !== 'object' || !('message' in body)) return undefined;
  const { message } = body as { message: unknown };
  if (Array.isArray(message)) return message.join('\n');
  return typeof message === 'string' ? message : undefined;
}

export type QueryParams = Record<string, string | number | boolean | undefined | null>;

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
  params?: QueryParams;
};

let authToken: string | null = null;
let onUnauthorized: (() => void) | null = null;

/** Define o token JWT enviado em todas as requisições (null para remover). */
export function setAuthToken(token: string | null) {
  authToken = token;
}

/** Função chamada quando a API responde 401 (token expirado ou inválido). */
export function setUnauthorizedHandler(handler: (() => void) | null) {
  onUnauthorized = handler;
}

function buildQuery(params?: QueryParams) {
  if (!params) return '';
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') search.append(key, String(value));
  }
  const query = search.toString();
  return query ? `?${query}` : '';
}

export async function api<T>(
  path: string,
  { body, headers, params, ...init }: RequestOptions = {},
): Promise<T> {
  const response = await fetch(`${env.apiUrl}${path}${buildQuery(params)}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(authToken && { Authorization: `Bearer ${authToken}` }),
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const data = response.status === 204 ? null : await response.json().catch(() => null);

  if (!response.ok) {
    if (response.status === 401 && authToken) onUnauthorized?.();
    throw new ApiError(response.status, data);
  }

  return data as T;
}
