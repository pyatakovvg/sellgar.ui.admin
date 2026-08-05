import { Frame, FrameDefinition, HashFrameSource, UseBindings } from '@sellgar/app';

import React from 'react';

import { StoreInventoryBindings } from './classes/classes.di.ts';
import { StoreInventoryFrameParams } from './classes/params';
import { STORE_INVENTORY_FRAME_HASH_KEY } from './constants';
import { MainLayout } from './layout/main';
import { StoreInventoryFrameShell } from './shell';
import { Exception, Fallback, FrameView } from './view';

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
