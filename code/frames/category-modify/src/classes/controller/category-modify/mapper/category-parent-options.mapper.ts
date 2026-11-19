import type { CategoryNodeEntity } from '@library/domain';

export class CategoryParentOptionsMapper {
  static map(nodes: CategoryNodeEntity[], excludedUuid?: string): CategoryNodeEntity[] {
    return nodes.flatMap((node) =>
      node.uuid === excludedUuid ? [] : [{ ...node, children: this.map(node.children, excludedUuid) }],
    );
  }
}
