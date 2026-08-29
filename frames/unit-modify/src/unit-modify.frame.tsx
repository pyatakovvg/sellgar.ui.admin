import { UseBindings } from '@sellgar/app-v2';
import { Module } from '@sellgar/app-v2/react';

import React from 'react';

import { UnitModifyBindings } from './classes/classes.bindings.ts';
import { Exception } from './components/exception';
import { Fallback } from './components/fallback';
import { MainLayout } from './layout/main';
import { FrameView } from './view/frame.view.tsx';

@UseBindings(UnitModifyBindings)
@Module({
  exception: <Exception />,
  fallback: <Fallback />,
  layouts: [MainLayout],
  view: FrameView,
})
export class UnitModifyFrame {}
