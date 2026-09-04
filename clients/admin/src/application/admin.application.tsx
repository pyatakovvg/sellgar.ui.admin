import { UseBindings } from '@sellgar/app';
import { Application, UserRequestFeature, UserRequestPresentation } from '@sellgar/app/react';
import type { ApplicationConfiguratorInterface } from '@sellgar/app/react';

import { MainLayout } from '@layout/main';

import { Exception, Failed } from './components/exception';
import { Loading } from './components/loading';
import { NotFound } from './components/not-found';
import { Splash } from './components/splash';

import { AdminBindings } from './bindings';
import { ResolveAuthStateInitializer } from './initializers';
import { AlertUserRequestView } from './presentations/user-request';
import { createAdminRouter } from './routes';
import { DrawerShell } from './shells/drawer';

@UseBindings(AdminBindings)
export class AdminApplication extends Application {
  protected configure(app: ApplicationConfiguratorInterface): void {
    app.components({
      splash: <Splash />,
      fallback: <Loading />,
      exception: <Exception />,
      failed: <Failed />,
      notFound: <NotFound />,
    });

    app.layouts([MainLayout]);

    app.features([
      UserRequestFeature.configure({
        presentation: UserRequestPresentation.define((registry) => {
          registry.alert(AlertUserRequestView);
        }),
      }),
    ]);

    app.routing({
      shell: DrawerShell,
    });

    app.initializers([ResolveAuthStateInitializer]);

    app.router(createAdminRouter());
  }
}
