import { CompanyEntity } from '../../company/entity/company.entity.ts';

export class ShopEntity {
  uuid: string;
  name: string;
  company: CompanyEntity;
}
