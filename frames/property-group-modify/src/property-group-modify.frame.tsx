import { Frame, FrameDefinition, HashFrameSource, UseBindings } from '@tiyn/app';

import React from 'react';

import { PropertyGroupModifyBindings } from './classes/classes.di.ts';
import { Exception, Fallback, FrameView } from './view';
import { PropertyGroupModifyFrameShell } from './shell.tsx';

export interface PropertyGroupModifyFrameParams {
  uuid?: string;
}

@UseBindings(PropertyGroupModifyBindings)
@Frame<PropertyGroupModifyFrameParams>({
  exception: <Exception />,
  fallback: <Fallback />,
  shell: PropertyGroupModifyFrameShell,
  source: HashFrameSource.create<PropertyGroupModifyFrameParams>('property-group'),
  view: FrameView,
})
export class PropertyGroupModifyFrame extends FrameDefinition<PropertyGroupModifyFrameParams> {}
