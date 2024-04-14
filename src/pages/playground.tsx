import { GetStaticProps } from 'next';
import { RouteGetResponseEdgehancedComposition } from '@uniformdev/canvas';
import { getRouteClient } from '../utilities/canvas/canvasClients';
export { default } from '../components/Playground';

// Activate visual editing doc: https://docs.uniform.app/docs/guides/composition/visual-editing/activate-visual-editing

// The current project theme is detected from the title on the Home page,
// First theme from the Theme Pack integration is used by default.
const HOME_PAGE_PATH = '/'; // Path to the Home page
const UNIFORM_THEMES_SOURCE =
  process.env.UNIFORM_THEMES_SOURCE || 'https://theme-pack.mesh.uniform.app/staticThemes.json';

export const getServerSideProps: GetStaticProps = async ({ defaultLocale = '' }) => {
  const routeClient = getRouteClient();

  const routeResponse = await routeClient.getRoute({
    path: `${HOME_PAGE_PATH}${defaultLocale}`,
  });

  const compositionApiResponse = (routeResponse as RouteGetResponseEdgehancedComposition)?.compositionApiResponse;

  if (compositionApiResponse) {
    const preview = Boolean(true);
    if (!preview) return { notFound: true };

    const { composition } = compositionApiResponse || {};
    return { props: { data: composition || null } };
  }

  const response = await fetch(UNIFORM_THEMES_SOURCE);
  const [defaultTheme]: Types.ThemeValue[] = await response.json().catch(() => []);

  return { props: { defaultTheme: defaultTheme || null } };
};
