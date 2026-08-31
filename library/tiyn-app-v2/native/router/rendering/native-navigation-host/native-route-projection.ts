import type { ApplicationRouterRuntimeEntry } from '../../../../core/application/lifecycle/application';
import type { RouteActivationRuntime } from '../../../../core/router/runtime/route-runtime';
import type { RouterRuntimeBranchSnapshot } from '../../../../core/router/runtime/router-runtime';
import type { ModuleMetadata } from '../../../module/declaration/module';

export interface NativePendingRouteProjection {
  readonly commonRouteCount: number;
  readonly routes: readonly RouteActivationRuntime<ModuleMetadata>[];
}

export interface NativeRouteProjectionNode {
  readonly children: readonly NativeRouteProjectionNode[];
  readonly entryKeys: readonly string[];
  readonly runtime: RouteActivationRuntime<ModuleMetadata>;
  readonly terminalEntryKeys: readonly string[];
}

interface MutableNativeRouteProjectionNode {
  readonly children: MutableNativeRouteProjectionNode[];
  readonly entryKeys: string[];
  readonly runtime: RouteActivationRuntime<ModuleMetadata>;
  readonly terminalEntryKeys: string[];
}

export const createNativeRouteProjection = (
  entries: readonly ApplicationRouterRuntimeEntry<ModuleMetadata>[],
): readonly NativeRouteProjectionNode[] => {
  const roots: MutableNativeRouteProjectionNode[] = [];

  for (const entry of entries) {
    let siblings = roots;
    let node: MutableNativeRouteProjectionNode | null = null;

    for (const runtime of entry.tree.routes) {
      node = findOrCreateNode(siblings, runtime);
      node.entryKeys.push(entry.key);
      siblings = node.children;
    }

    node?.terminalEntryKeys.push(entry.key);
  }

  return Object.freeze(roots.map(freezeNode));
};

export const resolveNativePendingRouteProjection = (
  branch: RouterRuntimeBranchSnapshot<ModuleMetadata>,
): NativePendingRouteProjection | null => {
  if (!branch.pendingLocalChange) return null;

  return Object.freeze({
    commonRouteCount: branch.pendingLocalChange.commonRouteCount,
    routes: branch.routes,
  });
};

const findOrCreateNode = (
  siblings: MutableNativeRouteProjectionNode[],
  runtime: RouteActivationRuntime<ModuleMetadata>,
): MutableNativeRouteProjectionNode => {
  const current = siblings.find((node) => node.runtime === runtime);

  if (current) return current;

  const node: MutableNativeRouteProjectionNode = {
    children: [],
    entryKeys: [],
    runtime,
    terminalEntryKeys: [],
  };

  siblings.push(node);
  return node;
};

const freezeNode = (node: MutableNativeRouteProjectionNode): NativeRouteProjectionNode => {
  return Object.freeze({
    children: Object.freeze(node.children.map(freezeNode)),
    entryKeys: Object.freeze([...node.entryKeys]),
    runtime: node.runtime,
    terminalEntryKeys: Object.freeze([...node.terminalEntryKeys]),
  });
};
