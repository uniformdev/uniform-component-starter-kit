import { GetStaticProps } from 'next';
import Page from '@/components/Page';
import { getCompositionById, globalCompositionId } from '@/utils/canvas';

export const getStaticProps: GetStaticProps = async context => ({
  props: {
    preview: Boolean(context.preview),
    composition: (await getCompositionById(globalCompositionId, context as { preview: boolean })) || null,
    useUniformComposition: true,
    revalidate: 31536000,
  },
});

export default Page;
