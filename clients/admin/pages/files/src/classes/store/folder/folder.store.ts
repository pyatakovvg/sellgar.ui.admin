import { FolderEntity, FolderServiceInterface } from '@library/domain';

import { inject, injectable } from 'inversify';
import { observable, makeObservable, action } from 'mobx';

import { FolderStoreInterface } from './folder-store.interface.ts';

@injectable()
export class FolderStore implements FolderStoreInterface {
  @observable data: FolderEntity[] = [];
  @observable currentFolderData: FolderEntity | null = null;

  constructor(@inject(FolderServiceInterface) private readonly folderService: FolderServiceInterface) {
    makeObservable(this);
  }

  @action.bound
  setData(data: FolderEntity[]) {
    this.data = data;
  }

  @action.bound
  setCurrentFolderData(data: FolderEntity | null) {
    this.currentFolderData = data;
  }

  async execute(filter: any) {
    try {
      const result = await Promise.all([
        await this.folderService.findAll(filter),
        filter.parentUuid ? await this.folderService.findByUuid(filter.parentUuid) : null,
      ]);

      this.setData(result[0].data);
      this.setCurrentFolderData(result[1]);
    } catch (error) {}
  }
}
