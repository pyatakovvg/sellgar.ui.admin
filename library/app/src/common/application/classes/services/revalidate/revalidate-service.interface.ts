import type { DataRouter } from 'react-router-dom';
import type { ServiceIdentifier } from 'inversify';

export type RevalidateKey = ServiceIdentifier | string;
export type RevalidateHandler = () => void | Promise<void>;

export abstract class RevalidateServiceInterface {
  abstract setRouter(router: DataRouter): void;
  abstract register(key: RevalidateKey, handler: RevalidateHandler): void;
  abstract unregister(key: RevalidateKey, handler: RevalidateHandler): void;
  abstract revalidate(key?: RevalidateKey): Promise<void>;
}
