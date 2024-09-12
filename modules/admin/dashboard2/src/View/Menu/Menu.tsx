import React from 'react';

import { CustomItem } from './CustomItem';
import { IconItem } from './IconItem';
import { TextItem } from './TextItem';

import s from './default.module.scss';

const MenuParent: React.FC<React.PropsWithChildren> = (props) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <div className={s.wrapper}>
      {React.Children.map(props.children, (child, index) => {
        return (
          <div className={s.item}>
            {React.cloneElement(child as any, {
              isActive: index === activeIndex,
              onClick: () => setActiveIndex(index),
            })}
          </div>
        );
      })}
    </div>
  );
};

export const Menu = Object.assign(MenuParent, {
  CustomItem,
  IconItem,
  TextItem,
});
