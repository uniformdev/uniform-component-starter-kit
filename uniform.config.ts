import type { CLIConfiguration } from '@uniformdev/cli';

const config: CLIConfiguration = {
  serialization: {
    entitiesConfig: {
      composition: {
        publish: true,
      },
      component: {},
      projectMapDefinition: {},
      projectMapNode: {},
    },
    directory: 'content/baseline.json',
  },
};

module.exports = config;
