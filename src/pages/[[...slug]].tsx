import { CANVAS_DRAFT_STATE, CANVAS_PUBLISHED_STATE } from '@uniformdev/canvas';
import { withUniformGetStaticProps, prependLocale } from '@uniformdev/canvas-next/route';
import { getBreadcrumbs, getProjectMapClient, getRouteClient } from '../utilities/canvas/canvasClients';
export { default } from '../components/BasePage';

// Doc: https://docs.uniform.app/docs/guides/composition/url-management/routing/slug-based-routing

export const getStaticProps = withUniformGetStaticProps({
  requestOptions: context => ({
    state:
      Boolean(context.preview) || process.env.NODE_ENV === 'development' ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE,
  }),
  param: 'slug',
  client: getRouteClient(),
  modifyPath: prependLocale,
  handleComposition: async (routeResponse, _context) => {
    const { composition, errors } = routeResponse.compositionApiResponse || {};

    if (errors?.some(e => e.type === 'data' || e.type === 'binding')) {
      return { notFound: true };
    }

    const preview = Boolean(_context.preview);
    const slug = _context.params?.slug;
    const breadcrumbs = await getBreadcrumbs({
      compositionId: composition._id,
      preview,
      dynamicTitle: composition?.parameters?.pageTitle?.value as string,
      urlSegments: typeof slug === 'string' ? slug?.split('/') : slug,
    });

    return {
      props: { preview, data: composition || null, context: { breadcrumbs } },
    };
  },
});

export const getStaticPaths = async () => {
  const { nodes } = await getProjectMapClient().getNodes({
    state: process.env.NODE_ENV === 'development' ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE,
  });

  return {
    paths: nodes?.reduce((acc: string[], { path, type }) => (type === 'composition' ? [...acc, path] : acc), []) || [],
    fallback: 'blocking',
  };
};
