import { FC, PropsWithChildren, createContext, useContext, useMemo } from 'react';
import { NextFont } from 'next/dist/compiled/@next/font';

type ComponentStartKitContextProps = {
  breadcrumbs?: Types.ProjectMapLink[];
  primaryFont?: NextFont;
  themeName?: Types.SupportedThemes;
  [key: string]: unknown;
  localizationSettings?: Types.LocalizationSettings;
};

type Props = PropsWithChildren<Record<string, unknown>>;

export const ComponentStarterKitContext = createContext<ComponentStartKitContextProps>({});

const ComponentStarterKitContextProvider: FC<Props> = ({ children, ...rest }) => {
  const value = useMemo(() => ({ ...rest }), [rest]);
  return <ComponentStarterKitContext.Provider value={value}>{children}</ComponentStarterKitContext.Provider>;
};

export default ComponentStarterKitContextProvider;

export const useComponentStarterKitContext = () => useContext(ComponentStarterKitContext);
