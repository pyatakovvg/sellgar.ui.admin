import { FolderEntity } from '@library/domain';

export abstract class FolderStoreInterface {
  abstract data: FolderEntity[];
  abstract currentFolderData: FolderEntity | null;

  abstract setData(data: FolderEntity[]): void;
  abstract setCurrentFolderData(data: FolderEntity | null): void;
  abstract execute(filter: any): Promise<void>;
}
