import {
  Initializer,
  type ApplicationInitializerContextInterface,
  type ApplicationInitializerInterface,
} from '@sellgar/app-v2';

@Initializer()
export class ResolveSessionInitializer implements ApplicationInitializerInterface {
  execute(context: ApplicationInitializerContextInterface): void {
    context.session.setAuthenticated();
  }
}
