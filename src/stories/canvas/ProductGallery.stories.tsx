import type { Meta, StoryObj } from '@storybook/react';
import { UniformComposition } from '@uniformdev/canvas-react';
import { ProductGallery, BaseProductGalleryProps } from '@/canvas';
import { BackgroundTypes, PaddingSize } from '@/utilities/styling';
import { createFakeCompositionData } from '../utils';

const containerBackgroundTypeOptions = ['Light', 'Dark', 'Medium', 'Transparent'];

const containerPaddingOptions = ['Small', 'Medium', 'Large', 'None'];

const imagePaths = [
  'https://res.cloudinary.com/uniform-demos/image/upload/v1693309094/products/EspressoGPT_image_1.jpg',
  'https://res.cloudinary.com/uniform-demos/image/upload/v1693309094/products/EspressoGPT_image_2.jpg',
  'https://res.cloudinary.com/uniform-demos/image/upload/v1693309094/products/EspressoGPT_image_3.jpg',
  'https://res.cloudinary.com/uniform-demos/image/upload/v1693309094/products/EspressoGPT_image_4.jpg',
  'https://res.cloudinary.com/uniform-demos/image/upload/v1693309094/products/EspressoGPT_image_5.jpg',
];

const meta: Meta<typeof ProductGallery> = {
  title: 'Product Gallery',
  component: ProductGallery,
};

export default meta;
type Story = StoryObj<typeof ProductGallery>;

const BASE_PROPS: Omit<BaseProductGalleryProps, 'children' | 'component'> = {
  title: 'Product Gallery',
  titleStyle: 'h4',
  description: '',
  animationType: 'flyIn',
  animationOrder: 'oneByOne',
  duration: 'slow',
  marginTop: PaddingSize.Medium,
  marginBottom: PaddingSize.Medium,
  backgroundType: BackgroundTypes.Light,
  paddingTop: PaddingSize.Medium,
  paddingBottom: PaddingSize.Medium,
  items: imagePaths.map((imagePath, index) => ({
    id: index.toString(),
    url: imagePath,
  })),
};

const argTypes = {
  backgroundType: { control: 'select', options: containerBackgroundTypeOptions },
  paddingTop: { control: 'select', options: containerPaddingOptions },
  paddingBottom: { control: 'select', options: containerPaddingOptions },
};

const renderStory = (args: BaseProductGalleryProps) => {
  const fakeComposition = createFakeCompositionData('productGallery', args, {});
  return (
    <UniformComposition data={fakeComposition}>
      <ProductGallery {...args} />
    </UniformComposition>
  );
};

export const Default: Story = {
  args: BASE_PROPS,
  argTypes,
  render: renderStory,
};
