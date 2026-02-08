import { Drawer } from '@sellgar/kit';
import { useLocation, useNavigate } from '@library/app';

import React from 'react';

import { Widget } from './widget';

export const BrandDrawer: React.FC = () => {
  const [isOpen, setOpen] = React.useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    setOpen('brand' in location.hash);
  }, [location.hash]);

  return (
    <Drawer
      isEscapeClosable={true}
      isOverlayClosable={true}
      open={isOpen}
      onClose={() => {
        navigate.hash({ brand: false });
        setOpen(false);
      }}
    >
      <Widget />
    </Drawer>
  );
};
