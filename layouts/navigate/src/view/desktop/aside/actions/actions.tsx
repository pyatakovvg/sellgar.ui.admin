import { Sidebar } from '@sellgar/kit';
import { WidgetHost } from '@sellgar/app/react';
import { LogoutWidget } from '@widget/logout';
import { ThemeWidget } from '@widget/theme';

import React from 'react';

export const Actions: React.FC = () => {
  return (
    <Sidebar.Bottom>
      <WidgetHost token={ThemeWidget} props={{}} />
      <WidgetHost token={LogoutWidget} />
    </Sidebar.Bottom>
  );
};
