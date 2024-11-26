import { Container } from 'inversify';

import { MessageStore, MessageStoreSymbol } from './stores/message.store.ts';
import { MessagePresenter, MessagePresenterSymbol } from './presenters/message.presenter.ts';

const container = new Container();

container.bind<MessageStore>(MessageStoreSymbol).to(MessageStore);
container.bind<MessagePresenter>(MessagePresenterSymbol).to(MessagePresenter);

export { container };
