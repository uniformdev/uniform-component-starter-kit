import { ComponentType } from 'react';
import { ComponentProps } from '@uniformdev/canvas-react';
import ErrorHandler from '../components/ErrorHandler';
import ErrorPropertyCallout from '../components/ErrorPropertyCallout';

export function withErrorCallout<T>(
  Component: ComponentType<ComponentProps<T>>,
  errorText: string
): ComponentType<ComponentProps<T>> {
  return function wrapper(props: ComponentProps<T>) {
    return (
      <ErrorHandler errorComponent={<ErrorPropertyCallout classNames="py-3" title={errorText} />}>
        <Component {...props} />
      </ErrorHandler>
    );
  };
}
