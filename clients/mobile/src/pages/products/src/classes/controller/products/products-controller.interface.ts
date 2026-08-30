import type { ControllerArgs } from '@sellgar/app-v2';

export interface ProductsLoaderData {
  readonly duration: number;
  readonly instance: number;
  readonly loads: number;
  readonly search: string | undefined;
}

export abstract class ProductsControllerInterface {
  abstract loader(args: ControllerArgs): Promise<ProductsLoaderData>;
}
