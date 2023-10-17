import { PropsWithChildren } from 'react';
import type { RootComponentInstance } from '@uniformdev/canvas';

export type ThemeProviderProps = PropsWithChildren<{
  data?: RootComponentInstance | null;
  defaultTheme?: Types.ThemeValue | null;
}>;

export * from './ThemeProvider';
export { default } from './ThemeProvider';
