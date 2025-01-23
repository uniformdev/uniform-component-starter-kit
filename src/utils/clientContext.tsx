'use client';

import { useRouter } from 'next/navigation';
import {
  ClientContextComponent,
  createClientUniformContext,
  useInitUniformContext,
} from '@uniformdev/canvas-next-rsc/component';
import { ContextPlugin, enableContextDevTools } from '@uniformdev/context';
// NOTE: npm install @uniformdev/context-gtag if you need to enable GA4 plugin
// import { enableGoogleGtagAnalytics } from "@uniformdev/context-gtag";

// Here you can learn more about how it works.
// https://dev-csk-marketing-site.vercel.app/recipes
export const UniformClientContext: ClientContextComponent = ({ manifest }) => {
  const router = useRouter();
  useInitUniformContext(() => {
    const plugins: ContextPlugin[] = [];

    plugins.push(
      enableContextDevTools({
        onAfterMessageReceived: () => {
          router.refresh();
        },
      })
    );

    // NOTE: Uncomment this to enable Google Analytics 4 plugin (after installing npm install @uniformdev/context-gtag)
    // plugins.push(enableGoogleGtagAnalytics());

    return createClientUniformContext({
      manifest,
      plugins,
      defaultConsent: true,
    });
  });

  return null;
};
