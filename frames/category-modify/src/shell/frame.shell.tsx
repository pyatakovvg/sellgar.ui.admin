import { FrameShell, type FrameShellContextInterface, type FrameShellInterface } from '@sellgar/app';
import { Drawer } from '@sellgar/kit';

import React from 'react';

@FrameShell()
export class CategoryModifyFrameShell implements FrameShellInterface {
  render(context: FrameShellContextInterface): React.ReactNode {
    return (
      <Drawer closeOnEscape={true} closeOnOverlay={true} open={context.open} onClose={() => void context.close()}>
        {context.content}
      </Drawer>
    );
  }
}
