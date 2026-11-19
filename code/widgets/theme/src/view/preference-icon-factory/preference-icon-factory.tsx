import { ShieldUserLineIcon, SunFillIcon, SunLineIcon } from '@sellgar/kit/icons';

import React from 'react';

import type { ThemePreference } from '../../classes/store/theme/theme-store.interface.ts';

interface IProps {
  preference: ThemePreference;
}

export const PreferenceIconFactory: React.FC<IProps> = (props) => {
  switch (props.preference) {
    case 'dark':
      return <SunFillIcon />;
    case 'light':
      return <SunLineIcon />;
    case 'system':
      return <ShieldUserLineIcon />;
  }
};
