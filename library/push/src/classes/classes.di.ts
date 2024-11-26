import { Container } from 'inversify';

import { PushService, PushServiceSymbol } from './services/push.service.ts';

const container = new Container();

container.bind<PushService>(PushServiceSymbol).to(PushService);

export { container };
