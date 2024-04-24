import React from 'react';

import { Chip } from './Chip';

import st from './default.module.scss';

interface IMultiValuesProps {
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

  return (
    <div className={st.container}>
      <div className={st.layout}>
        {props.values.map((value) => (
          <div key={value.key} className={st.col}>
            <Chip value={value} disabled={props.disabled} readOnly={props.readOnly} onRemove={handleRemove} />
          </div>
        ))}
      </div>
    </div>
  );
};
