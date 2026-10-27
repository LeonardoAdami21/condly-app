import { Stack } from 'expo-router';

/** Telas que exigem login. A proteção fica no layout raiz (Stack.Protected). */
export default function AppLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
