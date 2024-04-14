import { CANVAS_DRAFT_STATE, CANVAS_PUBLISHED_STATE } from '@uniformdev/canvas';
import { withUniformGetServerSideProps, prependLocale } from '@uniformdev/canvas-next/route';
import { getBreadcrumbs, getRouteClient } from '../utilities/canvas/canvasClients';
export { default } from '../components/BasePage';

// Doc: https://docs.uniform.app/docs/guides/composition/url-management/routing/slug-based-routing

export const getServerSideProps = withUniformGetServerSideProps({
  requestOptions: context => ({
    state: Boolean(context.preview) ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE,
  }),
  client: getRouteClient(),
  modifyPath: prependLocale,
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
      urlSegments: _context.resolvedUrl?.split('/'),
    });

    return {
      props: { preview, data: composition || null, context: { breadcrumbs } },
    };
  },
});
