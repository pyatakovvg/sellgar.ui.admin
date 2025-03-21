import { PropertyEntity } from '@library/domain';
import { Field } from '@library/kit';
import { Icon, Input, Select, Typography } from '@sellgar/kit';

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
            //@ts-ignore
            name={`properties.${props.index}.propertyUuid`}
            control={control}
            render={({ field }) => {
              return (
                <Field error={errors?.properties?.[props.index]?.propertyUuid?.message ?? ''}>
                  <Select
                    // isClearable={true}
                    placeholder={'Свойство'}
                    optionKey={'uuid'}
                    optionValue={'name'}
                    value={field.value ?? null}
                    options={properties}
                    onChange={(value) => {
                      return field.onChange(value);
                    }}
                    onBlur={field.onBlur}
                  />
                </Field>
              );
            }}
          />
        </div>
        <div className={s.field}>
          <Field error={errors?.properties?.[props.index]?.value?.message ?? ''}>
            <Input
              {...register(`properties.${props.index}.value`)}
              placeholder={'Значение'}
              badge={selectedProperty ? selectedProperty.unit?.name : undefined}
            />
          </Field>
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
