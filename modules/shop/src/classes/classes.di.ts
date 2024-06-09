import {
  HttpClient,
  HttpClientSymbol,
  ShopGateway,
  ShopGatewaySymbol,
  ShopService,
  ShopServiceSymbol,
} from '@library/domain';

import { Container } from 'inversify';

import { ShopPresenter, ShopPresenterSymbol } from './presenter/shop.presenter.ts';

const container = new Container();

container.bind<HttpClient>(HttpClientSymbol).to(HttpClient);

container.bind<ShopGateway>(ShopGatewaySymbol).to(ShopGateway);

container.bind<ShopService>(ShopServiceSymbol).to(ShopService);

container.bind<ShopPresenter>(ShopPresenterSymbol).to(ShopPresenter);

export { container };
