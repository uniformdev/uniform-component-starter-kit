import type { Meta, StoryObj } from '@storybook/react';
import { UniformComposition } from '@uniformdev/canvas-react';
import { RichText } from '@/canvas';
import { Container } from '@/components';
import { BackgroundTypes } from '@/utilities/styling';
import { createFakeCompositionData } from '../utils';

const meta: Meta<typeof RichText> = {
  title: 'RichText',
  component: RichText,
};

export default meta;

type Story = StoryObj<typeof RichText>;

const FAKE_COMPOSITION_DATA = createFakeCompositionData(
  'richText',
  {
    content: {
      type: 'richText',
      value: {
        root: {
          type: 'root',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              tag: 'h1',
              type: 'heading',
              format: 'start',
              indent: 0,
              version: 1,
              children: [
                {
                  mode: 'normal',
                  text: 'Exploring the Power of Rich Text: Unlocking Creative Content Creation',
                  type: 'text',
                  style: '',
                  detail: 0,
                  format: 0,
                  version: 1,
                },
              ],
              direction: 'ltr',
            },
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  mode: 'normal',
                  text: 'Rich Text',
                  type: 'text',
                  style: '',
                  detail: 0,
                  format: 1,
                  version: 1,
                },
                {
                  mode: 'normal',
                  text: ' components are ',
                  type: 'text',
                  style: '',
                  detail: 0,
                  format: 0,
                  version: 1,
                },
                {
                  mode: 'normal',
                  text: 'powerful tools',
                  type: 'text',
                  style: '',
                  detail: 0,
                  format: 8,
                  version: 1,
                },
                {
                  mode: 'normal',
                  text: ' that enable users to enhance their content with a wide range of formatting options, transforming ordinary text into visually appealing and dynamic representations. With their versatile capabilities, Rich Text components offer numerous benefits to users, making them a valuable asset in various ',
                  type: 'text',
                  style: '',
                  detail: 0,
                  format: 0,
                  version: 1,
                },
                {
                  mode: 'normal',
                  text: 'contexts',
                  type: 'text',
                  style: '',
                  detail: 0,
                  format: 2,
                  version: 1,
                },
                {
                  mode: 'normal',
                  text: '.',
                  type: 'text',
                  style: '',
                  detail: 0,
                  format: 0,
                  version: 1,
                },
              ],
              direction: 'ltr',
            },
            {
              tag: 'h2',
              type: 'heading',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  mode: 'normal',
                  text: 'Benefits',
                  type: 'text',
                  style: '',
                  detail: 0,
                  format: 0,
                  version: 1,
                },
              ],
              direction: 'ltr',
            },
            {
              tag: 'ol',
              type: 'list',
              start: 1,
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  type: 'listitem',
                  value: 1,
                  format: '',
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      mode: 'normal',
                      text: 'Enhanced Visual Appeal: Rich Text components allow users to apply formatting options such as bold, italics, underlining, font styles, sizes, and colors, resulting in visually appealing and attractive content.',
                      type: 'text',
                      style: '',
                      detail: 0,
                      format: 0,
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                },
                {
                  type: 'listitem',
                  value: 2,
                  format: '',
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      mode: 'normal',
                      text: 'Improved Readability: By utilizing headings, subheadings, bullet points, and numbered lists, Rich Text components help users organize and structure their content, making it easier to read and comprehend.',
                      type: 'text',
                      style: '',
                      detail: 0,
                      format: 0,
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                },
                {
                  type: 'listitem',
                  value: 3,
                  format: '',
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      mode: 'normal',
                      text: 'Emphasizing Key Points: With features like bold and italics, Rich Text components enable users to highlight important information and emphasize key points, ensuring that crucial details stand out to the reader.',
                      type: 'text',
                      style: '',
                      detail: 0,
                      format: 0,
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                },
                {
                  type: 'listitem',
                  value: 4,
                  format: '',
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      mode: 'normal',
                      text: 'Flexibility in Content Organization: Rich Text components offer the flexibility to align text, adjust margins, create indents, and format paragraphs, allowing users to optimize the layout and presentation of their content.',
                      type: 'text',
                      style: '',
                      detail: 0,
                      format: 0,
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                },
              ],
              listType: 'number',
              direction: 'ltr',
            },
            {
              tag: 'h2',
              type: 'heading',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  mode: 'normal',
                  text: 'Why we should use it?',
                  type: 'text',
                  style: '',
                  detail: 0,
                  format: 0,
                  version: 1,
                },
              ],
              direction: 'ltr',
            },
            {
              tag: 'ul',
              type: 'list',
              start: 1,
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  type: 'listitem',
                  value: 1,
                  format: '',
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      mode: 'normal',
                      text: 'Multimedia Integration: Users can seamlessly incorporate multimedia elements such as images, videos, audio files, hyperlinks, and interactive elements into their text, enriching the content and enhancing the user experience.',
                      type: 'text',
                      style: '',
                      detail: 0,
                      format: 0,
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                },
                {
                  type: 'listitem',
                  value: 2,
                  format: '',
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      mode: 'normal',
                      text: 'Collaboration and Version Control: Rich Text components facilitate collaborative work by allowing multiple users to make real-time edits, track changes, add comments, and revert to previous versions, promoting efficient teamwork and effective communication.',
                      type: 'text',
                      style: '',
                      detail: 0,
                      format: 0,
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                },
                {
                  type: 'listitem',
                  value: 3,
                  format: '',
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      mode: 'normal',
                      text: 'Accessibility: Rich Text components often support accessibility features such as screen readers, making the content accessible to individuals with disabilities and ensuring inclusivity.',
                      type: 'text',
                      style: '',
                      detail: 0,
                      format: 0,
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                },
                {
                  type: 'listitem',
                  value: 4,
                  format: '',
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      mode: 'normal',
                      text: 'Cross-Platform Compatibility: Rich Text components are compatible with various platforms and devices, allowing users to access and edit their content seamlessly across desktop computers, laptops, tablets, and mobile phones.',
                      type: 'text',
                      style: '',
                      detail: 0,
                      format: 0,
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                },
              ],
              listType: 'bullet',
              direction: 'ltr',
            },
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  mode: 'normal',
                  text: 'Time Efficiency: With intuitive interfaces and user-friendly controls, Rich Text components simplify the content creation process, saving users time and effort in formatting and structuring their text.',
                  type: 'text',
                  style: '',
                  detail: 0,
                  format: 0,
                  version: 1,
                },
              ],
              direction: 'ltr',
            },
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  mode: 'normal',
                  text: 'Rich Text',
                  type: 'text',
                  style: '',
                  detail: 0,
                  format: 1,
                  version: 1,
                },
                {
                  mode: 'normal',
                  text: ' components are also ',
                  type: 'text',
                  style: '',
                  detail: 0,
                  format: 0,
                  version: 1,
                },
                {
                  mode: 'normal',
                  text: 'user-friendly',
                  type: 'text',
                  style: '',
                  detail: 0,
                  format: 1,
                  version: 1,
                },
                {
                  mode: 'normal',
                  text: ' and accessible. Users with limited technical knowledge can easily navigate the intuitive interface, and the formatting options are often presented in a familiar and straightforward manner. Additionally, ',
                  type: 'text',
                  style: '',
                  detail: 0,
                  format: 0,
                  version: 1,
                },
              ],
              direction: 'ltr',
            },
            {
              type: 'quote',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  mode: 'normal',
                  text: 'Rich Text components usually support screen readers and other assistive technologies, enabling individuals with disabilities to access and interact with the content effectively.',
                  type: 'text',
                  style: '',
                  detail: 0,
                  format: 0,
                  version: 1,
                },
              ],
              direction: 'ltr',
            },
            {
              type: 'paragraph',
              format: 'start',
              indent: 0,
              version: 1,
              children: [],
              direction: 'ltr',
            },
          ],
          direction: 'ltr',
        },
      },
    },
  },
  {}
);

export const Default: Story = {
  args: {},
  render: args => (
    <UniformComposition data={FAKE_COMPOSITION_DATA}>
      <Container backgroundType={BackgroundTypes.Medium}>
        <RichText {...args} />
      </Container>
    </UniformComposition>
  ),
};

export const Light: Story = {
  args: {
    component: {
      type: 'richtext',
      variant: 'light',
    },
  },
  render: args => (
    <UniformComposition data={FAKE_COMPOSITION_DATA}>
      <Container backgroundType={BackgroundTypes.Dark}>
        <RichText {...args} />
      </Container>
    </UniformComposition>
  ),
};
