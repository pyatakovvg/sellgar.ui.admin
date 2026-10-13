import { PropertyEntity, PropertyServiceInterface } from '@library/domain';
import { PropertyReviewRoute } from '@library/route-tokens';

import {
  Controller,
  Inject,
  insertEntity,
  NavigateServiceInterface,
  NavigationBlockerServiceInterface,
} from '@sellgar/app';

import { PropertyModifyControllerInterface } from './property-modify-controller.interface.ts';
import type { PropertySaveInput } from '../../service/property-save/input/property-save.input.ts';
import { PropertySaveServiceInterface } from '../../service/property-save/property-save-service.interface.ts';

@Controller()
export class PropertyModifyController implements PropertyModifyControllerInterface {
  constructor(
    @Inject(PropertyServiceInterface) private readonly propertyService: PropertyServiceInterface,
    @Inject(NavigateServiceInterface) private readonly navigateService: NavigateServiceInterface,
    @Inject(PropertySaveServiceInterface) private readonly propertySaveService: PropertySaveServiceInterface,
    @Inject(NavigationBlockerServiceInterface) private readonly navigationBlocker: NavigationBlockerServiceInterface,
  ) {}

  async loader(args: Parameters<PropertyModifyControllerInterface['loader']>[0]) {
    if (!args.params.code) {
      return void 0;
    }

    return this.propertyService.findByCode(args.params.code);
  }

  action(args: Parameters<PropertyModifyControllerInterface['action']>[0]): Promise<void> {
    if (args.params.code) {
      return this.update(args.params.code, args.payload);
    }
    return this.create(args.payload);
  }

  async close(code?: string) {
    if (code) {
      return this.navigateService.to(PropertyReviewRoute, { params: { code }, revalidate: false });
    }
    await this.navigateService.close();
  }

  private async create(input: PropertySaveInput): Promise<void> {
    const property = await this.propertySaveService.create(input);
    insertEntity(PropertyEntity, property);

    await this.navigationBlocker.allow(() =>
      this.navigateService.to(PropertyReviewRoute, { params: { code: property.code }, revalidate: false }),
    );
  }

  private async update(code: string, input: PropertySaveInput): Promise<void> {
    const property = await this.propertySaveService.update(code, input);

    await this.navigationBlocker.allow(() =>
      this.navigateService.to(PropertyReviewRoute, { params: { code: property.code }, revalidate: false }),
    );
  }
}
