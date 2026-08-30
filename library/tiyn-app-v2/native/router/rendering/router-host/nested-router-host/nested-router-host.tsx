import React from 'react';

import { NavigateServiceInterface } from '../../../../../core/router/service/navigate-service';
import type { RouterRuntime } from '../../../../../core/router/runtime/router-runtime';
import type { ModuleMetadata } from '../../../../module/declaration/module';
import { RuntimeScopeProvider } from '../../../../runtime/scope/runtime-scope-context';
import { RuntimeErrorBoundary } from '../../../../runtime/exception/runtime-error-boundary';
import { getRouterPresentationDefinition } from '../../../declaration/router';
import { getShellMetadata } from '../../../declaration/shell';
import { ShellHost } from '../../shell-host';

interface IProps {
  readonly children: React.ReactNode;
  readonly exception: React.ReactNode;
  readonly runtime: RouterRuntime<ModuleMetadata>;
}

export const NestedRouterHost: React.FC<IProps> = (props) => {
  const definition = getRouterPresentationDefinition(props.runtime.router);
  const scope = props.runtime.getRouterScope();
  const navigate = scope.get(NavigateServiceInterface);
  const shell = definition.shell ? getShellMetadata(definition.shell) : null;
  const dismiss = React.useCallback(() => navigate.close(), [navigate]);

  return (
    <RuntimeErrorBoundary
      exception={props.exception}
      onError={(error) => void props.runtime.failRender(error)}
      resetKeys={[props.runtime]}
    >
      <RuntimeScopeProvider scope={scope}>
        {shell ? (
          <ShellHost dismiss={dismiss} metadata={shell}>
            {props.children}
          </ShellHost>
        ) : (
          props.children
        )}
      </RuntimeScopeProvider>
    </RuntimeErrorBoundary>
  );
};
