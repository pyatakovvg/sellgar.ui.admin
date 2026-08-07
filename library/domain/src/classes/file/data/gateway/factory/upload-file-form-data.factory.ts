import { Injectable } from '@sellgar/app';

import { UploadFileEntity } from '../../../domain/upload-file.entity.ts';
import { UploadFileFormDataFactoryInterface } from './upload-file-form-data-factory.interface.ts';

@Injectable()
export class UploadFileFormDataFactory implements UploadFileFormDataFactoryInterface {
  create(files: UploadFileEntity[], folderUuid?: string): FormData {
    const formData = new FormData();

    for (const file of files) {
      formData.append('files', file.file);
    }

    if (folderUuid) {
      formData.append('folderUuid', folderUuid);
    }

    return formData;
  }
}
