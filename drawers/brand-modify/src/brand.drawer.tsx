import { Drawer } from '@sellgar/kit';
import { useLocation } from '@library/app';

import React from 'react';

import { Widget } from './widget';

export const BrandDrawer: React.FC = () => {
  const [isOpen, setOpen] = React.useState(false);

  const location = useLocation();

  React.useEffect(() => {
    setOpen('brand' in location.hash);
  }, [location.hash]);

  return (
    <Drawer isEscapeClosable={true} isOverlayClosable={true} open={isOpen} onClose={() => setOpen(false)}>
      <Widget />
    </Drawer>
  );
};
