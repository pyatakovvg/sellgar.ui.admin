import { Frame, FrameDefinition, HashFrameSource, UseBindings } from '@tiyn/app';

import React from 'react';

import { PropertyModifyBindings } from './classes/classes.di.ts';
import { Exception, Fallback, FrameView } from './view';
import { PropertyModifyFrameShell } from './shell.tsx';

export interface PropertyModifyFrameParams {
  uuid?: string;
}

@UseBindings(PropertyModifyBindings)
@Frame<PropertyModifyFrameParams>({
  exception: <Exception />,
  fallback: <Fallback />,
  shell: PropertyModifyFrameShell,
  source: HashFrameSource.create<PropertyModifyFrameParams>('property'),
  view: FrameView,
})
export class PropertyModifyFrame extends FrameDefinition<PropertyModifyFrameParams> {}
