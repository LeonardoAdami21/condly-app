import { useRef, useState } from 'react';
import { StyleSheet, View, type TextInput } from 'react-native';

import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Spacing } from '@/constants/theme';
import { useAuth } from '@/providers/auth-provider';
import { ApiError } from '@/services/api';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getLoginErrorMessage(error: unknown) {
  if (error instanceof ApiError) {
    if (error.status === 401) return 'E-mail ou senha incorretos.';
    if (error.status < 500) return error.message;
    return 'O servidor está com problemas. Tente novamente em instantes.';
  }
  return 'Não foi possível conectar. Verifique sua internet e tente novamente.';
}

export default function LoginScreen() {
  const { signIn } = useAuth();
  const passwordRef = useRef<TextInput>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    const nextErrors: typeof errors = {};
    if (!EMAIL_PATTERN.test(email.trim())) nextErrors.email = 'Informe um e-mail válido.';
    if (!password) nextErrors.password = 'Informe sua senha.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    try {
      // Ao logar, as rotas protegidas liberam e o app navega para a home sozinho.
      await signIn({ email: email.trim(), password });
    } catch (error) {
      setErrors({ form: getLoginErrorMessage(error) });
      setLoading(false);
    }
  }

  return (
    <Screen centered>
      <View style={styles.form}>
        <View style={styles.header}>
          <ThemedText type="title">Condly</ThemedText>
          <ThemedText themeColor="textSecondary">Entre para acompanhar seu condomínio.</ThemedText>
        </View>

        <Card style={styles.card}>
          <Input
            label="E-mail"
            placeholder="seu@email.com"
            value={email}
            onChangeText={setEmail}
            error={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            textContentType="emailAddress"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
            submitBehavior="submit"
          />
          <Input
            ref={passwordRef}
            label="Senha"
            placeholder="Sua senha"
            value={password}
            onChangeText={setPassword}
            error={errors.password}
            secureTextEntry
            autoComplete="current-password"
            textContentType="password"
            returnKeyType="go"
            onSubmitEditing={handleSubmit}
          />

          {errors.form && (
            <ThemedText type="small" themeColor="danger" accessibilityLiveRegion="polite">
              {errors.form}
            </ThemedText>
          )}

          <Button title="Entrar" loading={loading} onPress={handleSubmit} style={styles.submit} />
        </Card>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  form: {
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
    gap: Spacing.four,
  },
  header: {
    gap: Spacing.one,
    alignItems: 'center',
  },
  card: {
    gap: Spacing.three,
  },
  submit: {
    marginTop: Spacing.one,
  },
});
