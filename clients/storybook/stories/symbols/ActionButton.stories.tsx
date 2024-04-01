import type { Meta, StoryObj } from '@storybook/react';
import { ActionButton } from '@library/kit';

type Story = StoryObj<typeof ActionButton>;

export default {
  title: 'Kit/Symbols/ActionButton',
  component: ActionButton,
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Контент',
    },
  },
  decorators: [],
} satisfies Meta<typeof ActionButton>;

export const BaseButton: Story = {
  name: 'Action button',
  args: {},
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', flex: '1 0', padding: 8, background: '#ccc' }}>
        <div style={{ display: 'block' }}>
          <ActionButton caption={'Меню'}>
            <ActionButton.Action icon={'xmark'} title={'Первая строчка'} />
            <ActionButton.Action icon={'xmark'} title={'Вторая строчка'} />
            <ActionButton.Action icon={'xmark'} title={'Третья строчка'} />
            <ActionButton.Action icon={'xmark'} title={'Четвертая строчка'} />
          </ActionButton>
        </div>
      </div>
    );
  },
};
