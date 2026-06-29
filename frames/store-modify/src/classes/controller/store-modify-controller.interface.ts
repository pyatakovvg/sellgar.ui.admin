import { StoreProductEntity } from '@library/domain';
import { FrameControllerInterface, type FrameControllerActionArgs, type FrameControllerLoaderArgs } from '@tiyn/app';

import { StoreModifyFrameParams } from '../params';

export interface StoreModifyActionPayload {
  article: string;
  shopUuid: string;
  variantUuid: string;
  currentPrice: {
    value: string;
    currencyCode: string;
  };
  showing: boolean;
  offerUuid?: string;
  expectedVersion?: number;
}

export abstract class StoreModifyControllerInterface extends FrameControllerInterface<StoreModifyFrameParams> {
  abstract loader(args: FrameControllerLoaderArgs<StoreModifyFrameParams>): Promise<StoreProductEntity | undefined>;

  abstract action(args: FrameControllerActionArgs<StoreModifyFrameParams, StoreModifyActionPayload>): Promise<StoreProductEntity>;

  abstract toList(): Promise<void>;
}
