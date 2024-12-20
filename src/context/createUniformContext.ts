import { NextPageContext } from 'next';
import {
  Context,
  ManifestV2,
  ContextPlugin,
  enableDebugConsoleLogDrain,
  enableContextDevTools,
} from '@uniformdev/context';
import { NextCookieTransitionDataStore } from '@uniformdev/context-next';

export default function createUniformContext(manifest: ManifestV2, serverContext?: NextPageContext): Context {
  const plugins: ContextPlugin[] = [enableContextDevTools(), enableDebugConsoleLogDrain('debug')];
  const context = new Context({
    defaultConsent: true,
    manifest,
    transitionStore: new NextCookieTransitionDataStore({
      serverContext,
    }),
    plugins: plugins,
  });
  return context;
}
