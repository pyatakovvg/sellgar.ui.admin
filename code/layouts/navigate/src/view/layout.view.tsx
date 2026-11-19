import { LayoutViewProps } from '@sellgar/app/react';

import React from 'react';

import { Desktop } from './desktop';
import { Mobile } from './mobile';
import { useScreenSize } from './hooks/screen-size.hook';

export const LayoutView: React.FC<LayoutViewProps> = (props) => {
  const screenSize = useScreenSize();

  if (screenSize.isDesktop) {
    return <Desktop {...props} />;
  } else if (screenSize.isTablet) {
    return <Desktop {...props} />;
  } else if (screenSize.isMobile) {
    return <Mobile {...props} />;
  }
};
