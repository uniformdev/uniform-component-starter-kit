import type { Meta, StoryObj } from '@storybook/react';
import { UniformComposition } from '@uniformdev/canvas-react';
import { Modal, ModalProps, HeroVariant } from '@/canvas';
import { createFakeCompositionData, createUniformParameter } from '../utils';

const meta: Meta<typeof Modal> = {
  title: 'Modal',
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

const HERO_PROPS = {
  eyebrowText: 'Hero',
  title: 'Are developers stuck with outdated tech and custom code to maintain?',
  titleStyle: 'h2',
  description:
    "Use this paragraph to share information about your company or brand. Make it as engaging as possible, and showcase your brand's unique personality.",
  primaryButtonCopy: 'Home',
  primaryButtonLink: {
    path: '/',
  },
  image: 'https://res.cloudinary.com/uniform-demos/image/upload/v1/csk-marketing/Rectangle_7_2_uupdjo_wm94da',
  primaryButtonStyle: 'primary',
  textColor: '#fff',
};

const BASE_PROPS: Omit<ModalProps, 'component'> = {
  closeOnClickOutside: true,
  maxWidth: 'none',
  automaticOpenTimeout: 5,
};

const argTypes = {
  maxWidth: { control: 'select', options: ['none', 'small', 'medium', 'large', 'xLarge'] },
};

const renderStory = (args: ModalProps) => {
  const fakeComposition = createFakeCompositionData('modal', args, {
    trigger: [
      {
        type: 'button',
        parameters: createUniformParameter({ copy: 'Open modal' }),
      },
    ],
    content: [
      {
        type: 'hero',
        variant: HeroVariant.BackgroundImage,
        parameters: createUniformParameter(HERO_PROPS),
      },
    ],
  });
  return (
    <UniformComposition data={fakeComposition}>
      <Modal {...args} component={fakeComposition} />
    </UniformComposition>
  );
};

export const Default: Story = {
  args: BASE_PROPS,
  argTypes,
  render: renderStory,
};
