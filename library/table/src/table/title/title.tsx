import { Typography } from '@sellgar/kit';

import React from 'react';

import { context as columnContext } from '../column';

import s from './default.module.scss';

export interface IProps {
  data: any;
}

export const Title: React.FC<React.PropsWithChildren> = (props) => {
  const ref = React.useRef(null);
  const [dynamicWidth, setWidth] = React.useState(0);
  const { width } = React.use(columnContext);

  React.useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const borderBoxSize = entry.borderBoxSize[0];

        setWidth(borderBoxSize.inlineSize);
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return (
    <th ref={ref} className={s.wrapper} style={{ width }}>
      <div className={s.cell} style={{ width: dynamicWidth }}>
        <div className={s.content}>
          <Typography size={'caption-l'} weight={'medium'}>
            <p className={s.text}>
              {React.Children.map(props.children, (child) => {
                if (React.isValidElement(child)) {
                  return React.cloneElement(child as React.ReactElement<IProps>);
                }
                return child;
              })}
            </p>
          </Typography>
        </div>
      </div>
    </th>
  );
};
