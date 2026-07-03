import { BindingModuleInterface, type BindingRegistryInterface } from '@tiyn/app';

import {
  AuthGatewayInterface,
  AuthServiceInterface,
  BrandGatewayInterface,
  BrandServiceInterface,
  CategoryGatewayInterface,
  CategoryServiceInterface,
  CurrencyGatewayInterface,
  CurrencyServiceInterface,
  FileGatewayInterface,
  FileServiceInterface,
  FolderGatewayInterface,
  FolderServiceInterface,
  PriceGatewayInterface,
  PriceServiceInterface,
  ProductGatewayInterface,
  ProductServiceInterface,
  ProfileGatewayInterface,
  ProfileServiceInterface,
  PropertyGatewayInterface,
  PropertyGroupGatewayInterface,
  PropertyGroupServiceInterface,
  PropertyServiceInterface,
  ShopGatewayInterface,
  ShopServiceInterface,
  StoreGatewayInterface,
  StoreServiceInterface,
  UnitGatewayInterface,
  UnitServiceInterface,
  UserGatewayInterface,
  UserServiceInterface,
  VariantGatewayInterface,
  VariantServiceInterface,
} from '../classes';
import { AuthGateway } from '../classes/auth/gateway/auth.gateway.ts';
import { AuthService } from '../classes/auth/application/auth.service.ts';
import { BrandGateway } from '../classes/brand/gateway/brand.gateway.ts';
import { BrandService } from '../classes/brand/application/brand.service.ts';
import { CategoryGateway } from '../classes/category/gateway/category.gateway.ts';
import { CategoryService } from '../classes/category/application/category.service.ts';
import { CurrencyGateway } from '../classes/currency/gateway/currency.gateway.ts';
import { CurrencyService } from '../classes/currency/application/currency.service.ts';
import { FileGateway } from '../classes/file/gateway/file.gateway.ts';
import { FileService } from '../classes/file/application/file.service.ts';
import { FolderGateway } from '../classes/folder/gateway/folder.gateway.ts';
import { FolderService } from '../classes/folder/application/folder.service.ts';
import { PriceGateway } from '../classes/price/gateway/price.gateway.ts';
import { PriceService } from '../classes/price/application/price.service.ts';
import { ProductGateway } from '../classes/product/gateway/product.gateway.ts';
import { ProductService } from '../classes/product/application/product.service.ts';
import { ProfileGateway } from '../classes/profile/gateway/profile.gateway.ts';
import { ProfileService } from '../classes/profile/application/profile.service.ts';
import { PropertyGroupGateway } from '../classes/propertyGroup/gateway/property-group.gateway.ts';
import { PropertyGroupService } from '../classes/propertyGroup/application/property-group.service.ts';
import { PropertyGateway } from '../classes/property/gateway/property.gateway.ts';
import { PropertyService } from '../classes/property/application/property.service.ts';
import { ShopGateway } from '../classes/shop/gateway/shop.gateway.ts';
import { ShopService } from '../classes/shop/application/shop.service.ts';
import { StoreGateway } from '../classes/store/gateway/store.gateway.ts';
import { StoreService } from '../classes/store/application/store.service.ts';
import { UnitGateway } from '../classes/unit/gateway/unit.gateway.ts';
import { UnitService } from '../classes/unit/application/unit.service.ts';
import { UserGateway } from '../classes/user/gateway/user.gateway.ts';
import { UserService } from '../classes/user/application/user.service.ts';
import { VariantGateway } from '../classes/variant/gateway/variant.gateway.ts';
import { VariantService } from '../classes/variant/application/variant.service.ts';
import { Config, ConfigInterface } from '../helpers/config';
import { DeviceService, DeviceServiceInterface } from '../helpers/device';
import { HttpClient, HttpClientInterface } from '../helpers/http-client';
import { StorageService, StorageServiceInterface } from '../helpers/storage';

export class DomainBindings extends BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(ConfigInterface).to(Config);
    registry.bind(HttpClientInterface).to(HttpClient);
    registry.bind(DeviceServiceInterface).to(DeviceService);
    registry.bind(StorageServiceInterface).to(StorageService);

    registry.bind(ShopGatewayInterface).to(ShopGateway);
    registry.bind(ShopServiceInterface).to(ShopService);
    registry.bind(AuthGatewayInterface).to(AuthGateway);
    registry.bind(AuthServiceInterface).to(AuthService);
    registry.bind(BrandGatewayInterface).to(BrandGateway);
    registry.bind(BrandServiceInterface).to(BrandService);
    registry.bind(CategoryGatewayInterface).to(CategoryGateway);
    registry.bind(CategoryServiceInterface).to(CategoryService);
    registry.bind(UnitGatewayInterface).to(UnitGateway);
    registry.bind(UnitServiceInterface).to(UnitService);
    registry.bind(PropertyGatewayInterface).to(PropertyGateway);
    registry.bind(PropertyServiceInterface).to(PropertyService);
    registry.bind(PropertyGroupGatewayInterface).to(PropertyGroupGateway);
    registry.bind(PropertyGroupServiceInterface).to(PropertyGroupService);
    registry.bind(FileGatewayInterface).to(FileGateway);
    registry.bind(FileServiceInterface).to(FileService);
    registry.bind(FolderGatewayInterface).to(FolderGateway);
    registry.bind(FolderServiceInterface).to(FolderService);
    registry.bind(UserGatewayInterface).to(UserGateway);
    registry.bind(UserServiceInterface).to(UserService);
    registry.bind(StoreGatewayInterface).to(StoreGateway);
    registry.bind(StoreServiceInterface).to(StoreService);
    registry.bind(PriceGatewayInterface).to(PriceGateway);
    registry.bind(PriceServiceInterface).to(PriceService);
    registry.bind(CurrencyGatewayInterface).to(CurrencyGateway);
    registry.bind(CurrencyServiceInterface).to(CurrencyService);
    registry.bind(ProfileGatewayInterface).to(ProfileGateway);
    registry.bind(ProfileServiceInterface).to(ProfileService);
    registry.bind(ProductGatewayInterface).to(ProductGateway);
    registry.bind(ProductServiceInterface).to(ProductService);
    registry.bind(VariantGatewayInterface).to(VariantGateway);
    registry.bind(VariantServiceInterface).to(VariantService);
  }
}
