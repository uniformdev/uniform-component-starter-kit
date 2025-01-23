import { uniformConfig } from '@uniformdev/cli/config';

module.exports = uniformConfig({
  preset: 'none',
  config: {
    serialization: {
      entitiesConfig: {
        dataType: {},
        component: {},
        contentType: {},
        componentPattern: {},
      },
    },
  },
});
