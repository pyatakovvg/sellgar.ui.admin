import React from 'react';

import { DropDownContext } from '@/base/DropDown';
import { ListSimple } from '@/symbols/ListSimple';

import { Empty } from './Empty';

import s from './default.module.scss';

interface IProps {
  isSimplify?: boolean;
  optionKey: string;
  optionValue: string;
  options: any[];
  value: any;
  onChange: (value: any) => void;
}

export const Options: React.FC<IProps> = (props) => {
  const context = React.useContext(DropDownContext);

  return (
    <div className={s.wrapper}>
      {props.options.length ? (
        <ListSimple
          isSimplify={props.isSimplify}
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
