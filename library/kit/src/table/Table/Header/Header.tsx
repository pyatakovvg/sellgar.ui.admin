import React from 'react';
import { Header as IHeader, RowData, Column, flexRender } from '@tanstack/react-table';

import { Typography } from '@sellgar/kit';

import { getCommonPinningStyles } from '../table.utils.ts';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps<TData, TValue> {
  header: IHeader<TData, TValue>;
}

export const Header = <TData extends RowData, TValue>(props: IProps<TData, TValue>) => {
  return (
    <th
      colSpan={props.header.colSpan}
      style={{
        position: 'relative',
        width: props.header.getSize(),
        ...getCommonPinningStyles(props.header.column),
      }}
    >
      {props.header.isPlaceholder ? null : (
        <div
          className={cn(s.wrapper, {
            [s['mode--left']]: true,
          })}
        >
          <Typography size={'caption-l'} weight={'medium'}>
            <p>{flexRender(props.header.column.columnDef.header, props.header.getContext())}</p>
          </Typography>
        </div>
      )}
      {props.header.column.getCanResize() && (
        <div
          className={s.resize}
          onMouseDown={props.header.getResizeHandler()}
          onTouchStart={props.header.getResizeHandler()}
        ></div>
      )}
    </th>
  );
};
