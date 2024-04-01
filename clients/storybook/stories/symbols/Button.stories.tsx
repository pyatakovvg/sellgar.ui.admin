import type { Meta, StoryObj } from '@storybook/react';
import { Button, Icon, EMode, ESize, EVariant } from '@library/kit';

type Story = StoryObj<typeof Button>;

export default {
  title: 'Kit/Symbols/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Контент',
    },
    size: {
      description: 'Размер',
      defaultValue: ESize.MEDIUM,
      table: {
        type: {
          defaultValue: ESize.MEDIUM,
        },
      },
      options: [ESize.SMALL, ESize.MEDIUM, ESize.LARGE],
      control: { type: 'select' },
    },
    variant: {
      description: 'Вариант',
      defaultValue: EVariant.PRIMARY,
      table: {
        type: {
          defaultValue: EVariant.PRIMARY,
        },
      },
      options: [EVariant.PRIMARY, EVariant.SECONDARY, EVariant.GHOST],
      control: { type: 'select' },
    },
    mode: {
      description: 'Цвет',
      defaultValue: EMode.DEFAULT,
      table: {
        type: {
          defaultValue: EMode.DEFAULT,
        },
      },
      options: [EMode.DEFAULT, EMode.SUCCESS, EMode.DANGER],
      control: { type: 'select' },
    },
    disabled: {
      description: 'Заблокирован',
      table: {
        type: {
          defaultValue: false,
        },
      },
      control: 'boolean',
    },
    inProcess: {
      description: 'Процессинг',
      table: {
        type: {
          defaultValue: false,
        },
      },
      control: 'boolean',
    },
  },
  decorators: [],
} satisfies Meta<typeof Button>;

export const BaseButton: Story = {
  name: 'Base button',
  args: {
    size: ESize.MEDIUM,
    variant: EVariant.PRIMARY,
    mode: EMode.DEFAULT,
    disabled: false,
    children: 'Сохранить',
    leftIcon: undefined,
    rightIcon: undefined,
    inProcess: false,
  },
  render: (props) => {
    return (
      <>
        <div>
          <Button {...props}>Войти</Button>
        </div>
        <div style={{ margin: '16px 0 0' }}>
          <Button {...props} leftIcon={<Icon icon={'floppy-disk'} weight={'regular'} />} />
        </div>
        <div style={{ margin: '16px 0 0' }}>
          <Button {...props} mode={EMode.SUCCESS} rightIcon={<Icon icon={'chevron-right'} />}>
            Далее
          </Button>
        </div>
      </>
    );
  },
};
