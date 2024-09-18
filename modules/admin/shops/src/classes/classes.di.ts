import {
  HttpClient,
  HttpClientSymbol,
  ShopService,
  ShopServiceSymbol,
  ShopGateway,
  ShopGatewaySymbol,
} from '@library/domain';

import { Container } from 'inversify';

import { ShopsStore, ShopsStoreSymbol } from './store/shops.store.ts';
import { ShopPresenter, ShopPresenterSymbol } from './presenter/shop.presenter.ts';

const container = new Container();

container.bind<HttpClient>(HttpClientSymbol).to(HttpClient);

container.bind<ShopService>(ShopServiceSymbol).to(ShopService);
container.bind<ShopGateway>(ShopGatewaySymbol).to(ShopGateway);

container.bind<ShopsStore>(ShopsStoreSymbol).to(ShopsStore);
container.bind<ShopPresenter>(ShopPresenterSymbol).to(ShopPresenter);

export { container };
