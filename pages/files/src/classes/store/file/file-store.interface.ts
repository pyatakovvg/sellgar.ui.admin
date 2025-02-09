import { FileEntity } from '@library/domain';

export abstract class FileStoreInterface {
  abstract data: FileEntity[];

  abstract setData(data: FileEntity[]): void;
  abstract addData(data: FileEntity[]): void;
  abstract execute(filter: any): Promise<void>;
}
