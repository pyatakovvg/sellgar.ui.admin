import { ProductTypeServiceInterface, PropertyServiceInterface } from '@library/domain';
import { TemplateModifyRoute } from '@library/route-tokens';
import { Controller, Inject, NavigateServiceInterface, RevalidateServiceInterface } from '@sellgar/app';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { TemplateModifyResultEntity } from './domain/template-modify-result.entity.ts';
import { TemplateFormMapper } from './mapper/template-form.mapper.ts';
import { TemplateModifyControllerInterface } from './template-modify-controller.interface.ts';

@Controller()
export class TemplateModifyController implements TemplateModifyControllerInterface {
  constructor(
    @Inject(ProductTypeServiceInterface) private readonly productTypeService: ProductTypeServiceInterface,
    @Inject(PropertyServiceInterface) private readonly propertyService: PropertyServiceInterface,
    @Inject(NavigateServiceInterface) private readonly navigateService: NavigateServiceInterface,
    @Inject(RevalidateServiceInterface) private readonly revalidateService: RevalidateServiceInterface,
  ) {}

  async loader(args: Parameters<TemplateModifyControllerInterface['loader']>[0]): Promise<TemplateModifyResultEntity> {
    const uuid = args.params.uuid;
    const [template, properties] = await Promise.all([
      uuid ? this.productTypeService.findByUuid(uuid) : Promise.resolve(undefined),
      this.propertyService.findAll(),
    ]);
    const result = plainToInstance(TemplateModifyResultEntity, { template, properties });
    await validateOrReject(result);
    return result;
  }

  async action(args: Parameters<TemplateModifyControllerInterface['action']>[0]) {
    const { uuid, version } = args.payload;

    if (uuid && version !== undefined) {
      const result = await this.productTypeService.update(
        uuid,
        TemplateFormMapper.toUpdateInput(args.payload, version),
      );
      await this.revalidateService.revalidate(TemplateModifyControllerInterface);
      return result;
    }

    const result = await this.productTypeService.create(TemplateFormMapper.toCreateInput(args.payload));
    await this.navigateService.to(TemplateModifyRoute, { params: { uuid: result.uuid } });
    return result;
  }
}
