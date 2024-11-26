import React from 'react';

import { Field } from './classes/field/field.ts';

import s from './default.module.scss';

export const MyInput = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      new Field({
        selector: ref.current,
        text: 'Hello world!',
        autoFocus: true,
      });
    }
  }, [ref]);

  return <div ref={ref} className={s.wrapper} />;
};
