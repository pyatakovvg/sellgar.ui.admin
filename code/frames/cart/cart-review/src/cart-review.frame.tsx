import React from 'react';

import { UseBindings } from '@sellgar/app';
import { Module } from '@sellgar/app/react';

import { CartReviewBindings } from './classes/classes.bindings.ts';
import { Exception } from './view/exception';
import { Fallback } from './view/fallback';
import { MainLayout } from './layout/main';
import { FrameView } from './view/frame.view.tsx';

@UseBindings(CartReviewBindings)
@Module({ layouts: [MainLayout], view: FrameView, fallback: <Fallback />, exception: <Exception /> })
export class CartReviewFrame {}
