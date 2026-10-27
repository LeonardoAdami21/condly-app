import { StyleSheet, View } from 'react-native';

import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Spacing } from '@/constants/theme';
import { useResponsive } from '@/hooks/use-responsive';

export default function HomeScreen() {
  const { select } = useResponsive();

  return (
    <Screen>
      <View style={styles.header}>
        <ThemedText type="title">Condly</ThemedText>
        <ThemedText themeColor="textSecondary">Bem-vindo! Que bom ter você aqui.</ThemedText>
      </View>

      <Card>
        <ThemedText type="subtitle">Comece por aqui</ThemedText>
        <Input label="Nome" placeholder="Como podemos te chamar?" autoComplete="name" />
        <View style={[styles.actions, { flexDirection: select({ compact: 'column', medium: 'row' }) }]}>
          <Button title="Continuar" style={styles.action} />
          <Button title="Agora não" variant="ghost" style={styles.action} />
        </View>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: Spacing.one,
    marginBottom: Spacing.two,
  },
  actions: {
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
  action: {
    flexGrow: 1,
  },
});
