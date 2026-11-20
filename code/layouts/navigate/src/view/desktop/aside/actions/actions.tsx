import { Sidebar } from '@sellgar/kit';
import { WidgetHost } from '@sellgar/app/react';
import { LogoutWidget } from '@widget/logout';
import { ThemeWidget } from '@widget/theme';

import React from 'react';

export const Actions: React.FC = () => {
  return (
    <Sidebar.Bottom>
      <Sidebar.Additional>
        <WidgetHost token={LogoutWidget} />
      </Sidebar.Additional>
      <Sidebar.Additional>
        <WidgetHost token={ThemeWidget} props={{}} />
      </Sidebar.Additional>
    </Sidebar.Bottom>
  );
};
