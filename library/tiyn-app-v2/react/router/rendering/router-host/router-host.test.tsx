import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import type { RouterRuntime } from '../../../../core/router/runtime/router-runtime';
import { Layout, type LayoutViewProps } from '../../../layout/declaration/layout';
import type { ModuleMetadata } from '../../../module/declaration/module';
import { Route } from '../../declaration/route';
import { Router } from '../../declaration/router';
import { RouterHost } from './router-host.tsx';

class TestRoute {}

describe('RouterHost', () => {
  it('attributes a Router layout error to RouterRuntime', async () => {
    const error = new Error('router layout failed');
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const failRender = vi.fn(async () => undefined);
    const BrokenLayoutView: React.FC<LayoutViewProps> = () => {
      throw error;
    };

    @Layout({ view: BrokenLayoutView })
    class BrokenLayout {}

    const router = new Router({
      layouts: [BrokenLayout],
      routes: [new Route({ load: async () => ({}), token: TestRoute })],
    });
    const branch = {
      child: null,
      childPending: false,
      pending: false,
      pendingRoute: null,
      routes: [],
    };
    const snapshot = { error: null, phase: 'active' as const };
    const runtime = {
      failRender,
      getBranchSnapshot: () => branch,
      getSnapshot: () => snapshot,
      router,
      subscribe: () => () => undefined,
    } as unknown as RouterRuntime<ModuleMetadata>;

    render(<RouterHost components={{ exception: <div>router exception</div> }} runtime={runtime} />);

    expect(screen.getByText('router exception')).toBeInTheDocument();
    await waitFor(() => expect(failRender).toHaveBeenCalledWith(error));
    consoleError.mockRestore();
  });
});
