import { Frame, FrameDefinition, HashFrameSource, UseBindings } from '@sellgar/app';

import React from 'react';

import { UnitModifyBindings } from './classes/classes.bindings.ts';
import { UnitModifyFrameParams } from './classes/params/frame.params.ts';
import { Exception } from './components/exception';
import { Fallback } from './components/fallback';
import { UNIT_MODIFY_FRAME_HASH_KEY } from './constants/unit-modify.constants.ts';
import { MainLayout } from './layout/main';
import { UnitModifyFrameShell } from './shell';
import { FrameView } from './view/frame.view.tsx';

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
