import React from 'react';

import { Circle } from './Circle';
import { Dotted } from './Dotted';

interface IProps {
  variant?: 'DOTTED' | 'CIRCLE';
}

export const Spinner: React.FC<IProps> = (props) => {
  if (props.variant === 'DOTTED') {
    return <Dotted />;
  }
  return <Circle />;
};
