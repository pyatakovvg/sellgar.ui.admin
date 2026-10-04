import type { CurrencyEntity, StoreProductEntity } from '@library/domain';
import { StoreInventoryRoute } from '@library/route-tokens';
import * as App from '@sellgar/app/react';
import {
  Badge,
  Button,
  Caption,
  Checkbox,
  Field,
  Input,
  InputAmount2,
  Label,
  Select,
  TabMenu,
  Typography,
} from '@sellgar/kit';
import { StockLineIcon } from '@sellgar/kit/icons';

import React from 'react';
import { Controller, type FieldArrayWithId, useFormContext } from 'react-hook-form';

import { type IFormData } from '../../../form.schema.ts';
import { type ProductOption } from '../product-option.ts';

import s from './default.module.scss';

interface IProps {
  currencies: CurrencyEntity[];
  product?: ProductOption;
  fields: FieldArrayWithId<IFormData, 'offers', 'id'>[];
  storeProduct?: StoreProductEntity;
}

export const OffersTabs: React.FC<IProps> = (props) => {
  const navigate = App.useNavigate();
  const {
    control,
    formState: { errors },
  } = useFormContext<IFormData>();
  const variants = React.useMemo(() => props.product?.variants ?? [], [props.product]);
  const firstVariantUuid = props.fields[0]?.variantUuid;
  const tabMenuKey = React.useMemo(() => props.fields.map((offer) => offer.variantUuid).join('|'), [props.fields]);
  const variantByUuid = React.useMemo(() => new Map(variants.map((variant) => [variant.uuid, variant])), [variants]);
  const storedOfferByUuid = React.useMemo(
    () => new Map((props.storeProduct?.offers ?? []).map((offer) => [offer.uuid, offer])),
    [props.storeProduct],
  );
  const storeProductUuid = props.storeProduct?.uuid;

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
                offerError?.article ||
                offerError?.currentPrice?.value ||
                offerError?.currentPrice?.currencyCode ||
                offerError?.showing
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
          const storedOffer = offer.uuid ? storedOfferByUuid.get(offer.uuid) : undefined;

          return (
            <TabMenu.Content key={offer.id} name={offer.variantUuid}>
              <div className={s.fields}>
                {storedOffer && storeProductUuid ? (
                  <div className={s.inventory}>
                    <div className={s.inventoryValues}>
                      <Typography size={'caption-m'}>
                        <span>Остаток: {storedOffer.inventory?.quantity ?? 0}</span>
                      </Typography>
                      <Typography size={'caption-m'}>
                        <span>Резерв: {storedOffer.inventory?.reserved ?? 0}</span>
                      </Typography>
                      <Typography size={'caption-m'}>
                        <span>Доступно: {storedOffer.inventory?.available ?? 0}</span>
                      </Typography>
                    </div>
                    <Button
                      type={'button'}
                      size={'sm'}
                      style={'secondary'}
                      leadIcon={<StockLineIcon />}
                      onClick={() =>
                        void navigate.to(StoreInventoryRoute, {
                          params: {
                            storeProductUuid,
                            offerUuid: storedOffer.uuid,
                          },
                        })
                      }
                    >
                      Управлять остатками
                    </Button>
                  </div>
                ) : null}
                <Controller
                  name={`offers.${index}.article`}
                  control={control}
                  render={({ field, fieldState: { error } }) => {
                    return (
                      <Field>
                        <Field.Label>
                          <Label label={'Артикул'} />
                        </Field.Label>
                        <Field.Content>
                          <Input
                            {...field}
                            target={error?.message ? 'destructive' : undefined}
                            value={field.value ?? ''}
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
                <Controller
                  name={`offers.${index}.currentPrice.value`}
                  control={control}
                  render={({ field, fieldState: { error } }) => {
                    return (
                      <Field>
                        <Field.Label>
                          <Label label={'Цена'} />
                        </Field.Label>
                        <Field.Content>
                          <InputAmount2
                            {...field}
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
                <Controller
                  name={`offers.${index}.currentPrice.currencyCode`}
                  control={control}
                  render={({ field, fieldState: { error } }) => {
                    return (
                      <Field>
                        <Field.Label>
                          <Label label={'Валюта'} />
                        </Field.Label>
                        <Field.Content>
                          <Select
                            {...field}
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
              </div>
            </TabMenu.Content>
          );
        })}
      </TabMenu>
    </div>
  );
};
