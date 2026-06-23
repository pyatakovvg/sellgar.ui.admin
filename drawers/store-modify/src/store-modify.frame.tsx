import { Frame, FrameDefinition, HashFrameSource, UseBindings } from '@tiyn/app';

import React from 'react';

import { StoreModifyBindings } from './widget/classes/classes.di.ts';
import { Exception } from './widget/view';
import { Fallback } from './widget/view';
import { ModifyView } from './widget/view';
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
