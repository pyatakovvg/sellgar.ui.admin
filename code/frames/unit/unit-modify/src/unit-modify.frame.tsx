import { UseBindings } from '@sellgar/app';
import { Module } from '@sellgar/app/react';

import { UnitModifyBindings } from './classes/classes.bindings.ts';
import { MainLayout } from './layout/main';
import { FrameView } from './view/frame.view.tsx';

@UseBindings(UnitModifyBindings)
@Module({
  layouts: [MainLayout],
  view: FrameView,
})
export class UnitModifyFrame {}
