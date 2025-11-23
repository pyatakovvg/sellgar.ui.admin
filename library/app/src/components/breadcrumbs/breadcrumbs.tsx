import React from 'react';
import * as ReactRouter from 'react-router-dom';

import { Root } from './components/root';
import { Label } from './components/label';
import { NavLabel } from './components/nav-label';

import s from './default.module.scss';

export const Breadcrumbs = () => {
  const matches = ReactRouter.useMatches() as any[];

  const crumbs = React.useMemo(
    () =>
      matches
        .filter((match: any) => Boolean(match.handle?.crumb))
        .map((match) => {
          if (!match) {
            return void 0;
          }

          return match.handle.crumb(match.data);
        })
        .filter((match) => !!match),
    [matches],
  );

  return (
    <div className={s.wrapper}>
      <div className={s.item}>
        <Root hasCrumbs={!!crumbs.length} />
      </div>
      {crumbs.map((breadcrumb, index: number) => {
        return (
          <div key={index} className={s.item}>
            {index < crumbs.length - 1 ? (
              <NavLabel href={breadcrumb.href!} label={breadcrumb.label} />
            ) : (
              <Label label={breadcrumb.label} />
            )}
          </div>
        );
      })}
    </div>
  );
};
