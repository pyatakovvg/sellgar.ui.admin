import { Drawer } from '@sellgar/kit';
import { useLoadContainerModule, useNavigate, useLocation } from '@library/app';

import React from 'react';

import { Provider } from './drawer.context.tsx';
import { containerModule } from './classes/classes.di.ts';

import { BrandModifyControllerInterface } from './classes/controller/brand-modify-controller.interface.ts';

interface IProps {
  onSuccess(): void;
  onCancel(): void;
}

export const DrawerProvider: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  const container = useLoadContainerModule(containerModule);

  const location = useLocation();
  const navigate = useNavigate();

  const [isOpen, setOpen] = React.useState(false);

  const closeModal = () => {
    navigate.hash({ brand: false });
  };

  React.useEffect(() => {
    setOpen('brand' in location.hash);
  }, [location.hash]);

  return (
    <Drawer isEscapeClosable={true} isOverlayClosable={true} open={isOpen} onClose={() => closeModal()}>
      <Provider
        value={{
          uuid: location.hash.terminal?.uuid,
          controller: container.get(BrandModifyControllerInterface),
          onSuccess: props.onSuccess,
          onCancel: props.onCancel,
        }}
      >
        {props.children}
      </Provider>
    </Drawer>
  );
};
