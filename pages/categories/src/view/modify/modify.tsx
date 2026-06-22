import { Widget } from '@widget/category-modify';
import { Drawer } from '@sellgar/kit';
import { useRevalidate, useLocation, useNavigate } from '@tiyn/app';

import React from 'react';

export const Modify = () => {
  const revalidate = useRevalidate();

  const location = useLocation();
  const navigate = useNavigate();

  const [isOpen, setOpen] = React.useState(false);

  const handleCloseModal = () => {
    void navigate.hashParams({ modal: void 0 }, { merge: true });
  };

  React.useEffect(() => {
    setOpen('modal' in location.hashParams);
  }, [location.hashParams]);

  return (
    <Drawer open={isOpen} onClose={() => handleCloseModal()}>
      <Widget
        uuid={(location.hashParams.modal as { uuid?: string } | undefined)?.uuid}
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
