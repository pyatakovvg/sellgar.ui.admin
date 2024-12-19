import type { Meta, StoryObj } from '@storybook/react';
import { Button, EMode } from '@library/kit';

type Story = StoryObj<typeof Button>;

export default {
  title: 'Kit/Symbols/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: {
        type: 'select',
      },
      options: [EMode.PRIMARY, EMode.DANGER, EMode.SUCCESS],
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    inProcess: {
      control: {
        type: 'boolean',
      },
    },
  },
  args: {
    children: 'Button', // Set a default label for the button
  },
  decorators: [],
} satisfies Meta<typeof Button>;

export const DefaultButton: Story = {
  name: 'Base button',
  args: {
    mode: EMode.PRIMARY,
    disabled: false,
    children: 'Сохранить',
    inProcess: false,
  },
};
