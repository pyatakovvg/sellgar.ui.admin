import { UseBindings } from '@sellgar/app-v2';
import { Frame } from '@sellgar/app-v2/react';

import React from 'react';

import { StoreModifyBindings } from './classes/classes.bindings.ts';
import { Exception } from './components/exception';
import { Fallback } from './components/fallback';
import { MainLayout } from './layout/main';
import { FrameView } from './view/frame.view.tsx';

@UseBindings(StoreModifyBindings)
@Frame({
  exception: <Exception />,
  fallback: <Fallback />,
  layouts: [MainLayout],
  view: FrameView,
})
export class StoreModifyFrame {}
