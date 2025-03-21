import React from 'react';

import { Typography } from '@sellgar/kit';

import s from './default.module.scss';

const PageComponent: React.FC<React.PropsWithChildren> = (props) => {
  return <div className={s.wrapper}>{props.children}</div>;
};

const Header: React.FC<React.PropsWithChildren> = (props) => {
  return <div className={s.header}>{props.children}</div>;
};

const Title: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <div className={s.title}>
      <Typography size={'h6'} weight={'bold'}>
        <h6>{props.children}</h6>
      </Typography>
    </div>
  );
};

const Controls: React.FC<React.PropsWithChildren> = (props) => {
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

type TPage = typeof PageComponent & {
  Header: typeof Header & {
    Title: typeof Title;
    Controls: typeof Controls;
  };
  Filter: typeof Filter;
  Menu: typeof Menu;
  Content: typeof Content;
};

export const Page: TPage = Object.assign(PageComponent, {
  Header: Object.assign(Header, {
    Title,
    Controls,
  }),
  Filter,
  Menu,
  Content,
});
