import { Frame, FrameDefinition, HashFrameSource, UseBindings } from '@tiyn/app';

import React from 'react';

import { UnitModifyBindings } from './classes/classes.di.ts';
import { UnitModifyFrameParams } from './classes/params';
import { UNIT_MODIFY_FRAME_HASH_KEY } from './constants';
import { MainLayout } from './layout/main';
import { Exception, Fallback, FrameView } from './view';
import { UnitModifyFrameShell } from './shell.tsx';

@UseBindings(UnitModifyBindings)
@Frame<UnitModifyFrameParams>({
  exception: <Exception />,
  fallback: <Fallback />,
  layouts: [MainLayout],
  shell: UnitModifyFrameShell,
  source: HashFrameSource.create(UNIT_MODIFY_FRAME_HASH_KEY, UnitModifyFrameParams),
  view: FrameView,
})
export class UnitModifyFrame extends FrameDefinition<UnitModifyFrameParams> {}
