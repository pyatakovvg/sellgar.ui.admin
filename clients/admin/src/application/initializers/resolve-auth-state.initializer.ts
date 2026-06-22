import { ProfileEntity, ProfileServiceInterface, UnauthorizedException } from '@library/domain';
import {
  ApplicationStoreInterface,
  Inject,
  Initializer,
  type ApplicationInitializerContextInterface,
  type ApplicationInitializerInterface,
} from '@tiyn/app';

@Initializer()
export class ResolveAuthStateInitializer implements ApplicationInitializerInterface {
  constructor(
    @Inject(ProfileServiceInterface)
    private readonly profileService: ProfileServiceInterface,
    @Inject(ApplicationStoreInterface)
    private readonly store: ApplicationStoreInterface,
  ) {}

  async execute(context: ApplicationInitializerContextInterface): Promise<void> {
    try {
      const profile = await this.profileService.get();

      if (context.signal.aborted) {
        return;
      }

      this.store.set(ProfileEntity, profile);
      context.session.setAuthenticated();
    } catch (error) {
      if (context.signal.aborted) {
        return;
      }

      if (error instanceof UnauthorizedException) {
        context.session.setAnonymous();
        return;
      }

      context.session.setAnonymous();
    }
  }
}
