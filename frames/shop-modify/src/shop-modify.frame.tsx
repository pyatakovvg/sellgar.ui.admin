import { Frame, FrameDefinition, HashFrameSource, UseBindings } from '@sellgar/app';

import React from 'react';

import { FrameView } from './view';
import { MainLayout } from './layout/main';
import { ShopModifyFrameShell } from './shell';
import { SHOP_MODIFY_FRAME_HASH_KEY } from './constants';

import { ShopModifyFrameParams } from './classes/params';
import { ShopModifyBindings } from './classes/classes.di.ts';

@UseBindings(ShopModifyBindings)
@Frame<ShopModifyFrameParams>({
  layouts: [MainLayout],
  shell: ShopModifyFrameShell,
  source: HashFrameSource.create(SHOP_MODIFY_FRAME_HASH_KEY, ShopModifyFrameParams),
  view: <FrameView />,
})
export class ShopModifyFrame extends FrameDefinition<ShopModifyFrameParams> {}
