import type React from 'react';

import { ApplicationConfiguratorInterface as CoreApplicationConfiguratorInterface } from '../../../../core/application/config/application-configurator';
import type { LayoutConstructor } from '../../../layout/declaration/layout';

export interface ApplicationComponents {
  readonly exception?: React.ReactNode;
  readonly failed?: React.ReactNode;
  readonly fallback?: React.ReactNode;
  readonly forbidden?: React.ReactNode;
  readonly notFound?: React.ReactNode;
  readonly splash?: React.ReactNode;
}

export interface ApplicationRouting {
  readonly exception?: React.ReactNode;
  readonly fallback?: React.ReactNode;
  readonly forbidden?: React.ReactNode;
  readonly notFound?: React.ReactNode;
}

export interface ResolvedApplicationRouting {
  readonly exception: React.ReactNode;
  readonly fallback: React.ReactNode;
  readonly forbidden: React.ReactNode;
  readonly notFound: React.ReactNode;
}

export abstract class ApplicationConfiguratorInterface extends CoreApplicationConfiguratorInterface {
  abstract components(components: ApplicationComponents): void;

  abstract layouts(layouts: readonly LayoutConstructor[]): void;

  abstract routing(routing: ApplicationRouting): void;
}
