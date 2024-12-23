import { uniformConfig } from '@uniformdev/cli/config';

module.exports = uniformConfig({
  preset: 'all',
  overrides: {
    serializationConfig: { directory: './content' },
  },
  // you can disable specific entities from being included, which can speed up your sync
  // disableEntities: ['asset']
});
