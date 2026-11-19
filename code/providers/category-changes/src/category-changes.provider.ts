import { CategoryServiceInterface, CategoryTreeEntity } from '@library/domain';
import { SocketIOBindings } from '@library/socket-io';
import { Inject, Provider, type ProviderInterface, type ProviderResult, updateEntity, UseBindings } from '@sellgar/app';

import { CategoryChangesBindings } from './classes/classes.bindings.ts';
import { CategoryChangesHubInterface } from './classes/hub/category-changes-hub.interface.ts';

@UseBindings(SocketIOBindings, CategoryChangesBindings)
@Provider({ lifetime: 'application' })
export class CategoryChangesProvider implements ProviderInterface {
  constructor(
    @Inject(CategoryChangesHubInterface) private readonly hub: CategoryChangesHubInterface,
    @Inject(CategoryServiceInterface) private readonly categories: CategoryServiceInterface,
  ) {}

  activate(): ProviderResult {
    return this.hub.subscribe({
      changed: async (category) => {
        const tree = await this.categories.getTree(category.shopUuid);
        updateEntity(CategoryTreeEntity, tree);
      },
    });
  }

  dispose(): void {}
}
