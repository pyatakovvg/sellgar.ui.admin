import { injectable } from 'inversify';

import { PushMessageDto } from './dto/push-message.dto.ts';

export const PushServiceSymbol = Symbol.for('PushService');

@injectable()
export class PushService {
  private _instance: ServiceWorkerRegistration;

  static urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

    const rawData = window.atob(base64);
    return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
  };

  isSupport() {
    return 'serviceWorker' in navigator && 'PushManager' in window;
  }

  async register() {
    this._instance = await navigator.serviceWorker.ready;
  }

  async unregister() {}

  async requestNotificationPermission() {
    /**
     * Значение разрешения может быть "granted", "default", "denied".
     *
     * granted - пользователь принял запрос.
     * denied - пользователь отклонил запрос.
     * default - пользователь отклонил всплывающее уведомление о разрешении, нажав на "Х".
     */

    const permission = await window.Notification.requestPermission();

    if (permission !== 'granted') {
      throw new Error('Permission not granted for Notification');
    }
  }

  async subscribe() {
    return await this._instance.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: PushService.urlBase64ToUint8Array(
        'BO59_CMT5fQOzsAUvBViXKZ1zpttDx3MfV8hmvnBqUXD6yCk_-KNvUZX1cNoJ-aSTrAA7WW_y2By8kbXnez8geY',
      ),
    });
  }

  async showLocalNotification(dto: PushMessageDto) {
    await this._instance.showNotification(dto.title, {
      body: dto.body,
      icon: dto.icon,
    });
  }
}
