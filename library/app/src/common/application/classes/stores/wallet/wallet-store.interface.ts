import { WalletEntity } from '@library/domain';

export abstract class WalletStoreInterface {
  abstract wallet: WalletEntity;
  abstract isVisible: boolean;

  abstract reset(): void;
  abstract setVisible(state: boolean): void;
  abstract setWallet(wallet: WalletEntity): void;
}
