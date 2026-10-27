/**
 * Variáveis de ambiente do app. O Expo só embute variáveis EXPO_PUBLIC_* e
 * apenas quando acessadas de forma estática (process.env.EXPO_PUBLIC_X).
 * https://docs.expo.dev/guides/environment-variables/
 */

function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Variável de ambiente ausente: ${name}. Confira o arquivo .env.`);
  }
  return value;
}

export const env = {
  apiUrl: required('EXPO_PUBLIC_API_URL', process.env.EXPO_PUBLIC_API_URL),
} as const;
