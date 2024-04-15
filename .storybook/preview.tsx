import type { Preview } from '@storybook/react';
import { domAnimation, LazyMotion } from 'framer-motion';
import { ThemeProvider } from '../src/components';
import { getTheme } from '../src/stories/utils/themes';

import '../src/styles/globals.scss';
import '../src/canvas';

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const theme = context.parameters.theme || context.globals.theme || 'uniform';
      return (
        <LazyMotion features={domAnimation}>
          <ThemeProvider data={getTheme(theme)}>
            <Story />
          </ThemeProvider>
        </LazyMotion>
      );
    },
  ],
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'uniform',
    toolbar: {
      icon: 'globe',
      title: 'Theme',
      items: [
        { value: 'uniform', title: 'Uniform' },
        { value: 'javadrip', title: 'Javadrip' },
      ],
      dynamicTitle: true,
    },
  },
};

export default preview;
