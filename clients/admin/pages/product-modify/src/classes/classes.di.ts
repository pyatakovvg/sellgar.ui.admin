import {
  Config,
  ConfigInterface,
  HttpClient,
  HttpClientInterface,
  BrandGateway,
  BrandGatewayInterface,
  BrandService,
  BrandServiceInterface,
  CategoryGateway,
  CategoryGatewayInterface,
  CategoryService,
  CategoryServiceInterface,
  ProductGateway,
  ProductGatewayInterface,
  ProductService,
  ProductServiceInterface,
  PropertyGateway,
  PropertyGatewayInterface,
  PropertyService,
  PropertyServiceInterface,
  PriceGateway,
  PriceGatewayInterface,
  PriceService,
  PriceServiceInterface,
  CurrencyGateway,
  CurrencyGatewayInterface,
  CurrencyService,
  CurrencyServiceInterface,
} from '@library/domain';

import { Container } from 'inversify';

import { FormStore } from './store/form/form.store.ts';
import { FormStoreInterface } from './store/form/form-store.interface.ts';

import { PriceStore } from './store/price/price.store.ts';
import { PriceStoreInterface } from './store/price/price-store.interface.ts';

import { ProductStore } from './store/product/product.store.ts';
import { ProductStoreInterface } from './store/product/product-store.interface.ts';

import { ProductPresenter } from './presenter/product.presenter.ts';
import { ProductPresenterInterface } from './presenter/product-presenter.interface.ts';

export const createContainer = () => {
  const container = new Container();

  container.bind<ConfigInterface>(ConfigInterface).to(Config);
  container.bind<HttpClientInterface>(HttpClientInterface).to(HttpClient);

  container.bind<BrandGatewayInterface>(BrandGatewayInterface).to(BrandGateway);
  container.bind<BrandServiceInterface>(BrandServiceInterface).to(BrandService);
  container.bind<CategoryGatewayInterface>(CategoryGatewayInterface).to(CategoryGateway);
  container.bind<CategoryServiceInterface>(CategoryServiceInterface).to(CategoryService);
  container.bind<PropertyGatewayInterface>(PropertyGatewayInterface).to(PropertyGateway);
  container.bind<PropertyServiceInterface>(PropertyServiceInterface).to(PropertyService);
  container.bind<PriceGatewayInterface>(PriceGatewayInterface).to(PriceGateway);
  container.bind<PriceServiceInterface>(PriceServiceInterface).to(PriceService);
  container.bind<CurrencyGatewayInterface>(CurrencyGatewayInterface).to(CurrencyGateway);
  container.bind<CurrencyServiceInterface>(CurrencyServiceInterface).to(CurrencyService);

  container.bind<ProductGatewayInterface>(ProductGatewayInterface).to(ProductGateway);
  container.bind<ProductServiceInterface>(ProductServiceInterface).to(ProductService);

  container.bind<FormStoreInterface>(FormStoreInterface).to(FormStore);
  container.bind<PriceStoreInterface>(PriceStoreInterface).to(PriceStore);
  container.bind<ProductStoreInterface>(ProductStoreInterface).to(ProductStore);

  container.bind<ProductPresenterInterface>(ProductPresenterInterface).to(ProductPresenter);

  return container;
};
