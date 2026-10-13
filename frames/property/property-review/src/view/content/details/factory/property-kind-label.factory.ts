import { PropertyKind } from '@library/domain';

export class PropertyKindLabelFactory {
  static create(kind: PropertyKind): string {
    const labels: Record<PropertyKind, string> = {
      TEXT: 'Текст',
      INTEGER: 'Целое число',
      DECIMAL: 'Десятичное число',
      BOOLEAN: 'Да/нет',
      DATE: 'Дата',
      OPTIONS: 'Список',
    };
    return labels[kind];
  }
}
