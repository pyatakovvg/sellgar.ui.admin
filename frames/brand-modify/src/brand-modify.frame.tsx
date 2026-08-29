import { UseBindings } from '@sellgar/app-v2';
import { Frame } from '@sellgar/app-v2/react';

import React from 'react';

import { BrandModifyBindings } from './classes/classes.bindings.ts';
import { Exception } from './components/exception';
import { Fallback } from './components/fallback';
import { MainLayout } from './layout/main';
import { FrameView } from './view/frame.view.tsx';

@UseBindings(BrandModifyBindings)
@Frame({
  exception: <Exception />,
  fallback: <Fallback />,
  layouts: [MainLayout],
  view: FrameView,
})
export class BrandModifyFrame {}
