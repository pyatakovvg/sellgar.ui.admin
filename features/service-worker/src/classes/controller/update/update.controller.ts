import { Controller, Inject } from '@sellgar/app';

import { UpdateServiceInterface } from '../../service/update/update-service.interface.ts';
import { UpdateStoreInterface } from '../../store/update/update-store.interface.ts';
import { UpdateControllerInterface } from './update-controller.interface.ts';

@Controller()
export class UpdateController implements UpdateControllerInterface {
  constructor(
    @Inject(UpdateServiceInterface) private readonly service: UpdateServiceInterface,
    @Inject(UpdateStoreInterface) private readonly store: UpdateStoreInterface,
  ) {}

  get status() {
    return this.store.status;
  }
  get errorCode() {
    return this.store.errorCode;
  }
  update(): Promise<void> {
    return this.service.update();
  }
  close(): void {
    this.service.close();
  }
  remindLater(): void {
    this.service.remindLater();
  }
}
