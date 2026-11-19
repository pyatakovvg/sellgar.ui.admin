import { CategoryServiceInterface } from '@library/domain';
import { Controller, Inject, NavigateServiceInterface } from '@sellgar/app';

import { CategoryModifyControllerInterface } from './category-modify-controller.interface.ts';
import { CategoryParentOptionsMapper } from './mapper/category-parent-options.mapper.ts';

@Controller()
export class CategoryModifyController implements CategoryModifyControllerInterface {
  constructor(
    @Inject(CategoryServiceInterface) private readonly categories: CategoryServiceInterface,
    @Inject(NavigateServiceInterface) private readonly navigation: NavigateServiceInterface,
  ) {}

  async loader({ params }: Parameters<CategoryModifyControllerInterface['loader']>[0]) {
    const category = params.uuid ? await this.categories.findByUuid(params.uuid) : null;
    const shopUuid = category?.shopUuid ?? params.shopUuid;
    if (!shopUuid) throw new Error('Не выбран магазин для категории.');
    const tree = await this.categories.getTree(shopUuid);
    return { shopUuid, category, parents: CategoryParentOptionsMapper.map(tree.nodes, category?.uuid) };
  }

  async action({ params, payload }: Parameters<CategoryModifyControllerInterface['action']>[0]) {
    const fields = {
      name: payload.name,
      description: payload.description,
      parentUuid: payload.parentUuid,
    };
    if (params.uuid) {
      if (payload.expectedVersion === undefined) throw new Error('Не передана версия категории.');
      await this.categories.update(params.uuid, {
        ...fields,
        uuid: params.uuid,
        expectedVersion: payload.expectedVersion,
      });
    } else {
      if (!params.shopUuid) throw new Error('Не выбран магазин для категории.');
      await this.categories.create({ ...fields, shopUuid: params.shopUuid });
    }
    await this.navigation.close();
  }

  close() {
    return this.navigation.close();
  }
}
