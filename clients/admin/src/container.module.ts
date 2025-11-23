import { ContainerModule } from 'inversify';

import { Config, ConfigInterface } from '@library/domain';
import { HttpClient, HttpClientInterface } from '@library/domain';
import { DeviceService, DeviceServiceInterface } from '@library/domain';
import { StorageService, StorageServiceInterface } from '@library/domain';

import { AuthGateway, AuthGatewayInterface, AuthService, AuthServiceInterface } from '@library/domain';
import { BrandGateway, BrandGatewayInterface, BrandService, BrandServiceInterface } from '@library/domain';
import { CategoryGateway, CategoryGatewayInterface, CategoryService, CategoryServiceInterface } from '@library/domain';
import { UnitGateway, UnitGatewayInterface, UnitService, UnitServiceInterface } from '@library/domain';
import { PropertyGateway, PropertyGatewayInterface, PropertyService, PropertyServiceInterface } from '@library/domain';
import {
  PropertyGroupGateway,
  PropertyGroupGatewayInterface,
  PropertyGroupService,
  PropertyGroupServiceInterface,
} from '@library/domain';
import { FileGateway, FileGatewayInterface, FileService, FileServiceInterface } from '@library/domain';
import { FolderGateway, FolderGatewayInterface, FolderService, FolderServiceInterface } from '@library/domain';
import { ProfileGateway, ProfileGatewayInterface, ProfileService, ProfileServiceInterface } from '@library/domain';
import { UserGateway, UserGatewayInterface, UserService, UserServiceInterface } from '@library/domain';
import { ProductGateway, ProductGatewayInterface, ProductService, ProductServiceInterface } from '@library/domain';
import { VariantGateway, VariantGatewayInterface, VariantService, VariantServiceInterface } from '@library/domain';
import { StoreGateway, StoreGatewayInterface, StoreService, StoreServiceInterface } from '@library/domain';
import { PriceGateway, PriceGatewayInterface, PriceService, PriceServiceInterface } from '@library/domain';
import { CurrencyGateway, CurrencyGatewayInterface, CurrencyService, CurrencyServiceInterface } from '@library/domain';

export const containerModule = new ContainerModule((container) => {
  container.bind(ConfigInterface).to(Config);
  container.bind(HttpClientInterface).to(HttpClient);
  container.bind(DeviceServiceInterface).to(DeviceService);
  container.bind(StorageServiceInterface).to(StorageService);

  container.bind(AuthGatewayInterface).to(AuthGateway);
  container.bind(AuthServiceInterface).to(AuthService);

  container.bind(BrandGatewayInterface).to(BrandGateway);
  container.bind(BrandServiceInterface).to(BrandService);

  container.bind(CategoryGatewayInterface).to(CategoryGateway);
  container.bind(CategoryServiceInterface).to(CategoryService);

  container.bind(UnitGatewayInterface).to(UnitGateway);
  container.bind(UnitServiceInterface).to(UnitService);

  container.bind(PropertyGatewayInterface).to(PropertyGateway);
  container.bind(PropertyServiceInterface).to(PropertyService);

  container.bind(PropertyGroupGatewayInterface).to(PropertyGroupGateway);
  container.bind(PropertyGroupServiceInterface).to(PropertyGroupService);

  container.bind(FileGatewayInterface).to(FileGateway);
  container.bind(FileServiceInterface).to(FileService);

  container.bind(FolderGatewayInterface).to(FolderGateway);
  container.bind(FolderServiceInterface).to(FolderService);

  container.bind(UserGatewayInterface).to(UserGateway);
  container.bind(UserServiceInterface).to(UserService);

  container.bind(StoreGatewayInterface).to(StoreGateway);
  container.bind(StoreServiceInterface).to(StoreService);

  container.bind(PriceGatewayInterface).to(PriceGateway);
  container.bind(PriceServiceInterface).to(PriceService);

  container.bind(CurrencyGatewayInterface).to(CurrencyGateway);
  container.bind(CurrencyServiceInterface).to(CurrencyService);

  container.bind(ProfileGatewayInterface).to(ProfileGateway);
  container.bind(ProfileServiceInterface).to(ProfileService);

  container.bind(ProductGatewayInterface).to(ProductGateway);
  container.bind(ProductServiceInterface).to(ProductService);

  container.bind(VariantGatewayInterface).to(VariantGateway);
  container.bind(VariantServiceInterface).to(VariantService);
});
