import { FC } from 'react';
import { createUniformApiEnhancer, UniformPlayground } from '@uniformdev/canvas-react';
import ComponentStarterKitContextProvider from '../../context/ComponentStarterKitContext';
import CSKDecorators from '../Decorators';
import ThemeProvider from '../ThemeProvider';
import { PlaygroundProps } from '.';

const Playground: FC<PlaygroundProps> = ({ data, defaultTheme }) => {
  const contextualEditingEnhancer = createUniformApiEnhancer({ apiUrl: '/api/preview' });

  return (
    <ComponentStarterKitContextProvider data={data}>
      <ThemeProvider data={data} defaultTheme={defaultTheme}>
        <UniformPlayground
          contextualEditingEnhancer={contextualEditingEnhancer}
          decorators={CSKDecorators}
          behaviorTracking="onLoad"
        />
      </ThemeProvider>
    </ComponentStarterKitContextProvider>
  );
};

export default Playground;
