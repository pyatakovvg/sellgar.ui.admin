import { FileEntity } from '@library/domain';

export abstract class UploadStoreInterface {
  abstract inProcess: boolean;

  abstract setProcess(state: boolean): void;
  abstract upload(data: any, folderUuid?: string): Promise<FileEntity>;
}
