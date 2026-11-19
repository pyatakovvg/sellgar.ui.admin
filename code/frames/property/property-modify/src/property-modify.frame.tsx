import { UseBindings } from '@sellgar/app';
import { Module } from '@sellgar/app/react';

import { PropertyModifyBindings } from './classes/classes.bindings.ts';
import { MainLayout } from './layout/main';
import { FrameView } from './view/frame.view.tsx';

@UseBindings(PropertyModifyBindings)
@Module({
  layouts: [MainLayout],
  view: FrameView,
})
export class PropertyModifyFrame {}
