import { Context, ManifestV2, enableContextDevTools, enableDebugConsoleLogDrain } from '@uniformdev/context';
import manifest from './manifest.json';

// Docs: https://docs.uniform.app/guides/classification/activation
const createUniformContext = () =>
  new Context({
    defaultConsent: true,
    manifest: manifest as ManifestV2,
    plugins: [enableContextDevTools(), enableDebugConsoleLogDrain('debug')],
  });

export default createUniformContext;
