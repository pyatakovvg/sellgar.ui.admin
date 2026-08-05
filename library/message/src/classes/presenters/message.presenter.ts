import { Inject, Injectable } from '@sellgar/app';

import { MessageEntity } from '../stores/entity/message.entity.ts';
import { MessageStore, MessageStoreSymbol } from '../stores/message.store.ts';

export const MessagePresenterSymbol = Symbol.for('MessagePresenter');

@Injectable()
export class MessagePresenter {
  constructor(@Inject(MessageStoreSymbol) private readonly messageStore: MessageStore) {}

  show(push: Omit<MessageEntity, 'uuid'>) {
    this.messageStore.create(push);
  }

  close(uuid: string) {
    this.messageStore.remove(uuid);
  }

  getAll() {
    return this.messageStore.messages;
  }
}
