// import { useVirtualizer } from '@tanstack/react-virtual';

import React from 'react';

import { OptionList } from './OptionList';

import type { ISelectedList } from './types';

import st from './styles/default.module.scss';

export const SelectedList = <O extends Record<string, any> = {}>(props: ISelectedList<O>) => {
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);

  function handleChange(valueByKey: any) {
    if (props.isMultiselect) {
      let currentValue = props.value;
      if (!(currentValue instanceof Array)) {
        currentValue = [];
      }
      const index = currentValue.indexOf(valueByKey);
      if (index >= 0) {
        props.onChange([...currentValue.slice(0, index), ...currentValue.slice(index + 1)]);
        return void 0;
      }
      props.onChange([...currentValue, valueByKey]);
      return void 0;
    }
    props.onChange(valueByKey);
  }

  // const virtualize = useVirtualizer({
  //   count: props.options.length,
  //   getScrollElement: () => wrapperRef.current,
  //   estimateSize: () => 20,
  //   overscan: 5,
  // });

  return (
    <div ref={wrapperRef} className={st.wrapper}>
      {props.options.map((option) => {
        const value = option[props.optionValue];
        const valueByKey = option[props.optionKey];

        return (
          <div key={valueByKey} className={st.option}>
            {props.children && React.isValidElement(props.children) ? (
              React.cloneElement(props.children, option)
            ) : (
              <OptionList
                isMultiple={props.isMultiselect}
                currentValue={valueByKey}
                value={props.value}
                onClick={() => handleChange(valueByKey)}
              >
                {value}
              </OptionList>
            )}
          </div>
        );
      })}
    </div>
  );
};
