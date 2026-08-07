import type { CreateShopInput } from './create-shop.input.ts';

export interface UpdateShopInput extends CreateShopInput {
  uuid: string;
}
