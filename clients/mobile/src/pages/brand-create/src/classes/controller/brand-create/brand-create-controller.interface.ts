import type { ControllerArgs } from '@sellgar/app-v2';

export interface BrandCreateLoaderData {
  readonly duration: number;
}

export abstract class BrandCreateControllerInterface {
  abstract loader(args: ControllerArgs): Promise<BrandCreateLoaderData>;
}
