import { Frame, FrameDefinition, HashFrameSource, UseBindings } from '@tiyn/app';

import React from 'react';

import { CategoryModifyBindings } from './classes/classes.di.ts';
import { Exception, Fallback, FrameView } from './view';
import { CategoryModifyFrameShell } from './shell.tsx';

export interface CategoryModifyFrameParams {
  uuid?: string;
}

@UseBindings(CategoryModifyBindings)
@Frame<CategoryModifyFrameParams>({
  exception: <Exception />,
  fallback: <Fallback />,
  shell: CategoryModifyFrameShell,
  source: HashFrameSource.create<CategoryModifyFrameParams>('category'),
  view: FrameView,
})
export class CategoryModifyFrame extends FrameDefinition<CategoryModifyFrameParams> {}
