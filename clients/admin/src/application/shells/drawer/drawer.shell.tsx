import { Drawer } from '@sellgar/kit';
import { Shell, ShellInterface } from '@sellgar/app-v2/react';
import type { ShellContextInterface } from '@sellgar/app-v2/react';

import React from 'react';

@Shell()
export class DrawerShell implements ShellInterface {
  render(context: ShellContextInterface): React.ReactNode {
    return (
      <Drawer closeOnEscape={true} closeOnOverlay={true} open={context.open} onClose={() => void context.close()}>
        {context.content}
      </Drawer>
    );
  }
}
