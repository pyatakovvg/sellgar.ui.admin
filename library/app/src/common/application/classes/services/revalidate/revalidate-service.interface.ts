import type { DataRouter } from 'react-router-dom';

export abstract class RevalidateServiceInterface {
  abstract setRouter(router: DataRouter): void;
  abstract revalidate(): Promise<void>;
}
