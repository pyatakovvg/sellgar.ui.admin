import React from 'react';

import { Chip } from './Chip';
import { Placeholder } from './Placeholder';

import st from './default.module.scss';

interface IMultiValuesProps {
  isSimplify?: boolean;
  values: any[];
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  onRemove: (key: any) => void;
}

export const Values = (props: IMultiValuesProps) => {
  const handleRemove = (key: any) => {
    if (props.disabled) {
      return void 0;
    }
    props.onRemove(key);
  };

  if (!props.values.length) {
    return <Placeholder>{props.placeholder ?? 'Select values'}</Placeholder>;
  }

  return (
    <div className={st.container}>
      <div className={st.layout}>
        {props.values.map((value) => {
          return (
            <div key={value.key} className={st.col}>
              <Chip value={value} disabled={props.disabled} readOnly={props.readOnly} onRemove={handleRemove} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
