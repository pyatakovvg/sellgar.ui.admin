import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { ProductFormOptionsController } from './controller/product-form-options.controller.ts';
import { ProductFormOptionsControllerInterface } from './controller/product-form-options-controller.interface.ts';
import { ProductController } from './controller/product.controller.ts';
import { ProductControllerInterface } from './controller/product-controller.interface.ts';
import { ProductImageServiceInterface } from './product-image/product-image-service.interface.ts';
import { ProductImageService } from './product-image/product-image.service.ts';

export class ProductModifyBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(ProductControllerInterface).to(ProductController);
    registry.bind(ProductFormOptionsControllerInterface).to(ProductFormOptionsController);
    registry.bind(ProductImageServiceInterface).to(ProductImageService);
  }
}
