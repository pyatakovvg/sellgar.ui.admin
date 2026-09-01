import type { ApplicationRouterHistoryEntry } from '../../../../core/application/lifecycle/application';
import type { RouteDeclaration } from '../../../../core/router/declaration/route';
import { areNavigationParamsEqual } from '../../../../core/router/runtime/navigation-state';
import type { NavigationRouteEntry, NavigationState } from '../../../../core/router/runtime/navigation-state';
import type { RouteActivationRuntime } from '../../../../core/router/runtime/route-runtime';
import type { ModuleMetadata } from '../../../module/declaration/module';

export interface NativeRouteHistoryGroup {
  readonly entries: readonly ApplicationRouterHistoryEntry<ModuleMetadata>[];
  readonly id: string;
  readonly runtime: RouteActivationRuntime<ModuleMetadata> | null;
}

export interface NativePendingRouteProjection {
  readonly changeDepth: number;
  readonly path: readonly NavigationRouteEntry[];
}

/**
 * Projects the flat chronological core history into one stable Route.routes
 * outlet. Consecutive entries that stay inside the same Route activation share
 * one parent screen; leaving and returning creates another physical position.
 */
export const groupNativeRouteHistory = (
  entries: readonly ApplicationRouterHistoryEntry<ModuleMetadata>[],
  depth: number,
): readonly NativeRouteHistoryGroup[] => {
  const groups: MutableNativeRouteHistoryGroup[] = [];

  for (const entry of entries) {
    const runtime = entry.tree.routes[depth] ?? null;
    const id = resolveNativeRoutePresentationKey(runtime?.route ?? null, depth);
    const existingIndex = groups.findIndex((group) => group.id === id);
    const existing = existingIndex < 0 ? null : groups[existingIndex]!;

    if (existing) {
      existing.entries.push(entry);

      if (existingIndex !== groups.length - 1) {
        groups.splice(existingIndex, 1);
        groups.push(existing);
      }

      continue;
    }

    groups.push({
      entries: [entry],
      id,
      runtime,
    });
  }

  return Object.freeze(
    groups.map((group) =>
      Object.freeze({
        entries: Object.freeze(group.entries),
        id: group.id,
        runtime: group.runtime,
      }),
    ),
  );
};

export const resolveNativePendingRouteProjection = (
  current: NavigationState | undefined,
  pending: NavigationState | null,
): NativePendingRouteProjection | null => {
  if (!pending || pending.revalidation !== null) return null;

  const path = pending.root.path;
  const currentPath = current?.root.path ?? [];
  const commonRouteCount = resolveCommonRouteCount(currentPath, path);

  if (commonRouteCount === currentPath.length && commonRouteCount === path.length) {
    return null;
  }

  return Object.freeze({
    changeDepth: commonRouteCount,
    path,
  });
};

export const resolveNativeRoutePresentationKey = (route: RouteDeclaration | null, depth: number): string => {
  if (route === null) return `native-route-index:${depth}`;

  const current = routePresentationKeys.get(route);

  if (current) return current;

  const key = `native-route:${++routePresentationSequence}`;

  routePresentationKeys.set(route, key);
  return key;
};

const resolveCommonRouteCount = (
  current: readonly NavigationRouteEntry[],
  pending: readonly NavigationRouteEntry[],
): number => {
  const length = Math.min(current.length, pending.length);

  for (let index = 0; index < length; index += 1) {
    const currentEntry = current[index]!;
    const pendingEntry = pending[index]!;

    if (
      currentEntry.route !== pendingEntry.route ||
      !areNavigationParamsEqual(currentEntry.params, pendingEntry.params)
    ) {
      return index;
    }
  }

  return length;
};

interface MutableNativeRouteHistoryGroup {
  readonly entries: ApplicationRouterHistoryEntry<ModuleMetadata>[];
  readonly id: string;
  readonly runtime: RouteActivationRuntime<ModuleMetadata> | null;
}

const routePresentationKeys = new WeakMap<RouteDeclaration, string>();
let routePresentationSequence = 0;
