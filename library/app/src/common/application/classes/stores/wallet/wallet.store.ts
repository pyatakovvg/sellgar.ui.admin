import { WalletEntity } from '@library/domain';

import { injectable } from 'inversify';
import { action, observable, makeAutoObservable } from 'mobx';

import { WalletStoreInterface } from './wallet-store.interface.ts';

@injectable()
export class WalletStore implements WalletStoreInterface {
  @observable isVisible: boolean = false;
  @observable wallet: WalletEntity = new WalletEntity();

  constructor() {
    makeAutoObservable(this);
  }

  @action.bound
  setWallet(wallet: WalletEntity) {
    this.wallet = wallet;
  }

  @action.bound
  setVisible(state: boolean) {
    this.isVisible = state;
  }

  reset() {
    this.setVisible(false);
    this.setWallet(new WalletEntity());
  }
}
