import { Injectable } from '@sellgar/app';
import { makeAutoObservable } from 'mobx';

import type { UpdateErrorCode, UpdateStatus } from './update-store.interface.ts';
import { UpdateStoreInterface } from './update-store.interface.ts';

@Injectable()
export class UpdateStore implements UpdateStoreInterface {
  status: UpdateStatus = 'idle';
  errorCode: UpdateErrorCode | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  setStatus(status: UpdateStatus, errorCode?: UpdateErrorCode): void {
    this.status = status;
    this.errorCode = errorCode;
  }
}
