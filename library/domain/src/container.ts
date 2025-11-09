import { Container } from 'inversify';

import { Config, ConfigInterface } from './helpers/config';
import { HttpClient, HttpClientInterface } from './helpers/http-client';
import { DeviceService, DeviceServiceInterface } from './helpers/device';
import { StorageService, StorageServiceInterface } from './helpers/storage';

import { AuthGateway, AuthGatewayInterface, AuthService, AuthServiceInterface } from './classes/auth';
import { BrandGateway, BrandGatewayInterface, BrandService, BrandServiceInterface } from './classes/brand';
import {
  CategoryGateway,
  CategoryGatewayInterface,
  CategoryService,
  CategoryServiceInterface,
} from './classes/category';
import { UnitGateway, UnitGatewayInterface, UnitService, UnitServiceInterface } from './classes/unit';
import {
  PropertyGateway,
  PropertyGatewayInterface,
  PropertyService,
  PropertyServiceInterface,
} from './classes/property';
import {
  PropertyGroupGateway,
  PropertyGroupGatewayInterface,
  PropertyGroupService,
  PropertyGroupServiceInterface,
} from './classes/propertyGroup';
import { FileGateway, FileGatewayInterface, FileService, FileServiceInterface } from './classes/file';
import { FolderGateway, FolderGatewayInterface, FolderService, FolderServiceInterface } from './classes/folder';
import { ProfileGateway, ProfileGatewayInterface, ProfileService, ProfileServiceInterface } from './classes/profile';
import { UserGateway, UserGatewayInterface, UserService, UserServiceInterface } from './classes/user';
import { ProductGateway, ProductGatewayInterface, ProductService, ProductServiceInterface } from './classes/product';
import { VariantGateway, VariantGatewayInterface, VariantService, VariantServiceInterface } from './classes/variant';
import { StoreGateway, StoreGatewayInterface, StoreService, StoreServiceInterface } from './classes/store';
import { PriceGateway, PriceGatewayInterface, PriceService, PriceServiceInterface } from './classes/price';
import {
  CurrencyGateway,
  CurrencyGatewayInterface,
  CurrencyService,
  CurrencyServiceInterface,
} from './classes/currency';

const container = new Container();

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

export { container };
