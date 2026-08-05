import { UnauthorizedException } from '@library/domain';
import {
  Inject,
  Initializer,
  RuntimeErrorsInterface,
  SessionRuntimeStateInterface,
  UserRequestServiceInterface,
  type ApplicationInitializerContextInterface,
  type ApplicationInitializerInterface,
} from '@sellgar/app';

@Initializer()
export class RegisterUnauthorizedRecoveryInitializer implements ApplicationInitializerInterface {
  private recoveryInProgress: Promise<void> | null = null;

  constructor(
    @Inject(RuntimeErrorsInterface)
    private readonly runtimeErrors: RuntimeErrorsInterface,
    @Inject(SessionRuntimeStateInterface)
    private readonly session: SessionRuntimeStateInterface,
    @Inject(UserRequestServiceInterface)
    private readonly userRequestService: UserRequestServiceInterface,
  ) {}

  execute(context: ApplicationInitializerContextInterface): void {
    context.disposables.add(
      this.runtimeErrors.on(UnauthorizedException, async () => {
        if (!this.recoveryInProgress) {
          this.recoveryInProgress = this.recover(context).finally(() => {
            this.recoveryInProgress = null;
          });
        }

        await this.recoveryInProgress;
      }),
    );
  }

  private async recover(context: ApplicationInitializerContextInterface): Promise<void> {
    if (context.signal.aborted) {
      return;
    }

    const shouldNotifyAboutExpiredSession = this.session.phase === 'authenticated';

    if (shouldNotifyAboutExpiredSession) {
      await this.userRequestService.alert({
        title: 'Сессия завершена',
        description: 'Срок действия авторизации истёк. Выполните вход снова.',
        applyText: 'Ок',
      });
    }

    this.session.setAnonymous();
  }
}
