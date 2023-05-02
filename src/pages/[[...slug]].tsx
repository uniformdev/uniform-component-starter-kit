import { withUniformGetStaticProps, withUniformGetStaticPaths } from '@uniformdev/canvas-next/project-map';
import Page from '@/components/Page';
import { getCanvasClient, getCompositionById, getProjectMapClient, globalCompositionId } from '@/utils/canvas';

export const getStaticProps = withUniformGetStaticProps({
  param: 'slug',
  preview: process.env.NODE_ENV === 'development',
  client: getCanvasClient(),
  callback: async (context, composition) => {
    if (!composition) {
      return {
        notFound: true,
        revalidate: 31536000,
      };
    }

    // fetching global composition for header navigation and footer
    const globalComposition = await getCompositionById(globalCompositionId, context as { preview: boolean });

    // merging two compositions
    const pageComposition = {
      _name: composition?._name,
      _id: composition?._id,
      type: composition?.type,
      parameters: {
        ...composition?.parameters,
        ...globalComposition?.parameters,
      },
      slots: {
        header: globalComposition?.slots?.header ?? null,
        pageContent: composition?.slots?.pageContent ?? null,
        footer: globalComposition?.slots?.footer ?? null,
      },
    };

    return {
      props: {
        preview: Boolean(context.preview),
        composition: pageComposition || null,
      },
      revalidate: 31536000,
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

export default Page;
