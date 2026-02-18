import { Drawer } from '@sellgar/kit';
import { useLocation, useNavigate } from '@library/app';

import React from 'react';

import { Widget } from './widget';

export const BrandDrawer: React.FC = () => {
  const [isOpen, setOpen] = React.useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    setOpen('brand' in location.hashParams.hash);
  }, [location.hashParams.hash]);

  return (
    <Drawer
      isEscapeClosable={true}
      isOverlayClosable={true}
      open={isOpen}
      onClose={() => {
        navigate.hashParams({ brand: void 0 });
      }}
    >
      <Widget />
    </Drawer>
  );
};
