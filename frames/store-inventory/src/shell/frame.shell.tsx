import { FrameShell, type FrameShellContextInterface, type FrameShellInterface } from '@sellgar/app';
import { Modal } from '@sellgar/kit';

import React from 'react';

@FrameShell()
export class StoreInventoryFrameShell implements FrameShellInterface {
  render(context: FrameShellContextInterface): React.ReactNode {
    return (
      <Modal open={context.open} onClose={() => void context.close()}>
        {context.content}
      </Modal>
    );
  }
}
