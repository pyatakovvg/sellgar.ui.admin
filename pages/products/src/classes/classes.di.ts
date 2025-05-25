import {
  Config,
  ConfigInterface,
  HttpClient,
  HttpClientInterface,
  ProductVariantGateway,
  ProductVariantGatewayInterface,
  ProductVariantService,
  ProductVariantServiceInterface,
} from '@library/domain';

import { Container } from 'inversify';

import { ProductsStore } from './store/products.store.ts';
import { ProductsStoreInterface } from './store/products-store.interface.ts';
import { ProductsController } from './controller/products.controller.ts';
import { ProductsControllerInterface } from './controller/products-controller.interface.ts';

let container: Container;

const create = () => {
  container = new Container();

  container.bind<ConfigInterface>(ConfigInterface).to(Config);
  container.bind<HttpClientInterface>(HttpClientInterface).to(HttpClient);

  container.bind<ProductVariantGatewayInterface>(ProductVariantGatewayInterface).to(ProductVariantGateway);
  container.bind<ProductVariantServiceInterface>(ProductVariantServiceInterface).to(ProductVariantService);

  container.bind<ProductsStoreInterface>(ProductsStoreInterface).to(ProductsStore).inSingletonScope();

  container.bind<ProductsControllerInterface>(ProductsControllerInterface).to(ProductsController);

  return container;
};

const destroy = () => container.unbindAll();

export { create, destroy };
