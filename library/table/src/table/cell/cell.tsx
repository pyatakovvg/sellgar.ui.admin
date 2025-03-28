import React from 'react';

import { Provider } from './cell.context.ts';

import { context as rowContext } from '../row';
import { context as columnContext } from '../column';

import s from './default.module.scss';

export interface IProps {
  data: any;
}

export const Cell: React.FC<React.PropsWithChildren> = (props) => {
  const { deps, data } = React.use(rowContext);
  const { accessor } = React.use(columnContext);

  return (
    <Provider value={{ deps, data: accessor ? data[accessor] : data }}>
      <td className={s.wrapper}>
        <div className={s.cell}>
          <div className={s.content}>
            {React.Children.map(props.children, (child) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child as React.ReactElement<React.PropsWithChildren & IProps>, {
                  data: accessor ? data[accessor] : data,
                  children: accessor ? data[accessor] : null,
                });
              }
              return child;
            })}
          </div>
        </div>
      </td>
    </Provider>
  );
};
