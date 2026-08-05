import { Drawer } from '@sellgar/kit';
import { FrameShell, FrameShellInterface } from '@sellgar/app';
import type { FrameShellContextInterface } from '@sellgar/app';

import React from 'react';

@FrameShell()
export class StoreModifyFrameShell implements FrameShellInterface {
  render(context: FrameShellContextInterface): React.ReactNode {
    return (
      <Drawer closeOnEscape={true} closeOnOverlay={true} open={context.open} onClose={() => context.close()}>
        {context.content}
      </Drawer>
    );
  }
}
