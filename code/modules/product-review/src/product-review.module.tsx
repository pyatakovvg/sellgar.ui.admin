import { Module } from '@sellgar/app/react';
import { UseBindings } from '@sellgar/app';
import { ProductChangesProvider } from '@provider/product-changes';

import { ProductReviewBindings } from './classes/classes.bindings.ts';
import { ModuleView } from './view/module.view.tsx';

@UseBindings(ProductReviewBindings)
@Module({ providers: [ProductChangesProvider], view: ModuleView })
export class ProductReviewModule {}
