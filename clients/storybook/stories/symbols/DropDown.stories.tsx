import type { Meta, StoryObj } from '@storybook/react';
import { DropDown } from '@library/kit';

import React from 'react';

type Story = StoryObj<typeof DropDown>;

export default {
  title: 'Kit/Symbols/DropDown',
  component: DropDown,
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
} satisfies Meta<typeof DropDown>;

export const Base: Story = {
  name: 'Base DropDown',
  args: {
    disabled: false,
  },
  render: (props) => {
    return (
      <div
        style={{
          height: 280,
          overflow: 'hidden',
        }}
      >
        <DropDown disabled={props.disabled}>
          <DropDown.Content>
            <p style={{ border: '1px solid #000', cursor: 'pointer' }}>Таргет компонент</p>
          </DropDown.Content>
          <DropDown.List>
            <p>Контент в выпадающей области</p>
            <p>Контент в выпадающей области</p>
            <p>Контент в выпадающей области</p>
          </DropDown.List>
        </DropDown>
      </div>
    );
  },
};
