import {
  Inject,
  Injectable,
  SessionExpirationNotifierInterface,
  UserRequestServiceInterface,
  type SessionExpirationNotificationContext,
} from '@sellgar/app';

@Injectable()
export class SessionExpirationNotifier extends SessionExpirationNotifierInterface {
  constructor(
    @Inject(UserRequestServiceInterface)
    private readonly userRequestService: UserRequestServiceInterface,
  ) {
    super();
  }

  async notify(context: SessionExpirationNotificationContext): Promise<void> {
    if (context.signal.aborted) {
      return;
    }

    await this.userRequestService.alert({
      title: 'Сессия завершена',
      description: 'Срок действия авторизации истёк. Выполните вход снова.',
      applyText: 'Ок',
    });
  }
}
