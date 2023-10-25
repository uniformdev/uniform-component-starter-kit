import { CANVAS_DRAFT_STATE, CANVAS_PUBLISHED_STATE } from '@uniformdev/canvas';
import { withUniformGetStaticProps, withUniformGetStaticPaths } from '@uniformdev/canvas-next/route';
import { getBreadcrumbs, getProjectMapClient, getRouteClient } from '../utilities/canvas/canvasClients';
export { default } from '../components/BasePage';

// Doc: https://docs.uniform.app/docs/guides/composition/url-management/routing/slug-based-routing

export const getStaticProps = withUniformGetStaticProps({
  requestOptions: context => ({
    state: Boolean(context.preview) ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE,
  }),
  param: 'slug',
  client: getRouteClient(),
  handleComposition: async (routeResponse, _context) => {
    const { composition, errors } = routeResponse.compositionApiResponse || {};

    if (errors?.some(e => e.type === 'data' || e.type === 'binding')) {
      return { notFound: true };
    }

    const preview = Boolean(_context.preview);
    const breadcrumbs = await getBreadcrumbs({
      compositionId: composition._id,
      preview,
      dynamicTitle: composition?.parameters?.pageTitle?.value as string,
      resolvedUrl: _context.params?.slug && _context.params?.slug.length > 0 ? _context.params?.slug[0] : '/',
    });

    return {
      props: { preview, data: composition || null, context: { breadcrumbs } },
    };
  },
});

export const getStaticPaths = async () => {
  const nodePaths = await withUniformGetStaticPaths({
    preview: process.env.NODE_ENV === 'development',
    client: getProjectMapClient(),
  });
  const { paths } = await nodePaths();
  return {
    paths,
    fallback: 'blocking',
  };
};
