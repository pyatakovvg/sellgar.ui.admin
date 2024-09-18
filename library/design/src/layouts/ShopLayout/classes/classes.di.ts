import {
  HttpClient,
  HttpClientSymbol,
  ShopGateway,
  ShopGatewaySymbol,
  ShopService,
  ShopServiceSymbol,
  CompanyGateway,
  CompanyGatewaySymbol,
  CompanyService,
  CompanyServiceSymbol,
} from '@library/domain';

import { Container } from 'inversify';

import { ShopStore, ShopStoreSymbol } from './store/shop.store.ts';
import { ShopPresenter, ShopPresenterSymbol } from './presenter/shop.presenter.ts';

const container = new Container();

container.bind<HttpClient>(HttpClientSymbol).to(HttpClient);

container.bind<ShopGateway>(ShopGatewaySymbol).to(ShopGateway);
container.bind<ShopService>(ShopServiceSymbol).to(ShopService);

container.bind<CompanyGateway>(CompanyGatewaySymbol).to(CompanyGateway);
container.bind<CompanyService>(CompanyServiceSymbol).to(CompanyService);

container.bind<ShopStore>(ShopStoreSymbol).to(ShopStore);
container.bind<ShopPresenter>(ShopPresenterSymbol).to(ShopPresenter);

export { container };
