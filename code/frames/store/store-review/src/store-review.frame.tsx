import { UseBindings } from '@sellgar/app';
import { Module } from '@sellgar/app/react';
import React from 'react';
import { StoreReviewBindings } from './classes/classes.bindings.ts';
import { MainLayout } from './layout/main';
import { FrameView } from './view/frame.view.tsx';
import { Fallback } from './components/fallback';
import { Exception } from './components/exception';
@UseBindings(StoreReviewBindings)
@Module({ layouts: [MainLayout], view: FrameView, fallback: <Fallback />, exception: <Exception /> })
export class StoreReviewFrame {}
