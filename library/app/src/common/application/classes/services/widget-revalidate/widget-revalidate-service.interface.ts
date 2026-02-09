import type { ServiceIdentifier } from 'inversify';

export type WidgetRevalidateKey = ServiceIdentifier | string;
export type WidgetRevalidateHandler = () => void;

export abstract class WidgetRevalidateServiceInterface {
  abstract register(key: WidgetRevalidateKey, handler: WidgetRevalidateHandler): void;
  abstract unregister(key: WidgetRevalidateKey, handler: WidgetRevalidateHandler): void;
  abstract revalidate(key: WidgetRevalidateKey): void;
  abstract revalidateAll(): void;
}
