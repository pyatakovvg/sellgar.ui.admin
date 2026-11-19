import React from 'react';

import type { LayoutViewProps } from '@sellgar/app/react';

import { FrameLayout } from '@library/design';

import { Header } from './header';

export const LayoutView: React.FC<LayoutViewProps> = (props) => {
  return (
    <FrameLayout>
      <FrameLayout.Header>
        <Header />
      </FrameLayout.Header>
      <FrameLayout.Content>{props.children}</FrameLayout.Content>
    </FrameLayout>
  );
};
