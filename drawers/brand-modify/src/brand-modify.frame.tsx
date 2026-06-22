import { Frame, FrameDefinition, HashFrameSource, UseBindings } from '@tiyn/app';

import React from 'react';

import { BrandModifyBindings } from './widget/classes/classes.di.ts';
import { Exception } from './widget/view/exception';
import { Fallback } from './widget/view/fallback';
import { Modify } from './widget/view/modify';
import { BrandModifyFrameShell } from './shell';

export interface BrandModifyFrameParams {
  uuid?: string;
}

@UseBindings(BrandModifyBindings)
@Frame<BrandModifyFrameParams>({
  exception: <Exception />,
  fallback: <Fallback />,
  shell: BrandModifyFrameShell,
  source: HashFrameSource.create<BrandModifyFrameParams>('brand'),
  view: Modify,
})
export class BrandModifyFrame extends FrameDefinition<BrandModifyFrameParams> {}
