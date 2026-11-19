import { UnitEntity, UnitServiceInterface } from '@library/domain';
import { UnitReviewRoute } from '@library/route-tokens';

import {
  Controller,
  Inject,
  insertEntity,
  NavigateServiceInterface,
  NavigationBlockerServiceInterface,
  updateEntity,
} from '@sellgar/app';

import { UnitModifyControllerInterface } from './unit-modify-controller.interface.ts';
import type { UnitModifyInput } from './input/unit-modify.input.ts';
import { UnitModifyMapper } from './mapper/unit-modify.mapper.ts';

@Controller()
export class UnitModifyController implements UnitModifyControllerInterface {
  constructor(
    @Inject(UnitServiceInterface) private readonly unitService: UnitServiceInterface,
    @Inject(NavigateServiceInterface) private readonly navigateService: NavigateServiceInterface,
    @Inject(NavigationBlockerServiceInterface) private readonly navigationBlocker: NavigationBlockerServiceInterface,
  ) {}

  async loader(args: Parameters<UnitModifyControllerInterface['loader']>[0]) {
    if (!args.params.code) {
      return void 0;
    }

    return this.unitService.findByCode(args.params.code);
  }

  action(args: Parameters<UnitModifyControllerInterface['action']>[0]): Promise<void> {
    if (args.params.code) {
      return this.update(args.params.code, args.payload);
    }
    return this.create(args.payload);
  }

  async close(code?: string) {
    if (code) {
      return this.navigateService.to(UnitReviewRoute, { params: { code }, revalidate: false });
    }
    await this.navigateService.close();
  }

  private async create(input: UnitModifyInput): Promise<void> {
    const unit = await this.unitService.create(UnitModifyMapper.create(input));
    insertEntity(UnitEntity, unit);

    await this.navigationBlocker.allow(() =>
      this.navigateService.to(UnitReviewRoute, { params: { code: unit.code }, revalidate: false }),
    );
  }

  private async update(code: string, input: UnitModifyInput): Promise<void> {
    const unit = await this.unitService.update(code, UnitModifyMapper.update(input));
    updateEntity(UnitEntity, unit);

    await this.navigationBlocker.allow(() =>
      this.navigateService.to(UnitReviewRoute, { params: { code: unit.code }, revalidate: false }),
    );
  }
}
