import { Widget } from '@widget/brand-modify';
import { Drawer } from '@sellgar/kit';
import { useLoaderRevalidate, useLocation, useNavigate } from '@library/app';

import React from 'react';

export const Modify = () => {
  const { revalidate } = useLoaderRevalidate();

  const location = useLocation();
  const navigate = useNavigate();

  const [isOpen, setOpen] = React.useState(false);

  const closeModal = () => {
    navigate.hash({ modal: false });
  };

  React.useEffect(() => {
    setOpen('modal' in location.hash);
  }, [location.hash]);

  return (
    <Drawer open={isOpen} onClose={() => closeModal()}>
      <Widget
        uuid={location.hash.modal?.uuid}
        onSuccess={async () => {
          await revalidate();
          closeModal();
        }}
        onCancel={() => {
          closeModal();
        }}
      />
    </Drawer>
  );
};
