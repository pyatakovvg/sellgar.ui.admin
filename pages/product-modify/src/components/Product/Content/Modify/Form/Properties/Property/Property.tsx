import { PropertyEntity } from '@library/domain';
import { Icon, Input, Select, FieldWrapper, Caption } from '@sellgar/kit';

import React from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { CreateProductDto } from '../../../../../../../classes/store/form/dto/create-product.dto.ts';
import { UpdateProductDto } from '../../../../../../../classes/store/form/dto/update-product.dto.ts';
import { ProductPropertyDto } from '../../../../../../../classes/store/form/dto/product-property.dto.ts';

import { useGetPropertiesData } from '../../../../../../../hooks/get-properties-data.hook.ts';

import s from './default.module.scss';

interface IProps {
  index: number;
  field: Partial<ProductPropertyDto>;
  onDelete(): void;
}

const useGetProperty = (index: number) => {
  const { control } = useFormContext<UpdateProductDto | CreateProductDto>();

  const [property, setProperty] = React.useState<PropertyEntity | null>(null);
  const properties = useGetPropertiesData();
  const watch = useWatch({ name: `properties.${index}.propertyUuid`, control });

  React.useEffect(() => {
    const pr = properties.find((p) => p.uuid === watch);

    setProperty(pr ?? null);
  }, [watch]);

  return property;
};

export const Property: React.FC<IProps> = (props) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<UpdateProductDto | CreateProductDto>();

  const selectedProperty = useGetProperty(props.index);
  const properties = useGetPropertiesData();

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <div className={s.field}>
          <Controller
            name={`properties.${props.index}.propertyUuid`}
            control={control}
            render={({ field }) => {
              return (
                <FieldWrapper>
                  <FieldWrapper.Content>
                    <Select
                      // isClearable={true}
                      placeholder={'Свойство'}
                      optionKey={'uuid'}
                      optionValue={'name'}
                      value={field.value ?? null}
                      options={properties}
                      target={!!errors?.properties?.[props.index]?.propertyUuid?.message ? 'destructive' : undefined}
                      onChange={(value) => {
                        return field.onChange(value);
                      }}
                      onBlur={field.onBlur}
                    />
                  </FieldWrapper.Content>
                  {!!errors?.properties?.[props.index]?.propertyUuid?.message && (
                    <FieldWrapper.Caption>
                      <Caption
                        state={'destructive'}
                        caption={errors?.properties?.[props.index]?.propertyUuid?.message ?? ''}
                      />
                    </FieldWrapper.Caption>
                  )}
                </FieldWrapper>
              );
            }}
          />
        </div>
        <div className={s.field}>
          <FieldWrapper>
            <FieldWrapper.Content>
              <Input
                {...register(`properties.${props.index}.value`)}
                placeholder={'Значение'}
                badge={selectedProperty ? selectedProperty.unit?.name : undefined}
                target={!!errors?.properties?.[props.index]?.value?.message ? 'destructive' : undefined}
              />
            </FieldWrapper.Content>
            {!!errors?.properties?.[props.index]?.value?.message && (
              <FieldWrapper.Caption>
                <Caption state={'destructive'} caption={errors?.properties?.[props.index]?.value?.message ?? ''} />
              </FieldWrapper.Caption>
            )}
          </FieldWrapper>
        </div>
      </div>
      <div className={s.control}>
        <div className={s.delete} onClick={props.onDelete}>
          <Icon icon={'close-line'} />
        </div>
      </div>
    </div>
  );
};
