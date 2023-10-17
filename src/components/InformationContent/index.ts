import { ReactElement } from 'react';

export type InformationContentProps = {
  title: string;
  imageComponent?: ReactElement;
  text?: string;
  className?: string;
};

export * from './InformationContent';
export { default } from './InformationContent';
