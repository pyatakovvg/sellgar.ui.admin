import { InfoLine } from '@library/design';
import { StoreInventoryRoute } from '@library/route-tokens';
import { useLoaderData, useNavigate, useSubmit } from '@sellgar/app/react';
import { Button, Caption, Field, Input, Label, Textarea, Typography } from '@sellgar/kit';
import { DeleteBin2LineIcon, StockLineIcon } from '@sellgar/kit/icons';
import React from 'react';
import { Controller, type FieldArrayWithId, useFieldArray, useFormContext } from 'react-hook-form';

import { StoreModifyControllerInterface } from '../../../../../../../../classes/controller/store-modify/store-modify-controller.interface.ts';
import type { IFormData } from '../../../../../form.schema.ts';

import s from './default.module.scss';

interface IProps {
  record: FieldArrayWithId<IFormData, `offers.${number}.records`, 'id'>;
  offerIndex: number;
  index: number;
  removable: boolean;
  onRemove: () => void;
}

export const Record: React.FC<IProps> = (props) => {
  const data = useLoaderData(StoreModifyControllerInterface);
  const navigate = useNavigate();
  const submit = useSubmit(StoreModifyControllerInterface);
  const { control } = useFormContext<IFormData>();
  const path = `offers.${props.offerIndex}.records.${props.index}` as const;
  const clarifications = useFieldArray({ control, name: `${path}.clarifications` });
  const storedRecord = data?.offers
    .flatMap((offer) => offer.records)
    .find((record) => record.uuid === props.record.uuid);

  return (
    <section className={s.wrapper}>
      <div className={s.header}>
        <Typography size={'caption-l'} weight={'semi-bold'}>
          <span>Учетная запись {props.index + 1}</span>
        </Typography>
        {props.removable && (
          <Button
            type={'button'}
            size={'sm'}
            style={'ghost'}
            disabled={submit.inProcess}
            leadIcon={<DeleteBin2LineIcon />}
            onClick={props.onRemove}
          >
            Удалить
          </Button>
        )}
      </div>
      <Controller
        control={control}
        name={`${path}.article`}
        render={({ field, fieldState: { error } }) => (
          <Field>
            <Field.Label>
              <Label label={'Артикул'} />
            </Field.Label>
            <Field.Content>
              <Input
                {...field}
                size={'md'}
                placeholder={props.record.uuid ? 'Артикул' : 'Будет сформирован автоматически'}
                target={error ? 'destructive' : undefined}
              />
            </Field.Content>
            {error?.message && (
              <Field.Caption>
                <Caption state={'destructive'} caption={error.message} />
              </Field.Caption>
            )}
          </Field>
        )}
      />
      <div className={s.clarifications}>
        {clarifications.fields.map((clarification, index) => (
          <div className={s.clarification} key={clarification.id}>
            <div className={s.field}>
              <Controller
                control={control}
                name={`${path}.clarifications.${index}.value`}
                render={({ field, fieldState: { error } }) => (
                  <Field>
                    <Field.Label>
                      <Label label={`Уточнение ${index + 1}`} />
                    </Field.Label>
                    <Field.Content>
                      <Textarea
                        {...field}
                        size={'md'}
                        placeholder={'Например, S евростандарт'}
                        target={error ? 'destructive' : undefined}
                      />
                    </Field.Content>
                    {error?.message && (
                      <Field.Caption>
                        <Caption state={'destructive'} caption={error.message} />
                      </Field.Caption>
                    )}
                  </Field>
                )}
              />
            </div>
            <Button
              type={'button'}
              size={'sm'}
              style={'ghost'}
              aria-label={`Удалить уточнение ${index + 1}`}
              disabled={submit.inProcess}
              leadIcon={<DeleteBin2LineIcon />}
              onClick={() => clarifications.remove(index)}
            />
          </div>
        ))}
        <Button
          type={'button'}
          size={'sm'}
          style={'ghost'}
          disabled={submit.inProcess}
          onClick={() => clarifications.append({ value: '' })}
        >
          Добавить уточнение
        </Button>
      </div>
      {!storedRecord && <Caption caption={'Для управления остатками сначала сохраните запись.'} />}
      {storedRecord && data && (
        <div className={s.inventory}>
          {[
            { label: 'Остаток', value: storedRecord.inventory.quantity },
            { label: 'Резерв', value: storedRecord.inventory.reserved },
            { label: 'Доступно', value: storedRecord.inventory.available },
          ].map((line) => (
            <InfoLine key={line.label} label={line.label} value={String(line.value)} />
          ))}
          <Button
            type={'button'}
            size={'sm'}
            style={'secondary'}
            disabled={submit.inProcess}
            leadIcon={<StockLineIcon />}
            onClick={() =>
              void navigate.to(StoreInventoryRoute, {
                params: { storeProductUuid: data.uuid, recordUuid: storedRecord.uuid },
              })
            }
          >
            Управлять остатками
          </Button>
        </div>
      )}
    </section>
  );
};
