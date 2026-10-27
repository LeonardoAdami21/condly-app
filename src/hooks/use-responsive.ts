import { useWindowDimensions } from 'react-native';

import { Breakpoints, Spacing } from '@/constants/theme';

export type Breakpoint = 'compact' | 'medium' | 'expanded';

/**
 * Informações da tela atual, atualizadas ao girar o aparelho ou redimensionar a janela.
 * - compact: celulares (< 600dp)
 * - medium: celulares grandes deitados e tablets pequenos (600–1023dp)
 * - expanded: tablets grandes e web (>= 1024dp)
 */
export function useResponsive() {
  const { width, height, fontScale } = useWindowDimensions();

  const breakpoint: Breakpoint =
    width >= Breakpoints.expanded ? 'expanded' : width >= Breakpoints.medium ? 'medium' : 'compact';

  /** Escolhe um valor conforme o tamanho da tela; tamanhos maiores herdam do menor definido. */
  function select<T>(values: { compact: T; medium?: T; expanded?: T }): T {
    if (breakpoint === 'expanded') return values.expanded ?? values.medium ?? values.compact;
    if (breakpoint === 'medium') return values.medium ?? values.compact;
    return values.compact;
  }

  return {
    width,
    height,
    fontScale,
    breakpoint,
    isLandscape: width > height,
    /** Telas baixas (ex.: iPhone SE) — útil para reduzir espaços verticais. */
    isShort: height < 700,
    select,
    horizontalPadding: select({ compact: Spacing.three, medium: Spacing.four, expanded: Spacing.five }),
  };
}
