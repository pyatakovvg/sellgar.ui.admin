import { Widget } from '@widget/category-modify';
import { Drawer } from '@sellgar/kit';
import { useLoaderRevalidate, useLocation, useNavigate } from '@library/app';

import React from 'react';

export const Modify = () => {
  const { revalidate } = useLoaderRevalidate();

  const location = useLocation();
  const navigate = useNavigate();

  const [isOpen, setOpen] = React.useState(false);

  const handleCloseModal = () => {
    navigate.hash({ modal: false });
  };

  React.useEffect(() => {
    setOpen('modal' in location.hash);
  }, [location.hash]);

  return (
    <Drawer open={isOpen} onClose={() => handleCloseModal()}>
      <Widget
        uuid={location.hash.modal?.uuid}
        onSuccess={async () => {
          await revalidate();
          handleCloseModal();
        }}
        onCancel={() => {
          handleCloseModal();
        }}
      />
    </Drawer>
  );
};
