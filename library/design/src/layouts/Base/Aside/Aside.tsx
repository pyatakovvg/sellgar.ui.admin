import { Icon } from '@library/kit';

import React from 'react';

import { AsideMenu } from '../../../AsideMenu';

import cn from 'classnames';
import st from './default.module.scss';

const saveToLocalStorage = (value: boolean) => {
  localStorage.setItem('aside', String(value));
};

const getFromLocalStorage = (): boolean => {
  return localStorage.getItem('aside') === 'true';
};

export const Aside: React.FC = () => {
  const [isOpen, setOpen] = React.useState(() => getFromLocalStorage());

  const wrapperClassName = React.useMemo(() => {
    return cn(st.wrapper, {
      [st['wrapper--open']]: !isOpen,
    });
  }, [isOpen]);

  const handleOpen = () => {
    setOpen(!isOpen);
    saveToLocalStorage(!isOpen);
  };

  return (
    <div className={wrapperClassName}>
      <div className={st.content}>
        <AsideMenu isFull={isOpen} />
      </div>
      <div className={st.control}>
        <div className={st.icon} onClick={handleOpen}>
          <Icon icon={isOpen ? 'circle-chevron-left' : 'circle-chevron-right'} />
        </div>
      </div>
    </div>
  );
};
