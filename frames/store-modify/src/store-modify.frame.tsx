import { Frame, FrameDefinition, HashFrameSource, UseBindings } from '@tiyn/app';

import React from 'react';

import { StoreModifyBindings } from './classes/classes.di.ts';
import { StoreModifyFrameParams } from './classes/params';
import { STORE_MODIFY_FRAME_HASH_KEY } from './constants';
import { MainLayout } from './layout/main';
import { Exception, Fallback, FrameView } from './view';
import { StoreModifyFrameShell } from './shell';

@UseBindings(StoreModifyBindings)
@Frame<StoreModifyFrameParams>({
  exception: <Exception />,
  fallback: <Fallback />,
  layouts: [MainLayout],
  shell: StoreModifyFrameShell,
  source: HashFrameSource.create(STORE_MODIFY_FRAME_HASH_KEY, StoreModifyFrameParams),
  view: FrameView,
})
export class StoreModifyFrame extends FrameDefinition<StoreModifyFrameParams> {}
