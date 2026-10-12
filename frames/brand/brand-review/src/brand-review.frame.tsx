import { UseBindings } from '@sellgar/app';
import { Module } from '@sellgar/app/react';

import { MainLayout } from './layout/main';
import { FrameView } from './view';

import { BrandReviewBindings } from './classes/classes.bindings.ts';

@UseBindings(BrandReviewBindings)
@Module({
  layouts: [MainLayout],
  view: FrameView,
})
export class BrandReviewFrame {}
