import React from 'react';

import { Option } from './Option';

import st from './styles/default.module.scss';

interface IProps<T = any> {
  isSimplify: boolean;
  disabled?: boolean;
  optionKey: keyof T;
  optionValue: keyof T;
  options: T[];
  value: T[];
  onChange: (value: T) => void;
}

export const ListMultiple: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  function handleChange(value: any) {
    let currentValue = props.value;
    const index = currentValue.findIndex(
      (item) => (props.isSimplify ? item : item[props.optionKey]) === value[props.optionKey],
    );

    if (index >= 0) {
      props.onChange([...currentValue.slice(0, index), ...currentValue.slice(index + 1)]);
      return void 0;
    }
    props.onChange([...currentValue, props.isSimplify ? value[props.optionKey] : value]);
  }

  return (
    <div className={st.wrapper}>
      {props.options.map((option) => {
        const value = option[props.optionValue];
        const valueByKey = option[props.optionKey];

        return (
          <div key={valueByKey} className={st.option}>
            {props.children && React.isValidElement(props.children) ? (
              React.cloneElement(props.children, { ...option, onClick: () => handleChange(option) })
            ) : (
              <Option
                isSimplify={props.isSimplify}
                value={props.value}
                currentValue={valueByKey}
                optionKey={props.optionKey}
                onChange={() => handleChange(option)}
              >
                {value}
              </Option>
            )}
          </div>
        );
      })}
    </div>
  );
};
