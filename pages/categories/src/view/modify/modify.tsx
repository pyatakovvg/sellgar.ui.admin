import { Widget } from '@widget/category-modify';
import { Drawer } from '@sellgar/kit';
import { useLoaderRevalidate, useLocation } from '@library/app';

import React from 'react';

export const Modify = () => {
  const { revalidate } = useLoaderRevalidate();
  const location = useLocation();
  const [isOpen, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen('modal' in location.hash);
  }, [location.hash]);

  return (
    <Drawer open={isOpen} onClose={() => setOpen(false)}>
      <Widget
        uuid={location.hash.modal.uuid}
        onSuccess={async () => {
          await revalidate();
          setOpen(false);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </Drawer>
  );
};
