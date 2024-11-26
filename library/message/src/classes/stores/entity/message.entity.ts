import { EMode } from '@library/kit';

export class MessageEntity {
  uuid: string;
  mode?: EMode;
  title?: string;
  content: any;
  autoClose?: boolean;
  timeoutClose?: number;
}
