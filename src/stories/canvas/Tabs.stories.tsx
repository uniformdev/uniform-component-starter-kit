import type { Meta, StoryObj } from '@storybook/react';
import { UniformComposition } from '@uniformdev/canvas-react';
import { Tabs, TabsVariant, TabsProps } from '@/canvas';
import { createFakeCompositionData, createUniformParameter } from '../utils';

const meta: Meta<typeof Tabs> = {
  title: 'Tabs',
  component: Tabs,
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const BASE_PROPS: TabsProps = {
  size: 'large',
  component: {
    type: 'tabs',
    variant: undefined,
    slots: {
      tabs: [
        {
          type: 'tab',
          parameters: createUniformParameter({ title: 'Tab 1' }),
          slots: {
            content: [
              {
                type: 'callToAction',
                parameters: createUniformParameter({
                  title: 'Content 1',
                  image:
                    'https://res.cloudinary.com/uniform-demos/image/upload/v1/csk-marketing/Rectangle_7_2_uupdjo_wm94da',
                  description:
                    "Use this paragraph to share information about your company or brand. Make it as engaging as possible, and showcase your brand's unique personality.",
                  eyebrowText: 'Hero component',
                }),
              },
            ],
          },
        },
        {
          type: 'tab',
          parameters: createUniformParameter({ title: 'Tab 2' }),
          slots: {
            content: [
              {
                type: 'callToAction',
                parameters: createUniformParameter({
                  title: 'Content 2',
                  image:
                    'https://res.cloudinary.com/uniform-demos/image/upload/v1/csk-marketing/Rectangle_7_2_uupdjo_wm94da',
                  description:
                    "Use this paragraph to share information about your company or brand. Make it as engaging as possible, and showcase your brand's unique personality.",
                  eyebrowText: 'Hero component',
                }),
              },
            ],
          },
        },
        {
          type: 'tab',
          parameters: createUniformParameter({ title: 'Tab 3' }),
          slots: {
            content: [
              {
                type: 'callToAction',
                parameters: createUniformParameter({
                  title: 'Content 3',
                  image:
                    'https://res.cloudinary.com/uniform-demos/image/upload/v1/csk-marketing/Rectangle_7_2_uupdjo_wm94da',
                  description:
                    "Use this paragraph to share information about your company or brand. Make it as engaging as possible, and showcase your brand's unique personality.",
                  eyebrowText: 'Hero component',
                }),
              },
            ],
          },
        },
      ],
    },
  },
};

const argTypes = {};

const renderStory = (args: TabsProps) => {
  const fakeComposition = createFakeCompositionData('tabs', args, { ...args.component.slots });
  return (
    <UniformComposition data={fakeComposition}>
      <Tabs {...args} />
    </UniformComposition>
  );
};

export const Default: Story = {
  args: BASE_PROPS,
  argTypes,
  render: renderStory,
};

export const Bordered: Story = {
  args: {
    ...BASE_PROPS,
    component: {
      ...BASE_PROPS.component,
      variant: TabsVariant.Bordered,
    },
  },
  argTypes,
  render: renderStory,
};

export const Boxed: Story = {
  args: {
    ...BASE_PROPS,
    component: {
      ...BASE_PROPS.component,
      variant: TabsVariant.Boxed,
    },
  },
  argTypes,
  render: renderStory,
};

export const Lifted: Story = {
  args: {
    ...BASE_PROPS,
    component: {
      ...BASE_PROPS.component,
      variant: TabsVariant.Lifted,
    },
  },
  argTypes,
  render: renderStory,
};
