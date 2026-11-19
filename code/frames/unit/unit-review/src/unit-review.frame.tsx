import { UseBindings } from '@sellgar/app';
import { Module } from '@sellgar/app/react';

import { MainLayout } from './layout/main';
import { FrameView } from './view';

import { UnitReviewBindings } from './classes/classes.bindings.ts';

@UseBindings(UnitReviewBindings)
@Module({
  layouts: [MainLayout],
  view: FrameView,
})
export class UnitReviewFrame {}
