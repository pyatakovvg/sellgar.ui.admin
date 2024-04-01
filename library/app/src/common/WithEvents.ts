import { Event } from './Event';

export class WithEvents {
  private readonly _event = new Event();

  off(eventName: string, cb: (data?: any) => void) {
    this._event.off(eventName, cb);
  }

  on<T>(eventName: string, cb: (data?: any) => void) {
    this._event.on<T>(eventName, cb);
  }

  emit<T>(eventName: string, data?: any) {
    this._event.emit<T>(eventName, data);
  }
}
