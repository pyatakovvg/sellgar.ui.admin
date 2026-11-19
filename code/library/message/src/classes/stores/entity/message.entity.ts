export class MessageEntity {
  uuid: string;
  target: 'info' | 'destructive' | 'success';
  title: string;
  content: any;
  autoClose?: boolean;
  timeoutClose?: number;
}
