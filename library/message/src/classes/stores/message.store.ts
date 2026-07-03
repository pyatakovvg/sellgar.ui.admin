import { uuid } from '@utils/generate';

import { Injectable } from '@tiyn/app';
import { observable, action, makeAutoObservable } from 'mobx';

import { MessageEntity } from './entity/message.entity.ts';

export const MessageStoreSymbol = Symbol.for('MessageStore');

@Injectable()
export class MessageStore {
  @observable messages: MessageEntity[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action.bound
  create(push: Omit<MessageEntity, 'uuid'>) {
    this.messages.push({ uuid: uuid(), ...push });
  }

  @action.bound
  remove(uuid: string) {
    this.messages = this.messages.filter((message) => message.uuid !== uuid);
  }
}
