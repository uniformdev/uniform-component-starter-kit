import { RootComponentInstance } from '@uniformdev/canvas';

export type PlaygroundProps = {
  data?: RootComponentInstance | null;
  defaultTheme?: Types.ThemeValue | null;
};

export * from './Playground';
export { default } from './Playground';
