import { ProductEntity, ProductSummaryEntity, ProductVariantDetailEntity } from '@library/domain';
import { SocketIOBindings } from '@library/socket-io';
import { plainToInstance } from 'class-transformer';
import {
  Inject,
  insertEntity,
  Provider,
  type ProviderInterface,
  type ProviderResult,
  updateEntity,
  UseBindings,
} from '@sellgar/app';

import { ProductChangesBindings } from './classes/classes.bindings.ts';
import { ProductChangesHubInterface } from './classes/hub/product-changes-hub.interface.ts';

@UseBindings(SocketIOBindings, ProductChangesBindings)
@Provider({ lifetime: 'application' })
export class ProductChangesProvider implements ProviderInterface {
  constructor(
    @Inject(ProductChangesHubInterface)
    private readonly hub: ProductChangesHubInterface,
  ) {}

  activate(): ProviderResult {
    return this.hub.subscribe({
      created: async (payload) => {
        insertEntity(
          ProductSummaryEntity,
          plainToInstance(ProductSummaryEntity, payload, { excludeExtraneousValues: true }),
          { position: 'start' },
        );
      },
      updated: async (payload) => {
        updateEntity(ProductEntity, payload);
        for (const variant of payload.variants ?? []) {
          updateEntity(ProductVariantDetailEntity, {
            ...variant,
            productUuid: payload.uuid,
            version: payload.version,
            typeUuid: payload.typeUuid,
            typeVersion: payload.typeVersion,
          });
        }
        updateEntity(
          ProductSummaryEntity,
          plainToInstance(ProductSummaryEntity, payload, { excludeExtraneousValues: true }),
        );
      },
    });
  }

  dispose(): void {}
}
