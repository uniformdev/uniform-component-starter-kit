import type { Meta, StoryObj } from '@storybook/react';
import { UniformComposition } from '@uniformdev/canvas-react';
import { ProductInfo, ProductInfoProps } from '@/canvas';
import { Container } from '@/components';
import { BackgroundTypes } from '@/utilities/styling';
import { createFakeCompositionData } from '../utils';
import { titleStyleOptions } from '../constants';

const meta: Meta<typeof ProductInfo> = {
  title: 'ProductInfo',
  component: ProductInfo,
};

export default meta;
type Story = StoryObj<typeof ProductInfo>;

const BASE_PROPS: Omit<ProductInfoProps, 'component'> = {
  eyebrowText: 'EXPERIENCE A REVOLUTION',
  title: 'EspressoGPT',
  titleStyle: 'h1',
  subTitle: 'Where modern technology meets timeless taste',
  description:
    "Experience coffee like never before. From the moment you power up the EspressoGPT, you're not just brewing an espresso—you're entering the future of coffee. Welcome to a universe of unparalleled taste and sophistication.",
  highlightText: '$1,899.95',
  image: 'https://res.cloudinary.com/uniform-demos/image/upload/v1697702742/coffee-marketing/cup-delicious-coffee.jpg',
  primaryButtonCopy: 'Buy now',
  primaryButtonStyle: 'secondary',

  secondaryButtonCopy: 'Taste the future',
  secondaryButtonStyle: 'ghost',
  features: ['Free shipping', '3 year warranty', 'Starter bean kit'],
};

const argTypes = {
  titleStyle: { control: 'select', options: titleStyleOptions },
};

const renderStory = (args: ProductInfoProps) => {
  const fakeComposition = createFakeCompositionData('price', args, {});
  return (
    <UniformComposition data={fakeComposition}>
      <Container backgroundType={BackgroundTypes.Light}>
        <ProductInfo {...args} />
      </Container>
    </UniformComposition>
  );
};

export const Default: Story = {
  args: BASE_PROPS,
  argTypes,
  render: renderStory,
};
