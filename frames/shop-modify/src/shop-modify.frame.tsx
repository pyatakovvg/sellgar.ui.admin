import { Frame, FrameDefinition, HashFrameSource, UseBindings } from '@sellgar/app';

import React from 'react';

import { ShopModifyBindings } from './classes/classes.bindings.ts';
import { ShopModifyFrameParams } from './classes/params/frame.params.ts';
import { Exception } from './components/exception';
import { Fallback } from './components/fallback';
import { SHOP_MODIFY_FRAME_HASH_KEY } from './constants/shop-modify.constants.ts';
import { MainLayout } from './layout/main';
import { ShopModifyFrameShell } from './shell';
import { FrameView } from './view/frame.view.tsx';

@UseBindings(ShopModifyBindings)
@Frame<ShopModifyFrameParams>({
  exception: <Exception />,
  fallback: <Fallback />,
  layouts: [MainLayout],
  shell: ShopModifyFrameShell,
  source: HashFrameSource.create(SHOP_MODIFY_FRAME_HASH_KEY, ShopModifyFrameParams),
  view: FrameView,
})
export class ShopModifyFrame extends FrameDefinition<ShopModifyFrameParams> {}
