import { describe, expect, it } from 'vitest';

import { UploadFileEntity } from '../../../domain/upload-file.entity.ts';
import { UploadFileFormDataFactory } from './upload-file-form-data.factory.ts';

describe('UploadFileFormDataFactory', () => {
  it('добавляет каждый файл и каталог загрузки', () => {
    const first = new File(['first'], 'first.txt', { type: 'text/plain' });
    const second = new File(['second'], 'second.txt', { type: 'text/plain' });
    const files = [
      Object.assign(new UploadFileEntity(), { file: first }),
      Object.assign(new UploadFileEntity(), { file: second }),
    ];

    const formData = new UploadFileFormDataFactory().create(files, '69df2264-d641-470c-a159-b0145501f52d');

    expect(formData.getAll('files')).toEqual([first, second]);
    expect(formData.get('folderUuid')).toBe('69df2264-d641-470c-a159-b0145501f52d');
  });
});
