import React from 'react';
import { Await as AwaitRouter } from 'react-router-dom';

interface IProps {
  error: React.ReactNode;
  fallback: React.ReactNode;
  loader: React.Usable<any> | null;
}

export const Await: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  const execFunction = React.useCallback(() => props.loader, [props.loader]);
  const dataPromise = React.useMemo(() => execFunction(), [execFunction]);

  return (
    <React.Suspense fallback={props.fallback}>
      <AwaitRouter resolve={dataPromise} errorElement={props.error}>
        {props.children}
      </AwaitRouter>
    </React.Suspense>
  );
};
