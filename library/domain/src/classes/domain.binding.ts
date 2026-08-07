import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { ConfigBinding } from '../infrastructure/config/config.binding.ts';
import { DeviceBinding } from '../infrastructure/device/device.binding.ts';
import { HttpClientBinding } from '../infrastructure/http-client/http-client.binding.ts';
import { StorageBinding } from '../infrastructure/storage/storage.binding.ts';
import { AuthBinding } from './auth/auth.binding.ts';
import { BrandBinding } from './brand/brand.binding.ts';
import { CategoryBinding } from './category/category.binding.ts';
import { CurrencyBinding } from './currency/currency.binding.ts';
import { FileBinding } from './file/file.binding.ts';
import { FolderBinding } from './folder/folder.binding.ts';
import { PriceBinding } from './price/price.binding.ts';
import { ProductBinding } from './product/product.binding.ts';
import { ProfileBinding } from './profile/profile.binding.ts';
import { PropertyBinding } from './property/property.binding.ts';
import { ShopBinding } from './shop/shop.binding.ts';
import { StoreBinding } from './store/store.binding.ts';
import { UnitBinding } from './unit/unit.binding.ts';
import { UserBinding } from './user/user.binding.ts';
import { VariantBinding } from './variant/variant.binding.ts';

export class DomainBinding extends BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    new ConfigBinding().register(registry);
    new HttpClientBinding().register(registry);
    new DeviceBinding().register(registry);
    new StorageBinding().register(registry);
    new AuthBinding().register(registry);
    new BrandBinding().register(registry);
    new CategoryBinding().register(registry);
    new CurrencyBinding().register(registry);
    new FileBinding().register(registry);
    new FolderBinding().register(registry);
    new PriceBinding().register(registry);
    new ProductBinding().register(registry);
    new ProfileBinding().register(registry);
    new PropertyBinding().register(registry);
    new ShopBinding().register(registry);
    new StoreBinding().register(registry);
    new UnitBinding().register(registry);
    new UserBinding().register(registry);
    new VariantBinding().register(registry);
  }
}
