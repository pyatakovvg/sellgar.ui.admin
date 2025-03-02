import React from 'react';
import { observer } from 'mobx-react';
import { useMatches } from 'react-router-dom';

import { Root } from './Root';
import { Label } from './Label';
import { NavLabel } from './NavLabel';

import { useGetBreadcrumb } from '../../hooks/useGetBreadcrumbs.ts';
import { useAddBreadcrumb } from '../../hooks/useAddBreadcrumb.ts';
import { useResetBreadcrumbs } from '../../hooks/useResetBreadcrumbs.ts';

import s from './default.module.scss';

export const Breadcrumbs = observer(() => {
  const breadcrumbs = useGetBreadcrumb();
  const addBreadcrumb = useAddBreadcrumb();
  const resetBreadcrumbs = useResetBreadcrumbs();

  const matches = useMatches() as any[];

  React.useEffect(() => {
    const matchesBreadcrumbs = matches.filter((match: any) => Boolean(match.handle?.crumb));

    resetBreadcrumbs();

    matchesBreadcrumbs.forEach((match) => {
      if (!match.handle.crumb()) {
        return;
      }
      const crumb = match.handle.crumb();
      const id = crumb.id;

      addBreadcrumb({
        id,
        type: !!id ? 'FUNCTION' : 'CRUMB',
        inProcess: !!id,
        params: crumb,
      });
    });
  }, [matches]);

  return (
    <div className={s.wrapper}>
      <div className={s.item}>
        <Root />
      </div>
      {breadcrumbs.map((breadcrumb, index: number) => {
        return (
          <div key={index} className={s.item}>
            {index < breadcrumbs.length - 1 ? (
              <NavLabel
                href={breadcrumb.params.href!}
                label={breadcrumb.params.label}
                inProcess={breadcrumb.inProcess}
              />
            ) : (
              <Label label={breadcrumb.params.label} inProcess={breadcrumb.inProcess} />
            )}
          </div>
        );
      })}
    </div>
  );
});
