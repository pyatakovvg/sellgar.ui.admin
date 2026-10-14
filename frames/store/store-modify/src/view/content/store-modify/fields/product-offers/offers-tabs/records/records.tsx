import { Button, Caption, Divider } from '@sellgar/kit';
import { useSubmit } from '@sellgar/app/react';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import type { IFormData } from '../../../../form.schema.ts';
import { StoreModifyControllerInterface } from '../../../../../../../classes/controller/store-modify/store-modify-controller.interface.ts';
import { Record } from './record';

import s from './default.module.scss';

interface IProps {
  index: number;
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
          record={record}
          offerIndex={props.index}
          index={index}
          removable={!record.uuid && records.fields.length > 1}
          onRemove={() => records.remove(index)}
        />
      ))}
      {error && <Caption state={'destructive'} caption={error} />}
      <Button
        type={'button'}
        size={'sm'}
        style={'secondary'}
        disabled={submit.inProcess}
        onClick={() => records.append({ article: '', clarifications: [] })}
      >
        Добавить учетную запись
      </Button>
    </section>
  );
};
