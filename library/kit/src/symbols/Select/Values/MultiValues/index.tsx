import React from 'react';

import { Chip } from './Chip';
import type { ISelectedValue, TOptionValue } from '../../types';

import st from './default.module.scss';

interface IMultiValuesProps {
  values: ISelectedValue[];
  disabled?: boolean;
  readOnly?: boolean;
  onRemove(key: TOptionValue): void;
}

export const MultiValues = (props: IMultiValuesProps) => {
  const handleRemove = (key: TOptionValue) => {
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
