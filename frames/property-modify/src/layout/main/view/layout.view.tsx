import { FrameLayout } from '@library/design';
import type { LayoutViewProps } from '@sellgar/app';

import React from 'react';

import { Header } from './header';
import { Controls } from './controls';

export const LayoutView: React.FC<LayoutViewProps> = (props) => {
  return (
    <FrameLayout>
      <FrameLayout.Header>
        <Header />
      </FrameLayout.Header>
      <FrameLayout.Content>{props.children}</FrameLayout.Content>
      <FrameLayout.Controls>
        <Controls />
      </FrameLayout.Controls>
    </FrameLayout>
  );
};
