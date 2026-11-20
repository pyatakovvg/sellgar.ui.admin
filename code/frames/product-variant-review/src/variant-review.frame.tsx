import { MainLayout } from './layout/main/main.layout.tsx';
import { Module } from '@sellgar/app/react';
import { UseBindings } from '@sellgar/app';
import { ProductChangesProvider } from '@provider/product-changes';
import { VariantReviewBindings } from './classes/classes.bindings.ts';
import { FrameView } from './view/frame.view.tsx';

@UseBindings(VariantReviewBindings)
@Module({ providers: [ProductChangesProvider], layouts: [MainLayout], view: FrameView })
export class VariantReviewFrame {}
