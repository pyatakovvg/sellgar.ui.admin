import { UseBindings } from '@sellgar/app';
import { Module } from '@sellgar/app/react';

import { MainLayout } from './layout/main';

import { FrameView } from './view/frame.view.tsx';

import { BrandModifyBindings } from './classes/classes.bindings.ts';

@UseBindings(BrandModifyBindings)
@Module({
  layouts: [MainLayout],
  view: FrameView,
})
export class BrandModifyFrame {}
