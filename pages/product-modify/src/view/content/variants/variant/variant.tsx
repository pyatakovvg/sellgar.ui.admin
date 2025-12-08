import { Field, Label, Caption, Input, Icon, Textarea, Button } from '@sellgar/kit';

import React from 'react';
import * as ReactHookForm from 'react-hook-form';

import { Gallery } from './gallery';
import { Properties } from './properties';

import s from './variant.module.scss';

interface IProps {
  index: number;
  onCopy(): void;
  onDelete(): void;
}

export const Variant: React.FC<IProps> = (props) => {
  const { control } = ReactHookForm.useFormContext();

  return (
    <div className={s.wrapper}>
      <div className={s.controls}>
        <div className={s.button}>
          <Button
            form={'icon'}
            size={'sm'}
            style={'ghost'}
            leadIcon={<Icon icon={Icon.fileCopyLine} />}
            onClick={() => props.onCopy()}
          />
        </div>
        <div className={s.button}>
          <Button
            form={'icon'}
            size={'sm'}
            style={'ghost'}
            target={'destructive'}
            leadIcon={<Icon icon={Icon.deleteBin5Line} />}
            onClick={() => props.onDelete()}
          />
        </div>
      </div>
      <div className={s.line}>
        <div className={s.field}>
          <Field>
            <Field.Label>
              <Label label={'Изображение'} />
            </Field.Label>
            <Field.Content>
              <Gallery index={props.index} />
            </Field.Content>
          </Field>
        </div>
      </div>
      <div className={s.content}>
        <div className={s.line}>
          <div className={s.field} style={{ flex: '0 0 auto', width: 220 }}>
            <ReactHookForm.Controller
              control={control}
              name={`variants.${props.index}.article`}
              render={({ field, fieldState: { error } }) => (
                <Field>
                  <Field.Label>
                    <Label label={'Артикул'} />
                  </Field.Label>
                  <Field.Content>
                    <Input
                      {...field}
                      leadIcon={<Icon icon={Icon.bookmarkLine} />}
                      target={error?.message ? 'destructive' : undefined}
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
          <div className={s.field}>
            <ReactHookForm.Controller
              control={control}
              name={`variants.${props.index}.name`}
              render={({ field, fieldState: { error } }) => (
                <Field>
                  <Field.Label>
                    <Label label={'Наименование'} />
                  </Field.Label>
                  <Field.Content>
                    <Input {...field} target={error?.message ? 'destructive' : undefined} />
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
        </div>
        <div className={s.line}>
          <div className={s.field}>
            <ReactHookForm.Controller
              control={control}
              name={`variants.${props.index}.description`}
              render={({ field, fieldState: { error } }) => (
                <Field>
                  <Field.Label>
                    <Label label={'Описание'} />
                  </Field.Label>
                  <Field.Content>
                    <Textarea {...field} target={error?.message ? 'destructive' : undefined} />
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
        </div>
        <div className={s.line}>
          <div className={s.field}>
            <Properties index={props.index} />
          </div>
        </div>
      </div>
    </div>
  );
};
