import type { ControllerArgs, WithPayload } from '@sellgar/app';

import type { CategoryPageEntity } from './domain/category-page.entity.ts';

export abstract class CategoryControllerInterface {
  abstract loader(): Promise<CategoryPageEntity>;
  abstract action(args: ControllerArgs<WithPayload<{ shopUuid: string }>>): Promise<void>;
}
