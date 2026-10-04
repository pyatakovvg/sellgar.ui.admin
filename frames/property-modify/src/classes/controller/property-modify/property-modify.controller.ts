import { PropertyServiceInterface } from '@library/domain';
import { Controller, Inject, RevalidateServiceInterface } from '@sellgar/app';
import { NavigateServiceInterface } from '@sellgar/app';

import { PropertyModifyControllerInterface } from './property-modify-controller.interface.ts';

@Controller()
export class PropertyModifyController implements PropertyModifyControllerInterface {
  constructor(
    @Inject(PropertyServiceInterface) private readonly propertyService: PropertyServiceInterface,
    @Inject(NavigateServiceInterface) private readonly navigateService: NavigateServiceInterface,
    @Inject(RevalidateServiceInterface) private readonly revalidateService: RevalidateServiceInterface,
  ) {}

  async loader(args: Parameters<PropertyModifyControllerInterface['loader']>[0]) {
    if (!args.params.code) {
      return void 0;
    }

    return this.propertyService.findByCode(args.params.code);
  }

  async action(args: Parameters<PropertyModifyControllerInterface['action']>[0]) {
    if (!args.params.code) {
      await this.propertyService.create({
        code: args.payload.code,
        name: args.payload.name,
        description: args.payload.description,
        kind: args.payload.kind,
        unitCode: args.payload.unitCode,
        options: args.payload.options.map(({ persisted: _persisted, ...option }) => option),
      });
    } else {
      if (args.payload.version === undefined) {
        throw new Error('Не передана версия свойства.');
      }

      let property = await this.propertyService.update(args.params.code, {
        version: args.payload.version,
        name: args.payload.name,
        description: args.payload.description,
      });

      for (const option of args.payload.options) {
        if (option.persisted) {
          property = await this.propertyService.updateOption(args.params.code, option.code, {
            version: property.version,
            name: option.name,
            sortOrder: option.sortOrder,
            extras: option.extras,
          });
        } else {
          const { persisted: _persisted, ...input } = option;
          property = await this.propertyService.createOption(args.params.code, property.version, input);
        }
      }
    }

    await this.revalidateService.revalidate();
    await this.navigateService.close();
  }

  async close() {
    await this.navigateService.close();
  }
}
