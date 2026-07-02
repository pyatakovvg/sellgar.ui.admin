import { BrandServiceInterface, CategoryServiceInterface, PropertyServiceInterface } from '@library/domain';
import { Controller, type ControllerLoaderArgs, Inject } from '@tiyn/app';

import {
  ProductFormOptionsControllerInterface,
  type ProductFormOptionsData,
} from './product-form-options-controller.interface.ts';

@Controller()
export class ProductFormOptionsController implements ProductFormOptionsControllerInterface {
  constructor(
    @Inject(BrandServiceInterface) private readonly brandService: BrandServiceInterface,
    @Inject(CategoryServiceInterface) private readonly categoryService: CategoryServiceInterface,
    @Inject(PropertyServiceInterface) private readonly propertyService: PropertyServiceInterface,
  ) {}

  async loader(_args: ControllerLoaderArgs): Promise<ProductFormOptionsData> {
    const [brands, categories, properties] = await Promise.all([
      this.brandService.findAll(),
      this.categoryService.findAll(),
      this.propertyService.findAll(),
    ]);

    return {
      brands: brands.data,
      categories: categories.data,
      properties: properties.data,
    };
  }
}
