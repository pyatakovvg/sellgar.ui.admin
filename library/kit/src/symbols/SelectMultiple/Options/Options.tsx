import React from 'react';

import { DropDownContext } from '@/base/DropDown';
import { ListMultiple } from '@/symbols/ListMultiple';

import { Empty } from './Empty';

import s from './default.module.scss';

interface IProps<T = any> {
  isSimplify?: boolean;
  optionKey: keyof T;
  optionValue: any;
  options: T[];
  value: T[];
  onChange: (value: any) => void;
}

export const Options: React.FC<IProps> = (props) => {
  const context = React.useContext(DropDownContext);

  return (
    <div className={s.wrapper}>
      {props.options.length ? (
        <ListMultiple
          isSimplify={props.isSimplify ?? false}
          optionKey={props.optionKey}
          optionValue={props.optionValue}
          value={props.value}
          options={props.options}
          onChange={(value) => {
            props.onChange(value);
            context.close();
          }}
        />
      ) : (
        <Empty />
      )}
    </div>
  );
};
