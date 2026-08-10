import { Frame, FrameDefinition, HashFrameSource, UseBindings } from '@sellgar/app';

import React from 'react';

import { BrandModifyBindings } from './classes/classes.bindings.ts';
import { BrandModifyFrameParams } from './classes/params/frame.params.ts';
import { Exception } from './components/exception';
import { Fallback } from './components/fallback';
import { BRAND_MODIFY_FRAME_HASH_KEY } from './constants/brand-modify.constants.ts';
import { MainLayout } from './layout/main';
import { BrandModifyFrameShell } from './shell';
import { FrameView } from './view/frame.view.tsx';

@UseBindings(BrandModifyBindings)
@Frame<BrandModifyFrameParams>({
  exception: <Exception />,
  fallback: <Fallback />,
  layouts: [MainLayout],
  shell: BrandModifyFrameShell,
  source: HashFrameSource.create(BRAND_MODIFY_FRAME_HASH_KEY, BrandModifyFrameParams),
  view: FrameView,
})
export class BrandModifyFrame extends FrameDefinition<BrandModifyFrameParams> {}
