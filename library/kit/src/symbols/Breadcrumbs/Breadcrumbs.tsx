import React from 'react';
import { useMatches } from 'react-router-dom';

import { Root } from './Root';
import { Label } from './Label';
import { NavLabel } from './NavLabel';

import type { IBreadcrumb, IBreadcrumbLink, IBreadcrumbLabel } from './breadcrumbs.types.ts';

import { useGetBreadcrumb } from './useGetBreadcrumbs.ts';
import { useSetBreadcrumbs } from './useSetBreadcrumbs.ts';

import s from './default.module.scss';

export const Breadcrumbs = () => {
  const breadcrumbs = useGetBreadcrumb();
  const setBreadcrumbs = useSetBreadcrumbs();

  const matches = useMatches() as any[];

  React.useEffect(() => {
    const matchesBreadcrumbs = matches
      .filter((match: any) => Boolean(match.handle?.crumb))
      .map((match: any) => match.handle.crumb())
      .filter((crumb: any) => crumb);

    setBreadcrumbs(matchesBreadcrumbs);
  }, [matches]);

  return (
    <div className={s.wrapper}>
      <div className={s.item}>
        <Root />
      </div>
      {breadcrumbs.map((breadcrumb: IBreadcrumb, index: number) => (
        <div key={index} className={s.item}>
          {index < breadcrumbs.length - 1 ? (
            <NavLabel href={(breadcrumb as IBreadcrumbLink).href}>{(breadcrumb as IBreadcrumbLink).label}</NavLabel>
          ) : (
            <Label>{(breadcrumb as IBreadcrumbLabel).label}</Label>
          )}
        </div>
      ))}
    </div>
  );
};
