/**
 * Tokens de design do app: cores (modo claro e escuro), tipografia, espaçamento e bordas.
 * Use sempre estes valores em vez de números/cores soltos para manter o visual consistente.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#11181C',
    textSecondary: '#60646C',
    background: '#F7F8FA',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#E8F1FD',
    border: '#E2E5EA',
    primary: '#208AEF',
    primaryPressed: '#1A72C7',
    onPrimary: '#FFFFFF',
    success: '#2E9E5B',
    warning: '#C98A0E',
    danger: '#E5484D',
  },
  dark: {
    text: '#ECEDEE',
    textSecondary: '#9BA1A6',
    background: '#0E1013',
    backgroundElement: '#1A1D21',
    backgroundSelected: '#1C2B3B',
    border: '#2B2F35',
    primary: '#3B9BF5',
    primaryPressed: '#2E86DB',
    onPrimary: '#FFFFFF',
    success: '#3DBE72',
    warning: '#F0B429',
    danger: '#F2555A',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  full: 999,
} as const;

/** Altura mínima de áreas tocáveis (recomendação de acessibilidade iOS/Android). */
export const MinTouchSize = 48;

/** Limite de ampliação da fonte do sistema, para respeitar acessibilidade sem quebrar layouts. */
export const MaxFontScale = 1.4;

/** Larguras (em dp) a partir das quais o layout muda. */
export const Breakpoints = {
  medium: 600,
  expanded: 1024,
} as const;

/** Largura máxima do conteúdo em tablets/web, para as linhas não ficarem longas demais. */
export const MaxContentWidth = 720;
