import React from 'react';

import { Icon, type TIcons } from '../Icon';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps {
  className?: string;
  icon: TIcons;
}

export const IconBox: React.FC<IProps> = ({ icon, className, ...props }) => {
  const classNameWrapper = React.useMemo(() => cn(s.wrapper, className), [className]);

  return (
    <div className={classNameWrapper} {...props}>
      <Icon icon={icon} size={22} />
    </div>
  );
};
