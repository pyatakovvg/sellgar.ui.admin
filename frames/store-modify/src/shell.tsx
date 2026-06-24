import { Drawer } from '@sellgar/kit';
import { FrameShell, FrameShellInterface, type FrameShellContextInterface } from '@tiyn/app';

import React from 'react';

@FrameShell()
export class StoreModifyFrameShell implements FrameShellInterface {
  render(context: FrameShellContextInterface): React.ReactNode {
    return (
      <Drawer
        closeOnEscape={true}
        closeOnOverlay={true}
        open={context.open}
        onClose={() => {
          void context.close();
        }}
      >
        {context.content}
      </Drawer>
    );
  }
}
