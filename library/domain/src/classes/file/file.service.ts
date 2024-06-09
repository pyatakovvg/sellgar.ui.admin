import { inject, injectable } from 'inversify';

import { FileGateway, FileGatewaySymbols } from './file.gateway.ts';

export const FileServiceSymbol = Symbol.for('FileService');

@injectable()
export class FileService {
  constructor(@inject(FileGatewaySymbols) private readonly fileGateway: FileGateway) {}

  getAll(bucketName: string) {
    return this.fileGateway.getAll(bucketName);
  }

  remove(bucketName: string, fileName: string) {
    return this.fileGateway.remove(bucketName, fileName);
  }
}
