import React from 'react';

import { Provider } from './modify.context.ts';

export const ModifyProvider: React.FC<React.PropsWithChildren> = (props) => {
  const [isOpen, setOpen] = React.useState(false);
  const [uuid, setUuid] = React.useState<string | undefined>(undefined);

  return (
    <Provider
      value={{
        uuid,
        isOpen,
        onOpen: (uuid) => {
          setOpen(true);
          setUuid(uuid);
        },
        onClose: () => {
          setOpen(false);
          setUuid(undefined);
        },
      }}
    >
      {props.children}
    </Provider>
  );
};
