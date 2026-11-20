import { Module } from '@sellgar/app/react';
import { UseBindings } from '@sellgar/app';
import { ProductChangesProvider } from '@provider/product-changes';
import { VariantModifyBindings } from './classes/classes.bindings.ts';
import { FrameView } from './view/frame.view.tsx';

@UseBindings(VariantModifyBindings)
@Module({ providers: [ProductChangesProvider], view: FrameView })
export class VariantModifyFrame {}
