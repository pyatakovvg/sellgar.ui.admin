import { Frame, FrameDefinition, HashFrameSource, UseBindings } from '@sellgar/app';

import React from 'react';

import { CategoryModifyBindings } from './classes/classes.bindings.ts';
import { CategoryModifyFrameParams } from './classes/params/frame.params.ts';
import { Exception } from './components/exception';
import { Fallback } from './components/fallback';
import { CATEGORY_MODIFY_FRAME_HASH_KEY } from './constants/category-modify.constants.ts';
import { MainLayout } from './layout/main';
import { CategoryModifyFrameShell } from './shell';
import { FrameView } from './view/frame.view.tsx';

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
