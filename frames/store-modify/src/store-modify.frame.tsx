import { Frame, FrameDefinition, HashFrameSource, UseBindings } from '@tiyn/app';

import React from 'react';

import { StoreModifyBindings } from './classes/classes.di.ts';
import { Exception } from './view';
import { Fallback } from './view';
import { ModifyView } from './view';
import { StoreModifyFrameShell } from './shell';

export interface StoreModifyFrameParams {
  uuid?: string;
}

@UseBindings(StoreModifyBindings)
@Frame<StoreModifyFrameParams>({
  exception: <Exception />,
  fallback: <Fallback />,
  shell: StoreModifyFrameShell,
  source: HashFrameSource.create<StoreModifyFrameParams>('store'),
  view: ModifyView,
})
export class StoreModifyFrame extends FrameDefinition<StoreModifyFrameParams> {}
