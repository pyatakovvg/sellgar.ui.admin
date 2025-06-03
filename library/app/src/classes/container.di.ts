import { Config, ConfigInterface } from '@library/domain';
import { HttpClient, HttpClientInterface } from '@library/domain';
import { AuthGateway, AuthGatewayInterface, AuthService, AuthServiceInterface } from '@library/domain';
import { BrandGateway, BrandGatewayInterface, BrandService, BrandServiceInterface } from '@library/domain';
import { CategoryGateway, CategoryGatewayInterface, CategoryService, CategoryServiceInterface } from '@library/domain';
import { UnitGateway, UnitGatewayInterface, UnitService, UnitServiceInterface } from '@library/domain';
import { PropertyGateway, PropertyGatewayInterface, PropertyService, PropertyServiceInterface } from '@library/domain';
import { ProfileService, ProfileServiceInterface, ProfileGateway, ProfileGatewayInterface } from '@library/domain';
import {
  PropertyGroupGateway,
  PropertyGroupGatewayInterface,
  PropertyGroupService,
  PropertyGroupServiceInterface,
} from '@library/domain';
import { FileGateway, FileGatewayInterface, FileService, FileServiceInterface } from '@library/domain';
import { FolderGateway, FolderGatewayInterface, FolderService, FolderServiceInterface } from '@library/domain';
import { UserGateway, UserGatewayInterface, UserService, UserServiceInterface } from '@library/domain';
import { StoreGateway, StoreGatewayInterface, StoreService, StoreServiceInterface } from '@library/domain';
import { PriceGateway, PriceGatewayInterface, PriceService, PriceServiceInterface } from '@library/domain';
import { CurrencyGateway, CurrencyGatewayInterface, CurrencyService, CurrencyServiceInterface } from '@library/domain';
import {
  ProductVariantGateway,
  ProductVariantGatewayInterface,
  ProductVariantService,
  ProductVariantServiceInterface,
} from '@library/domain';
import { ProductGateway, ProductGatewayInterface, ProductService, ProductServiceInterface } from '@library/domain';

import { Container } from 'inversify';

import { create } from './classes.di';

const container = new Container();

container.bind<ConfigInterface>(ConfigInterface).to(Config);
container.bind<HttpClientInterface>(HttpClientInterface).to(HttpClient);

container.bind<AuthGatewayInterface>(AuthGatewayInterface).to(AuthGateway);
container.bind<AuthServiceInterface>(AuthServiceInterface).to(AuthService);

container.bind<BrandGatewayInterface>(BrandGatewayInterface).to(BrandGateway);
container.bind<BrandServiceInterface>(BrandServiceInterface).to(BrandService);

container.bind<CategoryGatewayInterface>(CategoryGatewayInterface).to(CategoryGateway);
container.bind<CategoryServiceInterface>(CategoryServiceInterface).to(CategoryService);

container.bind<UnitGatewayInterface>(UnitGatewayInterface).to(UnitGateway);
container.bind<UnitServiceInterface>(UnitServiceInterface).to(UnitService);

container.bind<PropertyGatewayInterface>(PropertyGatewayInterface).to(PropertyGateway);
container.bind<PropertyServiceInterface>(PropertyServiceInterface).to(PropertyService);

container.bind<PropertyGroupGatewayInterface>(PropertyGroupGatewayInterface).to(PropertyGroupGateway);
container.bind<PropertyGroupServiceInterface>(PropertyGroupServiceInterface).to(PropertyGroupService);

container.bind<FileGatewayInterface>(FileGatewayInterface).to(FileGateway);
container.bind<FileServiceInterface>(FileServiceInterface).to(FileService);

container.bind<FolderGatewayInterface>(FolderGatewayInterface).to(FolderGateway);
container.bind<FolderServiceInterface>(FolderServiceInterface).to(FolderService);

container.bind<UserGatewayInterface>(UserGatewayInterface).to(UserGateway);
container.bind<UserServiceInterface>(UserServiceInterface).to(UserService);

container.bind<StoreGatewayInterface>(StoreGatewayInterface).to(StoreGateway);
container.bind<StoreServiceInterface>(StoreServiceInterface).to(StoreService);

container.bind<PriceGatewayInterface>(PriceGatewayInterface).to(PriceGateway);
container.bind<PriceServiceInterface>(PriceServiceInterface).to(PriceService);

container.bind<CurrencyGatewayInterface>(CurrencyGatewayInterface).to(CurrencyGateway);
container.bind<CurrencyServiceInterface>(CurrencyServiceInterface).to(CurrencyService);

container.bind<ProfileGatewayInterface>(ProfileGatewayInterface).to(ProfileGateway);
container.bind<ProfileServiceInterface>(ProfileServiceInterface).to(ProfileService);

container.bind<ProductGatewayInterface>(ProductGatewayInterface).to(ProductGateway);
container.bind<ProductServiceInterface>(ProductServiceInterface).to(ProductService);

container.bind<ProductVariantGatewayInterface>(ProductVariantGatewayInterface).to(ProductVariantGateway);
container.bind<ProductVariantServiceInterface>(ProductVariantServiceInterface).to(ProductVariantService);

const applicationModule = create();

container.loadSync(applicationModule);

export { container };
