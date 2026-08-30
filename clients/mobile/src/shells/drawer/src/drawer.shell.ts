import { Shell, ShellInterface } from '@sellgar/app-v2/native';

import { ShellView } from './view/shell.view.tsx';

@Shell({ view: ShellView })
export class DrawerShell extends ShellInterface {}
