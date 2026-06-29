import { Frame, FrameDefinition, HashFrameSource, UseBindings } from '@tiyn/app';

import React from 'react';

import { BrandModifyBindings } from './classes/classes.di.ts';
import { BrandModifyFrameParams } from './classes/params';
import { Exception } from './view';
import { Fallback } from './view';
import { FrameView } from './view';
import { BrandModifyFrameShell } from './shell';
import { BRAND_MODIFY_FRAME_HASH_KEY } from './constants';
import { MainLayout } from './layout/main';

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
