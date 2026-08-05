import { Frame, FrameDefinition, HashFrameSource, UseBindings } from '@sellgar/app';

import React from 'react';

import { CategoryModifyBindings } from './classes/classes.di.ts';
import { CategoryModifyFrameParams } from './classes/params';
import { Exception, Fallback, FrameView } from './view';
import { CategoryModifyFrameShell } from './shell';
import { CATEGORY_MODIFY_FRAME_HASH_KEY } from './constants';
import { MainLayout } from './layout/main';

@UseBindings(CategoryModifyBindings)
@Frame<CategoryModifyFrameParams>({
  exception: <Exception />,
  fallback: <Fallback />,
  layouts: [MainLayout],
  shell: CategoryModifyFrameShell,
  source: HashFrameSource.create(CATEGORY_MODIFY_FRAME_HASH_KEY, CategoryModifyFrameParams),
  view: FrameView,
})
export class CategoryModifyFrame extends FrameDefinition<CategoryModifyFrameParams> {}
