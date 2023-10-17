import { GetServerSidePropsResult } from 'next';
import { CANVAS_DRAFT_STATE } from '@uniformdev/canvas';
import { withUniformGetServerSideProps } from '@uniformdev/canvas-next/route';
import { getRouteClient } from '../utilities/canvas/canvasClients';
import { PlaygroundProps } from '../components/Playground';
export { default } from '../components/Playground';

// Activate visual editing doc: https://docs.uniform.app/docs/guides/composition/visual-editing/activate-visual-editing

// The current project theme is detected from the title on the Home page, and if it is not available, the first theme from the Theme Pack integration is used.
const HOME_PAGE_PATH = '/'; // Path to the Home page
const UNIFORM_THEMES_SOURCE =
  process.env.UNIFORM_THEMES_SOURCE || 'https://theme-pack-mesh-integration.netlify.app/staticThemes.json';

export const getServerSideProps = withUniformGetServerSideProps<PlaygroundProps>({
  modifyPath: () => HOME_PAGE_PATH,
  requestOptions: { state: CANVAS_DRAFT_STATE },
  client: getRouteClient(),
  handleComposition: async (routeResponse, _context) => {
    const preview = Boolean(_context.preview);
    if (!preview) return { notFound: true };

    const { composition } = routeResponse.compositionApiResponse || {};
    return { props: { data: composition || null } };
  },

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // ToDo: fix it https://linear.app/uniform/issue/MET-1333/[canvas-next]-override-default-handling-withuniformgetserversideprops
  handleNotFound: async (
    result,
    context
  ): Promise<GetServerSidePropsResult<{ preview?: boolean; defaultTheme?: Types.ThemeValue }>> => {
    const preview = Boolean(context.preview);
    if (!preview) return { notFound: true };

    const response = await fetch(UNIFORM_THEMES_SOURCE);
    const [defaultTheme]: Types.ThemeValue[] = await response.json().catch(() => []);
    return { props: { defaultTheme: defaultTheme || null } };
  },
});
