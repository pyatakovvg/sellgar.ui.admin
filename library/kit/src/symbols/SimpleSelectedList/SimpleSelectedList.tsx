import React from 'react';

interface IProps<O, TOptionValue> {
  readonly options: readonly O[];
  readonly optionKey: keyof O;
  readonly optionValue: keyof O;
  value: TOptionValue | null;
  onChange(value: TOptionValue | null): void;
}

export const SimpleSelectedList = <O, TOptionValue>(props: IProps<O, TOptionValue>) => {
  console.log(props.options);
  return (
    <div>
      {props.options.map((option, index) => {
        const key = option[props.optionKey] as TOptionValue;
        const value = option[props.optionValue] as string;

        return (
          <div key={index} onClick={() => props.onChange(key)}>
            {value}
          </div>
        );
      })}
    </div>
  );
};
