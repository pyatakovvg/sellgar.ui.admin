import type { Meta, StoryObj } from '@storybook/react';
import { SelectedList } from '@library/kit';

import React from 'react';

interface ISelectedListOption {
  uuid: number;
  value: string;
}

type Story = StoryObj<typeof SelectedList<ISelectedListOption>>;

const genOptions = () => {
  return [...Array(100)].map<ISelectedListOption>((_, index) => ({
    uuid: index,
    value: 'Label ' + index,
  })) as ISelectedListOption[];
};

const list = genOptions();

export default {
  title: 'Kit/Symbols/SelectedList',
  component: SelectedList,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      description: 'Заблокирован',
      table: {
        type: {
          defaultValue: false,
        },
      },
      control: 'boolean',
    },
  },
  decorators: [],
} satisfies Meta<typeof SelectedList>;

export const Base: Story = {
  name: 'Base SelectedList',
  args: {
    optionKey: 'uuid',
    optionValue: 'value',
    disabled: false,
    value: [3],
    options: list,
  },
  render: (props) => {
    const [value, setValue] = React.useState(props.value);

    function handleValue(value: any) {
      setValue(value);
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: 320, background: 'lightblue', overflow: 'auto' }}>
        <SelectedList isMultiselect {...props} value={value} onChange={handleValue} />
      </div>
    );
  },
};
