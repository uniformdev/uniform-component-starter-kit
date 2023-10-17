import { FC, PropsWithChildren, createContext, useContext, useMemo } from 'react';
import { NextFont } from 'next/dist/compiled/@next/font';
import { useUniformCurrentComposition } from '@uniformdev/canvas-react';
import { RootComponentInstance } from '@uniformdev/canvas';
import { appFonts } from '../fonts';

type ComponentStartKitContextProps = {
  breadcrumbs?: Types.ProjectMapLink[];
  primaryFont?: NextFont;
  themeName?: Types.SupportedThemes;
  [key: string]: unknown;
};

type Props = PropsWithChildren<{ data?: RootComponentInstance | null } & Record<string, unknown>>;

export const ComponentStarterKitContext = createContext<ComponentStartKitContextProps>({});

const ComponentStarterKitContextProvider: FC<Props> = ({ children, data, ...rest }) => {
  const { data: currentComposition } = useUniformCurrentComposition();
  const composition = currentComposition ?? data;

  const params = composition?.slots?.pageHeader?.[0]?.parameters;

  const primaryFontValue = params?.primaryFont?.value;

  const primaryFont = appFonts[primaryFontValue as Types.SupportedFonts];

  //TODO get rid of isJavaDrip
  const value = useMemo(() => ({ primaryFont, ...rest }), [rest, primaryFont]);
  return <ComponentStarterKitContext.Provider value={value}>{children}</ComponentStarterKitContext.Provider>;
};

export default ComponentStarterKitContextProvider;

export const useComponentStarterKitContext = () => useContext(ComponentStarterKitContext);
