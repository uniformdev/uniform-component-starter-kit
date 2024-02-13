import { ReactNode } from 'react';

export type ErrorHandlerProps = {
  errorComponent: ReactNode;
  children: ReactNode;
};
export * from './ErrorHandler';
export { default } from './ErrorHandler';
