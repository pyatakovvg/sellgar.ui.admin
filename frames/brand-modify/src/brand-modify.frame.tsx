import { Frame, FrameDefinition, HashFrameSource, UseBindings } from '@tiyn/app';

import React from 'react';

import { FrameView } from './view';
import { MainLayout } from './layout/main';
import { BrandModifyFrameShell } from './shell';
import { BRAND_MODIFY_FRAME_HASH_KEY } from './constants';

import { BrandModifyFrameParams } from './classes/params';
import { BrandModifyBindings } from './classes/classes.di.ts';

@UseBindings(BrandModifyBindings)
@Frame<BrandModifyFrameParams>({
  layouts: [MainLayout],
  shell: BrandModifyFrameShell,
  source: HashFrameSource.create(BRAND_MODIFY_FRAME_HASH_KEY, BrandModifyFrameParams),
  view: <FrameView />,
})
export class BrandModifyFrame extends FrameDefinition<BrandModifyFrameParams> {}
