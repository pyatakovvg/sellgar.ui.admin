import {
  Config,
  ConfigInterface,
  HttpClient,
  HttpClientInterface,
  BrandGateway,
  BrandGatewayInterface,
  BrandService,
  BrandServiceInterface,
} from '@library/domain';

import { Container } from 'inversify';

import { BrandStore, BrandStoreSymbol } from './store/brand.store.ts';
import { BrandsController, BrandsControllerSymbol } from './controller/brands.controller.ts';

const container = new Container();

container.bind<ConfigInterface>(ConfigInterface).to(Config);
container.bind<HttpClientInterface>(HttpClientInterface).to(HttpClient);

container.bind<BrandGatewayInterface>(BrandGatewayInterface).to(BrandGateway);
container.bind<BrandServiceInterface>(BrandServiceInterface).to(BrandService);

container.bind<BrandStore>(BrandStoreSymbol).to(BrandStore).inSingletonScope();

container.bind<BrandsController>(BrandsControllerSymbol).to(BrandsController);

export { container };
