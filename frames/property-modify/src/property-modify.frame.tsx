import { Frame, FrameDefinition, HashFrameSource, UseBindings } from '@tiyn/app';

import React from 'react';

import { PropertyModifyBindings } from './classes/classes.di.ts';
import { PropertyModifyFrameParams } from './classes/params';
import { PROPERTY_MODIFY_FRAME_HASH_KEY } from './constants';
import { MainLayout } from './layout/main';
import { Exception, Fallback, FrameView } from './view';
import { PropertyModifyFrameShell } from './shell.tsx';

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
