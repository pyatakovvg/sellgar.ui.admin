import type { CurrencyEntity } from '@library/domain';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { useSubmit } from '@sellgar/app/react';
import { Button, Caption, Divider } from '@sellgar/kit';

import { StoreModifyControllerInterface } from '../../../../../../../classes/controller/store-modify/store-modify-controller.interface.ts';
import type { IFormData } from '../../../../form.schema.ts';
import s from './default.module.css';
import { Record } from './record';

interface IProps {
  index: number;
  currencies: CurrencyEntity[];
}

export const Records: React.FC<IProps> = (props) => {
  const submit = useSubmit(StoreModifyControllerInterface);
  const {
    control,
    formState: { errors },
  } = useFormContext<IFormData>();
  const records = useFieldArray({ control, name: `offers.${props.index}.records` });
  const error = errors.offers?.[props.index]?.records?.root?.message;

  return (
    <section className={s.wrapper}>
      <Divider type={'label-center'} label={'Учетные записи'} />
      {records.fields.map((record, index) => (
        <Record
          key={record.id}
          currencies={props.currencies}
          record={record}
          offerIndex={props.index}
          index={index}
          removable={!record.uuid && records.fields.length > 1}
          first={index === 0}
          last={index === records.fields.length - 1}
          onMoveUp={() => records.move(index, index - 1)}
          onMoveDown={() => records.move(index, index + 1)}
          onRemove={() => records.remove(index)}
        />
      ))}
      {error && <Caption state={'destructive'} caption={error} />}
      <Button
        type={'button'}
        size={'sm'}
        style={'secondary'}
        disabled={submit.inProcess}
        onClick={() =>
          records.append({
            article: '',
            currentPrice: { value: '', currencyCode: props.currencies[0]?.code ?? '' },
            clarifications: [],
          })
        }
      >
        Добавить учетную запись
      </Button>
    </section>
  );
};
