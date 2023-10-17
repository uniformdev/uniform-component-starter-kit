import type { Meta, StoryObj } from '@storybook/react';
import { UniformComposition } from '@uniformdev/canvas-react';
import { Banner, BannerProps, BannerVariant } from '@/canvas';
import { createFakeCompositionData } from '../utils';
import { buttonStyleOptions } from '../constants';

const meta: Meta<typeof Banner> = {
  title: 'Banner',
  component: Banner,
};

export default meta;

type Story = StoryObj<typeof Banner>;

const args: Omit<BannerProps, 'component'> = {
  title: 'We Respect Your Privacy',
  textAlign: 'center' as Types.HorizontalAlignment,
  description:
    "Our website uses cookies to enhance your browsing experience and provide personalized content. We value your privacy and are committed to being transparent about the data we collect. By clicking 'Accept,' you consent to the use of cookies and similar technologies. You can manage your preferences and learn more about our data practices in our Privacy Policy. Please take a moment to review and adjust your settings. Thank you for visiting our website!",
  icon: 'https://res.cloudinary.com/uniform-demos/image/upload/v1692279521/csk-icons/component-icons/cookie_kqaswu_f3ismw.svg',
  inline: true,
  primaryButtonCopy: 'Home',
  primaryButtonLink: {
    path: '/',
  },
  position: 'center' as Types.AvailableBannerPosition,
  primaryButtonStyle: 'primary',
  secondaryButtonCopy: 'Components',
  secondaryButtonLink: {
    path: '/',
  },
  secondaryButtonStyle: 'link',
};

const argTypes = {
  position: { control: 'select', options: ['top', 'center', 'bottom'] },
  textAlign: { control: 'select', options: ['left', 'center', 'right'] },
  primaryButtonStyle: { control: 'select', options: buttonStyleOptions },
  secondaryButtonStyle: { control: 'select', options: buttonStyleOptions },
};

export const Default: Story = {
  args,
  argTypes,
  render: args => {
    const fakeComposition = createFakeCompositionData('banner', args, {});
    return (
      <UniformComposition data={fakeComposition}>
        <Banner {...args} />
      </UniformComposition>
    );
  },
};

export const FullWidth: Story = {
  args,
  argTypes,
  render: args => {
    const fakeComposition = createFakeCompositionData('banner', args, {});
    return (
      <UniformComposition data={fakeComposition}>
        <Banner
          {...args}
          component={{
            type: 'banner',
            variant: BannerVariant.FullWidth,
          }}
        />
      </UniformComposition>
    );
  },
};
