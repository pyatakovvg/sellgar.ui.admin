import { MetaEntity } from '../../meta.entity.ts';

export class FolderEntity {
  uuid: string;
  name: string;
}

export class FolderResultEntity {
  data: FolderEntity[];

  meta: MetaEntity;
}
