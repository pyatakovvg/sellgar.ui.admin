import { observable, action, makeObservable } from 'mobx';

import type { IPush } from './types';

function uuidV4(): string {
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c: string) => {
    const dig: number = Number(c);
    return (dig ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (dig / 4)))).toString(16);
  });
}

export class PushController {
  @observable items: IPush[] = [];

  constructor() {
    makeObservable(this);
  }

  @action add(options: Omit<IPush, 'uuid'>) {
    const newPush: IPush = { uuid: uuidV4(), autoClose: true, timeoutClose: 4, ...options };
    this.items = [...this.items, newPush];
  }

  @action remove(uuid: string) {
    this.items = this.items.filter((push) => push.uuid !== uuid);
  }
}
