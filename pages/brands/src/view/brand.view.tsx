import { BrandDrawer } from '@drawer/brand-modify';
import { PageStickyStack } from '@library/design';

import React from 'react';

import { Header } from './header';
import { Filter } from './filter';
import { Content } from './content';

import s from './default.module.scss';

export const BrandView = () => {
  return (
    <>
      <PageStickyStack className={s.wrapper}>
        <PageStickyStack.Item className={s.header} sticky={true} scale={true} scaleMin={0.6} stickyOffset={16}>
          <Header />
        </PageStickyStack.Item>
        <PageStickyStack.Item className={s.filter} sticky={true} stickyOffset={16}>
          <Filter />
        </PageStickyStack.Item>
        <PageStickyStack.Item className={s.filter}>
          <div style={{ height: 300, background: 'red' }}></div>
        </PageStickyStack.Item>
        <PageStickyStack.Item className={s.content} sticky={true} stickyOffset={16}>
          <Content />
        </PageStickyStack.Item>
        <PageStickyStack.Item className={s.filter}>
          <div style={{ height: 300, background: 'red' }}></div>
        </PageStickyStack.Item>
      </PageStickyStack>
      <BrandDrawer />
    </>
  );
};
