import { UseBindings } from '@sellgar/app';
import { Module } from '@sellgar/app/react';

import { MainLayout } from './layout/main';
import { FrameView } from './view';

import { PropertyReviewBindings } from './classes/classes.bindings.ts';

@UseBindings(PropertyReviewBindings)
@Module({
  layouts: [MainLayout],
  view: FrameView,
})
export class PropertyReviewFrame {}
