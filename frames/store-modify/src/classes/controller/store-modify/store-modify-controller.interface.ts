import type { StoreProductEntity } from '@library/domain';
import type { ControllerArgs, WithParams, WithPayload } from '@sellgar/app';

import { StoreModifyFrameParams } from '../../params/frame.params.ts';

export interface StoreModifyActionPayload {
  shopUuid: string;
  productUuid: string;
  showing: boolean;
  offers: {
    uuid?: string;
    variantUuid: string;
    article: string;
    currentPrice: {
      value: string;
      currencyCode: string;
    };
    showing: boolean;
  }[];
  expectedVersion?: number;
}

export abstract class StoreModifyControllerInterface {
  abstract loader(args: ControllerArgs<WithParams<StoreModifyFrameParams>>): Promise<StoreProductEntity | undefined>;

  abstract action(
    args: ControllerArgs<WithPayload<StoreModifyActionPayload, WithParams<StoreModifyFrameParams>>>,
  ): Promise<StoreProductEntity>;

  abstract close(): Promise<void>;
}
