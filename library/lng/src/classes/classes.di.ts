import { Config, ConfigSymbol } from '@library/domain';

import { Container } from 'inversify';

import { LngStore, LngStoreSymbol } from './stores/lng.store.ts';
import { LngService, LngServiceSymbol } from './services/lng.service.ts';
import { LngPresenter, LngPresenterSymbol } from './presenters/lng.presenter.ts';

const container = new Container();

container.bind<Config>(ConfigSymbol).to(Config);

container.bind<LngStore>(LngStoreSymbol).to(LngStore);
container.bind<LngService>(LngServiceSymbol).to(LngService);
container.bind<LngPresenter>(LngPresenterSymbol).to(LngPresenter);

export { container };
