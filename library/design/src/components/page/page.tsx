import React from 'react';

import { Typography } from '@sellgar/kit';

import cn from 'classnames';
import s from './default.module.scss';

interface IPageProps {
  className?: string;
}

const PageComponent: React.FC<React.PropsWithChildren<IPageProps>> = (props) => {
  const className = React.useMemo(() => cn(s.wrapper, props.className), [props.className]);

  return <div className={className}>{props.children}</div>;
};

const Header: React.FC<React.PropsWithChildren> = (props) => {
  return <div className={s.header}>{props.children}</div>;
};

const Title: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <div className={s.title}>
      <Typography size={'body-l'} weight={'semi-bold'}>
        <h2>{props.children}</h2>
      </Typography>
    </div>
  );
};

const HeaderControls: React.FC<React.PropsWithChildren> = (props) => {
  return <div className={s.controls}>{props.children}</div>;
};

const Filter: React.FC<React.PropsWithChildren> = (props) => {
  return <div className={s.filter}>{props.children}</div>;
};

const Menu: React.FC<React.PropsWithChildren> = (props) => {
  return <div className={s.menu}>{props.children}</div>;
};

const Content: React.FC<React.PropsWithChildren> = (props) => {
  return <div className={s.content}>{props.children}</div>;
};

const Controls: React.FC<React.PropsWithChildren> = (props) => {
  return <div className={s.control}>{props.children}</div>;
};

type TPage = typeof PageComponent & {
  Header: typeof Header & {
    Title: typeof Title;
    Controls: typeof HeaderControls;
  };
  Filter: typeof Filter;
  Menu: typeof Menu;
  Content: typeof Content;
  Controls: typeof Controls;
};

export const Page: TPage = Object.assign(PageComponent, {
  Header: Object.assign(Header, {
    Title,
    Controls: HeaderControls,
  }),
  Filter,
  Menu,
  Content,
  Controls,
});
