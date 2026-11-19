import { plainToInstance } from 'class-transformer';
import { CategoryNodeEntity } from '@library/domain';
import { describe, expect, it } from 'vitest';

import { CategoryParentOptionsMapper } from './category-parent-options.mapper.ts';

const tree = () =>
  plainToInstance(CategoryNodeEntity, [
    {
      uuid: 'home',
      name: 'Дом',
      children: [
        { uuid: 'home-cups', name: 'Кружки', children: [{ uuid: 'leaf', name: 'Термокружки', children: [] }] },
      ],
    },
    { uuid: 'tourism', name: 'Туризм', children: [{ uuid: 'tourism-cups', name: 'Кружки', children: [] }] },
  ]);

describe('CategoryParentOptionsMapper', () => {
  it('keeps separate branches with identical category names', () => {
    const options = CategoryParentOptionsMapper.map(tree());
    expect(options[0].children[0]).toMatchObject({ uuid: 'home-cups', name: 'Кружки' });
    expect(options[1].children[0]).toMatchObject({ uuid: 'tourism-cups', name: 'Кружки' });
    expect(options[0].children[0].children[0].uuid).toBe('leaf');
  });
  it('excludes the edited category and its entire subtree without mutating the source', () => {
    const source = tree();
    const options = CategoryParentOptionsMapper.map(source, 'home-cups');
    expect(options[0].children).toEqual([]);
    expect(options[1].children[0].uuid).toBe('tourism-cups');
    expect(source[0].children[0].uuid).toBe('home-cups');
  });
});
