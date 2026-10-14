import type { CurrencyEntity } from '@library/domain';
import { Badge, Caption, Checkbox, Field, InputAmount2, Label, Select, TabMenu, Typography } from '@sellgar/kit';

import React from 'react';
import { Controller, type FieldArrayWithId, useFormContext } from 'react-hook-form';

import { type IFormData } from '../../../form.schema.ts';
import { type ProductOption } from '../product-option.ts';

import { Records } from './records';

import s from './default.module.scss';

interface IProps {
  currencies: CurrencyEntity[];
  product?: ProductOption;
  fields: FieldArrayWithId<IFormData, 'offers', 'id'>[];
}

export const OffersTabs: React.FC<IProps> = (props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IFormData>();
  const variants = React.useMemo(() => props.product?.variants ?? [], [props.product]);
  const firstVariantUuid = props.fields[0]?.variantUuid;
  const tabMenuKey = React.useMemo(() => props.fields.map((offer) => offer.variantUuid).join('|'), [props.fields]);
  const variantByUuid = React.useMemo(() => new Map(variants.map((variant) => [variant.uuid, variant])), [variants]);

  if (!props.product && props.fields.length === 0) {
    return null;
  }

  if (props.product && variants.length === 0 && props.fields.length === 0) {
    return (
      <div className={s.empty}>
        <Typography size={'caption-l'} weight={'regular'}>
          <p>У товара нет вариантов.</p>
        </Typography>
      </div>
    );
  }

  return (
    <div className={s.wrapper}>
      <TabMenu key={tabMenuKey} defaultTabName={firstVariantUuid}>
        <div className={s.tabs}>
          <TabMenu.Line size={'sm'}>
            {props.fields.map((offer, index) => {
              const variant = variantByUuid.get(offer.variantUuid);
              const offerError = errors.offers?.[index];
              const hasErrors = !!(
                offerError?.currentPrice?.value ||
                offerError?.currentPrice?.currencyCode ||
                offerError?.showing ||
                offerError?.records
              );

              return (
                <TabMenu.Tab
                  key={offer.id}
                  name={offer.variantUuid}
                  title={variant?.name ?? `Вариант ${index + 1}`}
                  badge={hasErrors ? <Badge color={'red'} size={'xs'} shape={'pill'} label={'!'} /> : undefined}
                />
              );
            })}
          </TabMenu.Line>
        </div>
        {props.fields.map((offer, index) => {
          return (
            <TabMenu.Content key={offer.id} name={offer.variantUuid}>
              <div className={s.fields}>
                <Field>
                  <Field.Label>
                    <Label label={'Цена'} />
                  </Field.Label>
                  <Field.Content>
                    <div className={s.price}>
                      <div className={s['price-field']}>
                        <Controller
                          name={`offers.${index}.currentPrice.value`}
                          control={control}
                          render={({ field, fieldState: { error } }) => {
                            return (
                              <Field>
                                <Field.Content>
                                  <InputAmount2
                                    {...field}
                                    aria-label={'Сумма'}
                                    target={error?.message ? 'destructive' : undefined}
                                    value={field.value ? Number(field.value) : undefined}
                                  />
                                </Field.Content>
                                {!!error?.message && (
                                  <Field.Caption>
                                    <Caption state={'destructive'} caption={error.message} />
                                  </Field.Caption>
                                )}
                              </Field>
                            );
                          }}
                        />
                      </div>
                      <div className={s['price-field']}>
                        <Controller
                          name={`offers.${index}.currentPrice.currencyCode`}
                          control={control}
                          render={({ field, fieldState: { error } }) => {
                            return (
                              <Field>
                                <Field.Content>
                                  <Select
                                    {...field}
                                    aria-label={'Валюта'}
                                    options={props.currencies}
                                    optionKey={'code'}
                                    optionValue={'code'}
                                    onBlur={field.onBlur}
                                    onChange={(value) => field.onChange(value ?? '')}
                                  />
                                </Field.Content>
                                {!!error?.message && (
                                  <Field.Caption>
                                    <Caption state={'destructive'} caption={error.message} />
                                  </Field.Caption>
                                )}
                              </Field>
                            );
                          }}
                        />
                      </div>
                    </div>
                  </Field.Content>
                </Field>
                <Controller
                  name={`offers.${index}.showing`}
                  control={control}
                  render={({ field, fieldState: { error } }) => {
                    return (
                      <Field>
                        <Field.Content>
                          <Checkbox
                            checked={!!field.value}
                            label={'Доступен для офера на витрине'}
                            onBlur={field.onBlur}
                            onChange={(event) => field.onChange(event.currentTarget.checked)}
                          />
                        </Field.Content>
                        {!!error?.message && (
                          <Field.Caption>
                            <Caption state={'destructive'} caption={error.message} />
                          </Field.Caption>
                        )}
                      </Field>
                    );
                  }}
                />
                <Records index={index} />
              </div>
            </TabMenu.Content>
          );
        })}
      </TabMenu>
    </div>
  );
};
