import { Frame, FrameDefinition, HashFrameSource, UseBindings } from '@tiyn/app';

import React from 'react';

import { PropertyGroupModifyBindings } from './classes/classes.di.ts';
import { PropertyGroupModifyFrameParams } from './classes/params';
import { PROPERTY_GROUP_MODIFY_FRAME_HASH_KEY } from './constants';
import { MainLayout } from './layout/main';
import { Exception, Fallback, FrameView } from './view';
import { PropertyGroupModifyFrameShell } from './shell.tsx';

@UseBindings(PropertyGroupModifyBindings)
@Frame<PropertyGroupModifyFrameParams>({
  exception: <Exception />,
  fallback: <Fallback />,
  layouts: [MainLayout],
  shell: PropertyGroupModifyFrameShell,
  source: HashFrameSource.create(PROPERTY_GROUP_MODIFY_FRAME_HASH_KEY, PropertyGroupModifyFrameParams),
  view: FrameView,
})
export class PropertyGroupModifyFrame extends FrameDefinition<PropertyGroupModifyFrameParams> {}
