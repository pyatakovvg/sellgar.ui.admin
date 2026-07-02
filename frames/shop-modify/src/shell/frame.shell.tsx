import { Drawer } from '@sellgar/kit';
import { FrameShell, FrameShellInterface } from '@tiyn/app';
import type { FrameShellContextInterface } from '@tiyn/app';

import React from 'react';

@FrameShell()
export class ShopModifyFrameShell implements FrameShellInterface {
  render(context: FrameShellContextInterface): React.ReactNode {
    return (
      <Drawer closeOnEscape={true} closeOnOverlay={true} open={context.open} onClose={() => context.close()}>
        {context.content}
      </Drawer>
    );
  }
}
