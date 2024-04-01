export interface IEventData<T = any> {
  type: string;
  data: T;
}

export interface IEventStore {
  [key: string]: TEventCallback[];
}

export type TEventCallback<T = any> = (data?: IEventData<T>) => void;

export interface IEvent {
  off(eventName: string, cb: TEventCallback): void;
  on(eventName: string, cb: TEventCallback): void;
  emit<T>(eventName: string, data?: IEventData<T>): void;
}

export class Event implements IEvent {
  private _events: IEventStore = {};

  on<T>(eventName: string, cb: TEventCallback<T>) {
    if (eventName in this._events) {
      this._events[eventName].push(cb);
      return void 0;
    }
    this._events[eventName] = [cb];
  }

  off<T>(eventName: string, cb: TEventCallback<T>) {
    if (eventName in this._events) {
      const cbIndex = this._events[eventName].indexOf(cb);
      if (cbIndex >= 0) {
        this._events[eventName] = [
          ...this._events[eventName].splice(0, cbIndex),
          ...this._events[eventName].splice(cbIndex + 1),
        ];

        if (!this._events[eventName].length) {
          delete this._events[eventName];
        }
      }
    }
  }

  emit<T>(eventName: string, data?: IEventData<T>) {
    if (eventName in this._events) {
      for (let i = 0; i < this._events[eventName].length; i++) {
        const cb: TEventCallback = this._events[eventName][i];
        cb(data);
      }
    }
  }
}
