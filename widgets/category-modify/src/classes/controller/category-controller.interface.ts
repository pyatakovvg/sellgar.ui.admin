import { CategoryEntity, CreateCategoryDto, UpdateCategoryDto } from '@library/domain';
import { type WidgetControllerInterface, type WidgetControllerLoaderArgs } from '@tiyn/app';
import { FormStoreInterface } from '../store/form/form-store.interface.ts';
import { type CategoryModifyWidgetProps } from '../../widget.context.tsx';

export abstract class CategoryControllerInterface implements WidgetControllerInterface<CategoryModifyWidgetProps> {
  abstract readonly formStore: FormStoreInterface;

  abstract loader(args: WidgetControllerLoaderArgs<CategoryModifyWidgetProps>): Promise<CategoryEntity>;
  abstract findByUuid(uuid?: string): Promise<CategoryEntity>;

  abstract create(data: CreateCategoryDto): Promise<CategoryEntity>;
  abstract update(uuid: string, data: UpdateCategoryDto): Promise<CategoryEntity>;
}
