import {
  Config,
  ConfigInterface,
  HttpClient,
  HttpClientInterface,
  ProductGateway,
  ProductGatewayInterface,
  ProductService,
  ProductServiceInterface,
} from '@library/domain';

import { Container } from 'inversify';

import { ProductsStore, ProductsStoreSymbol } from './store/products.store.ts';
import { ProductsController, ProductsControllerSymbol } from './controller/products.controller.ts';

const container = new Container();

container.bind<ConfigInterface>(ConfigInterface).to(Config);
container.bind<HttpClientInterface>(HttpClientInterface).to(HttpClient);

container.bind<ProductGatewayInterface>(ProductGatewayInterface).to(ProductGateway);
container.bind<ProductServiceInterface>(ProductServiceInterface).to(ProductService);

container.bind<ProductsStore>(ProductsStoreSymbol).to(ProductsStore).inSingletonScope();

container.bind<ProductsController>(ProductsControllerSymbol).to(ProductsController);

export const controller = container.get<ProductsController>(ProductsControllerSymbol);
