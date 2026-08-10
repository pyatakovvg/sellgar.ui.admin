import { Frame, FrameDefinition, HashFrameSource, UseBindings } from '@sellgar/app';

import React from 'react';

import { StoreModifyBindings } from './classes/classes.bindings.ts';
import { StoreModifyFrameParams } from './classes/params/frame.params.ts';
import { Exception } from './components/exception';
import { Fallback } from './components/fallback';
import { STORE_MODIFY_FRAME_HASH_KEY } from './constants/store-modify.constants.ts';
import { MainLayout } from './layout/main';
import { StoreModifyFrameShell } from './shell';
import { FrameView } from './view/frame.view.tsx';

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
