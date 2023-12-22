import type { CLIConfiguration } from '@uniformdev/cli';

const config: CLIConfiguration = {
  serialization: {
    entitiesConfig: {
      category: {},
      component: {},
      pattern: { publish: true },
      composition: { publish: true },
      projectMapDefinition: {},
      projectMapNode: {},
      asset: {},
    },
    directory: './content',
    format: 'yaml',
  },
};

module.exports = config;
