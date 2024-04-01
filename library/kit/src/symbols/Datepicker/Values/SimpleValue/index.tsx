import React from 'react';
import moment from 'moment';

import cn from 'classnames';
import st from './default.module.scss';

interface IMultiValuesProps {
  value: string | null;
  format?: string;
  isUTC?: boolean;
  disabled?: boolean;
}

export const SimpleValue = (props: IMultiValuesProps) => {
  const textClassName = React.useMemo(
    () =>
      cn(st.text, {
        [st.disabled]: props.disabled,
      }),
    [props.disabled],
  );

  const value = React.useMemo(() => {
    if (props.isUTC) {
      return moment(props.value).utc();
    }
    return moment(props.value);
  }, [props.value, props.isUTC]);

  return (
    <div className={st.wrapper}>
      <div className={st.content}>
        <span className={textClassName}>{value.format(props?.format ?? 'LL')}</span>
      </div>
    </div>
  );
};
