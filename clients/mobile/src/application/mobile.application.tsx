import {
  Application,
  type ApplicationConfiguratorInterface,
  NavigationBlockerFeature,
  NavigationBlockerPresentation,
  NotificationFeature,
  NotificationPresentation,
  UserRequestFeature,
  UserRequestPresentation,
} from '@sellgar/app-v2/native';
import { UseBindings } from '@sellgar/app-v2';

import { BaseLayout } from '../layouts/base';
import { Status } from './components/status';
import { Fallback } from './components/frame/fallback';
import { MobileBindings } from './bindings';
import { ResolveSessionInitializer } from './initializers';
import { createMobileRouter } from './routes';
import { NavigationBlocker } from './presentations/navigation-blocker';
import { DestructiveNotification, InfoNotification, SuccessNotification } from './presentations/notification';
import { AlertUserRequest, ConfirmUserRequest, PromptUserRequest } from './presentations/user-request';
import { DrawerShell } from '../shells/drawer/src';

@UseBindings(MobileBindings)
export class MobileApplication extends Application {
  protected configure(app: ApplicationConfiguratorInterface): void {
    app.components({
      exception: <Status title="Module failed" tone="error" />,
      failed: <Status title="Application failed" tone="error" />,
      fallback: <Status title="Loading module" loading />,
      forbidden: <Status title="Forbidden" tone="error" />,
      notFound: <Status title="Route not found" tone="error" />,
      splash: <Status title="Starting core runtime" loading />,
    });
    app.features([
      NavigationBlockerFeature.configure({
        presentation: NavigationBlockerPresentation.define(NavigationBlocker),
      }),
      NotificationFeature.configure({
        presentation: NotificationPresentation.define((registry) => {
          registry.destructive(DestructiveNotification);
          registry.info(InfoNotification);
          registry.success(SuccessNotification);
        }),
      }),
      UserRequestFeature.configure({
        presentation: UserRequestPresentation.define((registry) => {
          registry.alert(AlertUserRequest);
          registry.confirm(ConfirmUserRequest);
          registry.prompt(PromptUserRequest);
        }),
      }),
    ]);
    app.layouts([BaseLayout]);
    app.initializers([ResolveSessionInitializer]);
    app.routing({
      exception: <Status title="Nested route failed" tone="error" />,
      fallback: <Fallback />,
      forbidden: <Status title="Nested route forbidden" tone="error" />,
      notFound: <Status title="Nested route not found" tone="error" />,
      shell: DrawerShell,
    });
    app.router(createMobileRouter());
  }
}
