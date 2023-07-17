import { CANVAS_DRAFT_STATE, CANVAS_PUBLISHED_STATE } from '@uniformdev/canvas';
import Page from '@/components/Page';
import { getBreadcrumbs, getCompositionById, globalCompositionId, mergeGlobalCompositions } from '@/utils/canvas';
import { withUniformGetServerSideProps } from '@uniformdev/canvas-next/route';

// SSR configuration is enabled by default
export const getServerSideProps = withUniformGetServerSideProps({
  requestOptions: context => ({
    state: Boolean(context.preview) ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE,
  }),
  handleComposition: async (routeResponse, _context) => {
    const { composition, errors } = routeResponse.compositionApiResponse || {};
    if (errors?.some(e => e.type === 'data' || e.type === 'binding')) {
      return { notFound: true };
    }

    const preview = Boolean(_context.preview);
    const breadcrumbs = await getBreadcrumbs(composition._id, preview);
    // fetching global composition for header navigation and footer
    const globalComposition = await getCompositionById(globalCompositionId, _context as { preview: boolean });
    // merging two compositions
    const pageComposition = mergeGlobalCompositions(composition, globalComposition);
    return {
      props: { preview, data: pageComposition || null, context: { breadcrumbs } },
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
//     // fetching global composition for header navigation and footer
//     const globalComposition = await getCompositionById(globalCompositionId, _context as { preview: boolean });
//     // merging two compositions
//     const pageComposition = mergeGlobalCompositions(composition, globalComposition);
//     return {
//       props: {
//         preview: Boolean(_context.preview),
//         data: pageComposition || null,
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
