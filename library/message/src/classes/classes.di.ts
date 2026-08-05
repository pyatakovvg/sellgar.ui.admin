import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { MessageStore, MessageStoreSymbol } from './stores/message.store.ts';
import { MessagePresenter, MessagePresenterSymbol } from './presenters/message.presenter.ts';

export class MessageBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind<MessageStore>(MessageStoreSymbol).to(MessageStore).inSingletonScope();
    registry.bind<MessagePresenter>(MessagePresenterSymbol).to(MessagePresenter).inSingletonScope();
  }
}
