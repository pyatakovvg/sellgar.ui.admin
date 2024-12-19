import React from 'react';

import { dropDownContext } from '../../_parts/DropDown';
import { SimpleSelectedList } from '../../SimpleSelectedList';

interface IProps<O, TOptionValue> {
  readonly value: TOptionValue | null;
  readonly optionKey: keyof O;
  readonly optionValue: keyof O;
  readonly options: O[];
  onChange(key: TOptionValue): void;
}

export const List = <O, TOptionValue>(props: IProps<O, TOptionValue>) => {
  const { close } = React.useContext(dropDownContext);

  const handleChange = (key: TOptionValue) => {
    close();
    props.onChange(key);
  };

  return (
    <SimpleSelectedList
      value={props.value}
      optionKey={props.optionKey}
      optionValue={props.optionValue}
      options={props.options}
      onChange={handleChange}
    />
  );
};
