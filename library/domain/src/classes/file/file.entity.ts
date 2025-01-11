import { MetaEntity } from '../../meta.entity.ts';

export class FileEntity {
  uuid: string;
  name: string;
  mime: string;
  size: number;
  createdAt: string;
  updatedAt: string;
}

export class FileResultEntity {
  data: FileEntity[];

  meta: MetaEntity;
}
