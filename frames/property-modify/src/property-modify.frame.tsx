import { Frame, FrameDefinition, HashFrameSource, UseBindings } from '@sellgar/app';

import React from 'react';

import { PropertyModifyBindings } from './classes/classes.bindings.ts';
import { PropertyModifyFrameParams } from './classes/params/frame.params.ts';
import { Exception } from './components/exception';
import { Fallback } from './components/fallback';
import { PROPERTY_MODIFY_FRAME_HASH_KEY } from './constants/property-modify.constants.ts';
import { MainLayout } from './layout/main';
import { PropertyModifyFrameShell } from './shell';
import { FrameView } from './view/frame.view.tsx';

@UseBindings(PropertyModifyBindings)
@Frame<PropertyModifyFrameParams>({
  exception: <Exception />,
  fallback: <Fallback />,
  layouts: [MainLayout],
  shell: PropertyModifyFrameShell,
  source: HashFrameSource.create(PROPERTY_MODIFY_FRAME_HASH_KEY, PropertyModifyFrameParams),
  view: FrameView,
})
export class PropertyModifyFrame extends FrameDefinition<PropertyModifyFrameParams> {}
