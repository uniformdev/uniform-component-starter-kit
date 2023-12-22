import type { Meta, StoryObj } from '@storybook/react';
import { UniformComposition } from '@uniformdev/canvas-react';
import { Table, TableProps } from '@/canvas';
import { createFakeCompositionData } from '../utils';

const meta: Meta<typeof Table> = {
  title: 'Table',
  component: Table,
};

export default meta;
type Story = StoryObj<typeof Table>;

const BASE_PROPS: TableProps = {
  size: 'large',
  component: {
    type: 'table',
    slots: {
      tableHead: [
        {
          type: 'tableRow',
          slots: {
            cells: [
              {
                type: 'tableHeaderCell',
                parameters: {
                  value: {
                    type: 'text',
                    value: 'Name',
                  },
                },
              },
              {
                type: 'tableHeaderCell',
                parameters: {
                  value: {
                    type: 'text',
                    value: 'Age',
                  },
                },
              },
              {
                type: 'tableHeaderCell',
                parameters: {
                  value: {
                    type: 'text',
                    value: 'Location',
                  },
                },
              },
              {
                type: 'tableHeaderCell',
                parameters: {
                  value: {
                    type: 'text',
                    value: 'Occupation',
                  },
                },
              },
            ],
          },
        },
      ],
      tableBody: [
        {
          type: 'tableRow',
          slots: {
            cells: [
              {
                type: 'tableDataCell',
                parameters: {
                  value: {
                    type: 'text',
                    value: 'John Smith',
                  },
                },
              },
              {
                type: 'tableDataCell',
                parameters: {
                  value: {
                    type: 'text',
                    value: '32',
                  },
                },
              },
              {
                type: 'tableDataCell',
                parameters: {
                  value: {
                    type: 'text',
                    value: 'New York',
                  },
                },
              },
              {
                type: 'tableDataCell',
                parameters: {
                  value: {
                    type: 'text',
                    value: 'Software Engineer',
                  },
                },
              },
            ],
          },
        },
        {
          type: 'tableRow',
          slots: {
            cells: [
              {
                type: 'tableDataCell',
                parameters: {
                  value: {
                    type: 'text',
                    value: 'Jane Doe',
                  },
                },
              },
              {
                type: 'tableDataCell',
                parameters: {
                  value: {
                    type: 'text',
                    value: '28',
                  },
                },
              },
              {
                type: 'tableDataCell',
                parameters: {
                  value: {
                    type: 'text',
                    value: 'Los Angeles ',
                  },
                },
              },
              {
                type: 'tableDataCell',
                parameters: {
                  value: {
                    type: 'text',
                    value: 'Graphic Designer',
                  },
                },
              },
            ],
          },
        },
        {
          type: 'tableRow',
          slots: {
            cells: [
              {
                type: 'tableDataCell',
                parameters: {
                  value: {
                    type: 'text',
                    value: 'Robert Lee',
                  },
                },
              },
              {
                type: 'tableDataCell',
                parameters: {
                  value: {
                    type: 'text',
                    value: '45',
                  },
                },
              },
              {
                type: 'tableDataCell',
                parameters: {
                  value: {
                    type: 'text',
                    value: 'Chicago',
                  },
                },
              },
              {
                type: 'tableDataCell',
                parameters: {
                  value: {
                    type: 'text',
                    value: 'Accountant',
                  },
                },
              },
            ],
          },
        },
        {
          type: 'tableRow',
          slots: {
            cells: [
              {
                type: 'tableDataCell',
                parameters: {
                  value: {
                    type: 'text',
                    value: 'Sarah Brown',
                  },
                },
              },
              {
                type: 'tableDataCell',
                parameters: {
                  value: {
                    type: 'text',
                    value: '36',
                  },
                },
              },
              {
                type: 'tableDataCell',
                parameters: {
                  value: {
                    type: 'text',
                    value: 'San Francisco',
                  },
                },
              },
              {
                type: 'tableDataCell',
                parameters: {
                  value: {
                    type: 'text',
                    value: 'Marketing Manager',
                  },
                },
              },
            ],
          },
        },
      ],
    },
  },
};

const argTypes = {};

const renderStory = (args: TableProps) => {
  const fakeComposition = createFakeCompositionData('table', args, { ...args.component.slots });
  return (
    <UniformComposition data={fakeComposition}>
      <Table {...args} />
    </UniformComposition>
  );
};

export const Default: Story = {
  args: BASE_PROPS,
  argTypes,
  render: renderStory,
};

export const Zebra: Story = {
  args: {
    ...BASE_PROPS,
    component: {
      ...BASE_PROPS.component,
      variant: 'zebra',
    },
  },
  argTypes,
  render: renderStory,
};
