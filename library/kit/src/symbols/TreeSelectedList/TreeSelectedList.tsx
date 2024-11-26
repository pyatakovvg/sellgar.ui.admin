import React from 'react';

import { Icon } from '../Icon';
import { Option } from '../Option';
import { Text } from '../../typography/Text';

import s from './default.module.scss';

interface IProps<O, TOptionValue> {
  readonly options: readonly O[];
  readonly optionKey: keyof O;
  readonly optionValue: keyof O;
  readonly optionSubItemsKey: keyof O;
  value: TOptionValue | null;
  onChange(value: TOptionValue | null): void;
}

interface IValue<TOptionValue> {
  key: TOptionValue;
  value: TOptionValue;
}

const getValue = <O, TOptionValue>(
  options: readonly O[],
  value: TOptionValue | null,
  optionKey: keyof O,
  optionValue: keyof O,
): IValue<TOptionValue> | null => {
  const foundOption = options.find((option) => option[optionKey] === value);
  if (foundOption) {
    return {
      key: foundOption[optionKey] as TOptionValue,
      value: foundOption[optionValue] as TOptionValue,
    };
  }
  return null;
};

export const TreeSelectedList = <O, TOptionValue>(props: IProps<O, TOptionValue>) => {
  const selectedValue = React.useMemo(
    () => getValue(props.options, props.value, props.optionKey, props.optionValue),
    [props.options, props.value],
  );

  return (
    <div className={s.wrapper}>
      {props.options.map((option, index) => {
        const key = option[props.optionKey] as TOptionValue;
        const value = option[props.optionValue] as string;
        const children = option[props.optionSubItemsKey] as O[];

        return (
          <div key={index} className={s.content}>
            <div className={s.option} onClick={() => props.onChange(key)}>
              <Option
                isActive={key === selectedValue?.key}
                leftSlot={Array.isArray(children) && !!children.length && <Icon icon={'arrow_drop_down'} size={16} />}
              >
                <Text>{value}</Text>
              </Option>
            </div>
            {Array.isArray(children) && !!children.length && (
              <div className={s.children}>
                <TreeSelectedList
                  options={children}
                  optionKey={props.optionKey}
                  optionValue={props.optionValue}
                  optionSubItemsKey={props.optionSubItemsKey}
                  value={props.value}
                  onChange={(key) => props.onChange(key)}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
