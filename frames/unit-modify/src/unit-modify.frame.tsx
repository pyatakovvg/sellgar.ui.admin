import { Frame, FrameDefinition, HashFrameSource, UseBindings } from '@tiyn/app';

import React from 'react';

import { UnitModifyBindings } from './classes/classes.di.ts';
import { Exception, Fallback, FrameView } from './view';
import { UnitModifyFrameShell } from './shell.tsx';

export interface UnitModifyFrameParams {
  uuid?: string;
}

@UseBindings(UnitModifyBindings)
@Frame<UnitModifyFrameParams>({
  exception: <Exception />,
  fallback: <Fallback />,
  shell: UnitModifyFrameShell,
  source: HashFrameSource.create<UnitModifyFrameParams>('unit'),
  view: FrameView,
})
export class UnitModifyFrame extends FrameDefinition<UnitModifyFrameParams> {}
