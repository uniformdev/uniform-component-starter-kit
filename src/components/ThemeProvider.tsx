import { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';
import { useUniformCurrentComposition } from '@uniformdev/canvas-react';
import type { RootComponentInstance } from '@uniformdev/canvas';
import { appFonts } from '@/fonts';
import { generateCustomTheme } from '@/utils/theme';

type Props = PropsWithChildren<{
  data: RootComponentInstance;
  useUniformComposition?: boolean;
}>;

type ThemeValue = {
  themeName: Types.SupportedThemes;
  colors: Types.ThemeColors[];
};

const ThemeProvider: FC<Props> = ({ children, data, useUniformComposition }) => {
  const { data: currentCompositionData } = useUniformCurrentComposition();

  const composition = useUniformComposition ? currentCompositionData : data;

  const font = composition?.parameters?.font?.value as Types.SupportedFonts;
  const currentFont = appFonts[font];

  const themeName = (composition?.parameters?.theme?.value as ThemeValue)?.themeName;
  const colors = (composition?.parameters?.theme?.value as ThemeValue)?.colors;

  const generatedTheme = generateCustomTheme(themeName, colors);

  return (
    // The way how we can set current theme
    <div
      className={classNames('min-h-screen overflow-x-hidden flex flex-col', currentFont?.className)}
      data-theme={(composition?.parameters?.theme?.value as ThemeValue)?.themeName}
    >
      <div dangerouslySetInnerHTML={{ __html: generatedTheme }} />
      {children}
    </div>
  );
};

export default ThemeProvider;
