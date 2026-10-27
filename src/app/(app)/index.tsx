import { StyleSheet, View } from 'react-native';

import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Spacing } from '@/constants/theme';
import { useAuth } from '@/providers/auth-provider';

export default function HomeScreen() {
  const { user, signOut } = useAuth();
  const firstName = user?.name.split(' ')[0];

  return (
    <Screen>
      <View style={styles.header}>
        <ThemedText type="title">{firstName ? `Olá, ${firstName}!` : 'Olá!'}</ThemedText>
        <ThemedText themeColor="textSecondary">Que bom ter você aqui.</ThemedText>
      </View>

      <Card>
        <ThemedText type="subtitle">Sua conta</ThemedText>
        {user && <ThemedText themeColor="textSecondary">{user.email}</ThemedText>}
        <Button title="Sair" variant="secondary" onPress={signOut} style={styles.signOut} />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: Spacing.one,
    marginBottom: Spacing.two,
  },
  signOut: {
    marginTop: Spacing.two,
  },
});
