import React from 'react';

import { WidgetView } from './view';
import { WidgetProvider } from './widget.provider.tsx';

interface IProps {
  uuid?: string;
  onCancel(): void;
  onSuccess(): void;
}

export const Widget: React.FC<IProps> = (props) => {
  return (
    <WidgetProvider uuid={props.uuid} onCancel={props.onCancel} onSuccess={props.onSuccess}>
      <WidgetView />
    </WidgetProvider>
  );
};
