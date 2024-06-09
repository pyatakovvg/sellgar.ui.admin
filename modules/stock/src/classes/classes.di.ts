import {
  HttpClient,
  HttpClientSymbol,
  ProductGateway,
  ProductGatewaySymbol,
  ProductService,
  ProductServiceSymbol,
} from '@library/domain';

import { Container } from 'inversify';

import { ProductPresenter, ProductPresenterSymbol } from './presenter/product.presenter.ts';

import { GetProductsCase, GetProductsCaseSymbol } from './case/get-products.case.ts';

const container = new Container();

container.bind<ProductPresenter>(ProductPresenterSymbol).to(ProductPresenter);

container.bind<GetProductsCase>(GetProductsCaseSymbol).to(GetProductsCase);

container.bind<ProductService>(ProductServiceSymbol).to(ProductService);

container.bind<ProductGateway>(ProductGatewaySymbol).to(ProductGateway);

container.bind<HttpClient>(HttpClientSymbol).to(HttpClient);

export { container };
