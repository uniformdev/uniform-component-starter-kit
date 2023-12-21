import type { Meta, StoryObj } from '@storybook/react';
import { UniformComposition } from '@uniformdev/canvas-react';
import { Container, ContainerProps } from '@/canvas';
import { BackgroundTypes, PaddingSize } from '@/utilities/styling';
import { createFakeCompositionData, createUniformParameter } from '../utils';

const containerBackgroundTypeOptions = ['Light', 'Dark', 'Medium', 'Transparent'];

const containerPaddingOptions = ['Small', 'Medium', 'Large', 'None'];

const meta: Meta<typeof Container> = {
  title: 'Container',
  component: Container,
};

export default meta;
type Story = StoryObj<typeof Container>;

const BASE_PROPS: Omit<ContainerProps, 'children' | 'component'> = {
  backgroundType: BackgroundTypes.Light,
  paddingTop: PaddingSize.Medium,
  paddingBottom: PaddingSize.Medium,
};

const argTypes = {
  backgroundType: { control: 'select', options: containerBackgroundTypeOptions },
  paddingTop: { control: 'select', options: containerPaddingOptions },
  paddingBottom: { control: 'select', options: containerPaddingOptions },
};

const renderStory = (args: ContainerProps) => {
  const fakeComposition = createFakeCompositionData('container', args, {
    'container-inner': [
      {
        type: 'hero',
        variant: 'backgroundImage',
        parameters: createUniformParameter({
          title: 'Are developers stuck with outdated tech and custom code to maintain?',
          image: 'https://res.cloudinary.com/uniform-demos/image/upload/v1/csk-marketing/Rectangle_7_2_uupdjo_wm94da',
          description:
            "Use this paragraph to share information about your company or brand. Make it as engaging as possible, and showcase your brand's unique personality.",
          eyebrowText: 'Hero component',
        }),
      },
    ],
  });
  return (
    <UniformComposition data={fakeComposition}>
      <Container {...args} />
    </UniformComposition>
  );
};

export const Default: Story = {
  args: BASE_PROPS,
  argTypes,
  render: renderStory,
};
