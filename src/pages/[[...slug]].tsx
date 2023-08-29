import { CANVAS_DRAFT_STATE, CANVAS_PUBLISHED_STATE } from '@uniformdev/canvas';
import { withUniformGetServerSideProps } from '@uniformdev/canvas-next/route';
import { Page } from '@/components';
import { getBreadcrumbs, getRouteClient } from '@/utilities/canvas/canvasClients';

// SSR configuration is enabled by default
export const getServerSideProps = withUniformGetServerSideProps({
  requestOptions: context => ({
    state: Boolean(context.preview) ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE,
  }),
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
      resolvedUrl: _context.resolvedUrl,
    });

    return {
      props: { preview, data: composition || null, context: { breadcrumbs } },
    };
  },
});

export default Page;

// Enable if switching to SSG mode
// import { withUniformGetStaticProps, withUniformGetStaticPaths } from '@uniformdev/canvas-next/route';
// import { getProjectMapClient } from '@/utils/canvas';

// SSG configuration - replace getServerSideProps with this if you want this mode
// export const getStaticProps = withUniformGetStaticProps({
//   requestOptions: {
//     state: process.env.NODE_ENV === 'development' ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE,
//   },
//   param: 'slug',
//   handleComposition: async (routeResponse, _context) => {
//     const { composition } = routeResponse.compositionApiResponse || {};
//     const breadcrumbs = await getBreadcrumbs(composition._id, Boolean(_context.preview));
//     return {
//       props: {
//         preview: Boolean(_context.preview),
//         data: composition || null,
//         context: {
//           breadcrumbs,
//         },
//       },
//     };
//   },
// });

// SSG configuration, add this function
// export const getStaticPaths = async () => {
//   const nodePaths = await withUniformGetStaticPaths({
//     preview: process.env.NODE_ENV === 'development',
//     client: getProjectMapClient(),
//   });
//   const { paths } = await nodePaths();
//   return {
//     paths,
//     fallback: 'blocking',
//   };
// };
