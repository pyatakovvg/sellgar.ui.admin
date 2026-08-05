import { Drawer } from '@sellgar/kit';
import { FrameShell, FrameShellInterface, type FrameShellContextInterface } from '@sellgar/app';

import React from 'react';

@FrameShell()
export class UnitModifyFrameShell implements FrameShellInterface {
  render(context: FrameShellContextInterface): React.ReactNode {
    return (
      <Drawer closeOnEscape={true} closeOnOverlay={true} open={context.open} onClose={() => void context.close()}>
        {context.content}
      </Drawer>
    );
  }
}
