import { Frame, FrameDefinition, HashFrameSource, UseBindings } from '@sellgar/app';

import React from 'react';

import { StoreInventoryBindings } from './classes/classes.bindings.ts';
import { StoreInventoryFrameParams } from './classes/params/frame.params.ts';
import { Exception } from './components/exception';
import { Fallback } from './components/fallback';
import { STORE_INVENTORY_FRAME_HASH_KEY } from './constants/store-inventory.constants.ts';
import { MainLayout } from './layout/main';
import { StoreInventoryFrameShell } from './shell';
import { FrameView } from './view/frame.view.tsx';

@UseBindings(StoreInventoryBindings)
@Frame<StoreInventoryFrameParams>({
  exception: <Exception />,
  fallback: <Fallback />,
  layouts: [MainLayout],
  shell: StoreInventoryFrameShell,
  source: HashFrameSource.create(STORE_INVENTORY_FRAME_HASH_KEY, StoreInventoryFrameParams),
  view: FrameView,
})
export class StoreInventoryFrame extends FrameDefinition<StoreInventoryFrameParams> {}
