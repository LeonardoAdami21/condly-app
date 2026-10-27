import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const TOKEN_KEY = 'condly.auth-token';

/**
 * Guarda o token JWT de forma segura (Keychain no iOS, Keystore no Android).
 * O SecureStore não existe na web, então lá usamos o localStorage.
 */
export const tokenStorage = {
  async get() {
    if (Platform.OS === 'web') return localStorage.getItem(TOKEN_KEY);
    return SecureStore.getItemAsync(TOKEN_KEY);
  },
  async set(token: string) {
    if (Platform.OS === 'web') return localStorage.setItem(TOKEN_KEY, token);
    return SecureStore.setItemAsync(TOKEN_KEY, token);
  },
  async remove() {
    if (Platform.OS === 'web') return localStorage.removeItem(TOKEN_KEY);
    return SecureStore.deleteItemAsync(TOKEN_KEY);
  },
};
