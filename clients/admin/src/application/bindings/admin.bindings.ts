import {
  AuthGateway,
  AuthGatewayInterface,
  AuthService,
  AuthServiceInterface,
  BrandGateway,
  BrandGatewayInterface,
  BrandService,
  BrandServiceInterface,
  CategoryGateway,
  CategoryGatewayInterface,
  CategoryService,
  CategoryServiceInterface,
  Config,
  ConfigInterface,
  CurrencyGateway,
  CurrencyGatewayInterface,
  CurrencyService,
  CurrencyServiceInterface,
  DeviceService,
  DeviceServiceInterface,
  FileGateway,
  FileGatewayInterface,
  FileService,
  FileServiceInterface,
  FolderGateway,
  FolderGatewayInterface,
  FolderService,
  FolderServiceInterface,
  HttpClient,
  HttpClientInterface,
  PriceGateway,
  PriceGatewayInterface,
  PriceService,
  PriceServiceInterface,
  ProductGateway,
  ProductGatewayInterface,
  ProductService,
  ProductServiceInterface,
  ProfileGateway,
  ProfileGatewayInterface,
  ProfileService,
  ProfileServiceInterface,
  PropertyGateway,
  PropertyGatewayInterface,
  PropertyGroupGateway,
  PropertyGroupGatewayInterface,
  PropertyGroupService,
  PropertyGroupServiceInterface,
  PropertyService,
  PropertyServiceInterface,
  ShopGateway,
  ShopGatewayInterface,
  ShopService,
  ShopServiceInterface,
  StorageService,
  StorageServiceInterface,
  StoreGateway,
  StoreGatewayInterface,
  StoreService,
  StoreServiceInterface,
  UnitGateway,
  UnitGatewayInterface,
  UnitService,
  UnitServiceInterface,
  UserGateway,
  UserGatewayInterface,
  UserService,
  UserServiceInterface,
  VariantGateway,
  VariantGatewayInterface,
  VariantService,
  VariantServiceInterface,
} from '@library/domain';
import { BindingModuleInterface, type BindingRegistryInterface } from '@tiyn/app';


export class AdminBindings implements BindingModuleInterface {
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
