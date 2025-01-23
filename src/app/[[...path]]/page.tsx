import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import {
  createServerUniformContext,
  ContextUpdateTransfer,
  PageParameters,
  UniformComposition,
} from '@uniformdev/canvas-next-rsc';
import { emptyPlaceholderResolver } from '@uniformdev/theme-pack/components/canvas/emptyPlaceholders';
import { ThemePackProvider } from '@uniformdev/theme-pack/components/providers/server';
import { isRouteWithoutErrors } from '@uniformdev/theme-pack/utils/routing';
import { componentResolver } from '@/components';
import locales from '@/i18n/locales.json';
import retrieveRoute from '@/utils/retrieveRoute';

export default async function Home(props: PageParameters) {
  const route = await retrieveRoute(props, locales.defaultLocale);
  if (!isRouteWithoutErrors(route)) return notFound();

  const cookie = await cookies();
  const theme = cookie.get('theme')?.value || 'light';
  const searchParams = await props.searchParams;
  const serverContext = await createServerUniformContext({
    searchParams,
  });
  const isPreviewMode = searchParams?.preview === 'true';

  return (
    <ThemePackProvider isPreviewMode={isPreviewMode}>
      <ContextUpdateTransfer
        serverContext={serverContext}
        update={{
          quirks: {
            theme,
          },
        }}
      />
      <UniformComposition
        {...props}
        route={route}
        resolveComponent={componentResolver}
        serverContext={serverContext}
        mode="server"
        resolveEmptyPlaceholder={emptyPlaceholderResolver}
      />
    </ThemePackProvider>
  );
}

export { generateMetadata } from '@/utils/metadata';
