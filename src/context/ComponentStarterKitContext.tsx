import { FC, PropsWithChildren, createContext, useContext, useMemo } from 'react';

type ComponentStartKitContextProps = {
  breadcrumbs?: Types.ProjectMapLink[];
  [key: string]: unknown;
};

type Props = PropsWithChildren<Record<string, unknown>>;

export const ComponentStarterKitContext = createContext<ComponentStartKitContextProps>({});

const ComponentStarterKitContextProvider: FC<Props> = ({ children, ...rest }) => {
  const value = useMemo(() => rest, [rest]);

  return <ComponentStarterKitContext.Provider value={value}>{children}</ComponentStarterKitContext.Provider>;
};

export default ComponentStarterKitContextProvider;

export const useComponentStarterKitContext = () => useContext(ComponentStarterKitContext);
