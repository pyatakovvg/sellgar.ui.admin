import { UseBindings } from '@sellgar/app';
import { Module } from '@sellgar/app/react';

import React from 'react';

import { BrandModifyBindings } from './classes/classes.bindings.ts';
import { Exception } from './components/exception';
import { Fallback } from './components/fallback';
import { MainLayout } from './layout/main';
import { FrameView } from './view/frame.view.tsx';

@UseBindings(BrandModifyBindings)
@Module({
  exception: <Exception />,
  fallback: <Fallback />,
  layouts: [MainLayout],
  view: FrameView,
})
export class BrandModifyFrame {}
