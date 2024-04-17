import { HttpClient, HttpClientSymbol } from '@library/infra';

import { Container } from 'inversify';

import { ShopGateway, ShopGatewaySymbol } from './gateway/shop.gateway.ts';

import { ShopService, ShopServiceSymbol } from './service/shop.service.ts';

import { ShopPresenter, ShopPresenterSymbol } from './presenter/shop.presenter.ts';

const container = new Container();

container.bind<HttpClient>(HttpClientSymbol).to(HttpClient);

container.bind<ShopGateway>(ShopGatewaySymbol).to(ShopGateway);

container.bind<ShopService>(ShopServiceSymbol).to(ShopService);

container.bind<ShopPresenter>(ShopPresenterSymbol).to(ShopPresenter);

export { container };
