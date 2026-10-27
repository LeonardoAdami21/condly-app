import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useResponsive } from '@/hooks/use-responsive';
import { useTheme } from '@/hooks/use-theme';

type ScreenProps = {
  children: ReactNode;
  /** Rola o conteúdo quando ele não cabe na tela (padrão: true). */
  scroll?: boolean;
  /** Bordas que respeitam a área segura (notch, barra de gestos). */
  edges?: Edge[];
  /** Centraliza o conteúdo na vertical (ex.: telas de login). */
  centered?: boolean;
};

/**
 * Container base de toda tela: aplica fundo do tema, área segura, padding lateral
 * conforme o tamanho da tela, largura máxima centralizada em tablets e ajuste do teclado.
 */
export function Screen({
  children,
  scroll = true,
  edges = ['top', 'bottom'],
  centered = false,
}: ScreenProps) {
  const theme = useTheme();
  const { horizontalPadding, isShort } = useResponsive();

  const contentStyle = [
    styles.content,
    centered && styles.centered,
    { paddingHorizontal: horizontalPadding, paddingVertical: isShort ? Spacing.three : Spacing.four },
  ];

  return (
    <SafeAreaView edges={edges} style={[styles.flex, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {scroll ? (
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View style={contentStyle}>{children}</View>
          </ScrollView>
        ) : (
          <View style={[contentStyle, styles.flex]}>{children}</View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    gap: Spacing.three,
  },
  centered: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
