import { UploadFileEntity } from '../../../domain/upload-file.entity.ts';

export abstract class UploadFileFormDataFactoryInterface {
  abstract create(files: UploadFileEntity[], folderUuid?: string): FormData;
}
