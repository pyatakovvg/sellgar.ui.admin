import { MessageProvider, Message } from '@library/message';
import { Layout } from '@tiyn/app';
import type { LayoutViewProps } from '@tiyn/app';

import React from 'react';

const AppLayoutView: React.FC<LayoutViewProps> = (props) => {
  return (
    <MessageProvider>
      {props.children}
      <Message />
    </MessageProvider>
  );
};

@Layout({
  view: AppLayoutView,
})
export class AppLayout {}
