import { MessageProvider, Message } from '@library/message';

import React from 'react';

export const AppLayout: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <MessageProvider>
      {props.children}
      <Message />
    </MessageProvider>
  );
};
