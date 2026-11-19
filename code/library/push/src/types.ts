type TVariantPush = 'primary' | 'success' | 'danger';

export interface IPush {
  uuid: string;
  variant?: TVariantPush;
  title?: string;
  content: any;
  autoClose?: boolean;
  timeoutClose?: number;
}
