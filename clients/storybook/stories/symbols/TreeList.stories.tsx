import type { Meta, StoryObj } from '@storybook/react';
import { TreeList } from '@library/kit';

import React from 'react';

interface ISelectedListOption {
  uuid: number;
  value: string;
}

type Story = StoryObj<typeof TreeList<ISelectedListOption>>;

const genOptions = () => {
  return [
    {
      code: 'men',
      title: 'Мужские',
      description: 'Товары для мужчин',
      parentCode: null,
      children: [
        {
          code: 'pants',
          title: 'Штаны',
          description: 'Мужские штаны',
          parentCode: 'men',
          children: [
            {
              code: 'SPORT',
              title: 'Спортивные штаны',
              description: 'Спорт товары',
              parentCode: 'pants',
              children: [],
            },
            {
              code: 'SHORTS',
              title: 'Шорты',
              description: 'Спортивные шорты',
              parentCode: 'pants',
              children: [],
            },
          ],
        },
      ],
    },
    {
      code: 'women',
      title: 'Женские',
      description: 'Товары для женщин',
      parentCode: null,
      children: [
        {
          code: 'w_pants',
          title: 'Штаны',
          description: 'Мужские штаны',
          parentCode: 'women',
          children: [
            {
              code: 'w_SPORT',
              title: 'Спортивные штаны',
              description: 'Спорт товары',
              parentCode: 'w_pants',
              children: [],
            },
            {
              code: 'w_SHORTS',
              title: 'Шорты',
              description: 'Спортивные шорты',
              parentCode: 'w_pants',
              children: [],
            },
          ],
        },
      ],
    },
  ];
};

const list = genOptions();

export default {
  title: 'Kit/Symbols/TreeList',
  component: TreeList,
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
} satisfies Meta<typeof TreeList>;

export const Base: Story = {
  name: 'Base TreeList',
  args: {
    optionKey: 'code',
    optionValue: 'title',
    disabled: false,
    value: ['SHORTS'],
    options: list,
  },
  render: (props) => {
    const [value, setValue] = React.useState(props.value);

    function handleValue(value: any) {
      setValue(value);
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: 320, background: 'lightblue', overflow: 'auto' }}>
        <TreeList isMultiselect {...props} value={value} onChange={handleValue} />
      </div>
    );
  },
};
