import { Form } from '@library/design';
import { Input, Textarea, Field, Label, Caption, Select } from '@sellgar/kit';

import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';

import { useUnits } from '../../../hooks/units.hook.ts';
import { useGroups } from '../../../hooks/groups.hook.ts';

import { IFormData } from '../schema.ts';

import s from './default.module.scss';

const types = [
  { code: 'TEXT', name: 'Текст' },
  { code: 'CHECKBOX', name: 'Чекбокс' },
  { code: 'RADIO', name: 'Радио кнопка' },
  { code: 'DATE', name: 'Дата' },
  { code: 'RANGE', name: 'Диапазон' },
];

export const Content: React.FC = () => {
  const {
    register,
    control,
    formState: { isSubmitting, errors },
  } = useFormContext<IFormData>();

  const units = useUnits();
  const groups = useGroups();

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <Form.Fields>
          <Form.Fields.Field>
            <Controller
              control={control}
              name={'groupUuid'}
              render={({ field, fieldState: { error } }) => {
                return (
                  <Field>
                    <Field.Label>
                      <Label label={'Группа'} />
                    </Field.Label>
                    <Field.Content>
                      <Select
                        optionKey={'uuid'}
                        optionValue={'name'}
                        options={groups}
                        value={field.value}
                        disabled={isSubmitting}
                        onBlur={field.onBlur}
                        onChange={field.onChange}
                      />
                    </Field.Content>
                    {error?.message && (
                      <Field.Caption>
                        <Caption state={'destructive'} caption={error.message} />
                      </Field.Caption>
                    )}
                  </Field>
                );
              }}
            />
          </Form.Fields.Field>
        </Form.Fields>
        <Form.Fields>
          <Form.Fields.Field>
            <Field>
              <Field.Label>
                <Label label={'Код'} />
              </Field.Label>
              <Field.Content>
                <Input
                  {...register('code')}
                  autoFocus={true}
                  target={errors.code?.message ? 'destructive' : undefined}
                  size={'md'}
                  placeholder={'Код'}
                  disabled={isSubmitting}
                />
              </Field.Content>
              {errors.code?.message && (
                <Field.Caption>
                  <Caption state={'destructive'} caption={errors.code.message} />
                </Field.Caption>
              )}
            </Field>
          </Form.Fields.Field>
        </Form.Fields>
        <Form.Fields>
          <Form.Fields.Field>
            <Field>
              <Field.Label>
                <Label label={'Наименование'} />
              </Field.Label>
              <Field.Content>
                <Input
                  {...register('name')}
                  target={errors.name?.message ? 'destructive' : undefined}
                  size={'md'}
                  placeholder={'Наименование'}
                  disabled={isSubmitting}
                />
              </Field.Content>
              {errors.name?.message && (
                <Field.Caption>
                  <Caption state={'destructive'} caption={errors.name.message} />
                </Field.Caption>
              )}
            </Field>
          </Form.Fields.Field>
        </Form.Fields>
        <Form.Fields>
          <Form.Fields.Field>
            <Field>
              <Field.Label>
                <Label label={'Описание'} />
              </Field.Label>
              <Field.Content>
                <Textarea
                  {...register('description')}
                  target={errors.description?.message ? 'destructive' : undefined}
                  size={'md'}
                  placeholder={'Описание'}
                  disabled={isSubmitting}
                />
              </Field.Content>
              {errors.description?.message && (
                <Field.Caption>
                  <Caption state={'destructive'} caption={errors.description.message} />
                </Field.Caption>
              )}
            </Field>
          </Form.Fields.Field>
        </Form.Fields>
        <Form.Fields>
          <Form.Fields.Field>
            <Controller
              name={'type'}
              control={control}
              render={({ field }) => {
                return (
                  <Field>
                    <Field.Label>
                      <Label label={'Тип'} />
                    </Field.Label>
                    <Field.Content>
                      <Select
                        optionKey={'code'}
                        optionValue={'name'}
                        options={types}
                        value={field.value}
                        onBlur={field.onBlur}
                        onChange={field.onChange}
                      />
                    </Field.Content>
                    {errors.type?.message && (
                      <Field.Caption>
                        <Caption state={'destructive'} caption={errors.type.message} />
                      </Field.Caption>
                    )}
                  </Field>
                );
              }}
            />
          </Form.Fields.Field>
        </Form.Fields>
        <Form.Fields>
          <Form.Fields.Field>
            <Controller
              name={'unitUuid'}
              control={control}
              render={({ field, fieldState: { error } }) => {
                return (
                  <Field>
                    <Field.Label>
                      <Label label={'Размерность'} />
                    </Field.Label>
                    <Field.Content>
                      <Select
                        isClearable={true}
                        optionKey={'uuid'}
                        optionValue={'name'}
                        options={units}
                        value={field.value}
                        onBlur={field.onBlur}
                        onChange={field.onChange}
                      />
                    </Field.Content>
                    {error?.message && (
                      <Field.Caption>
                        <Caption state={'destructive'} caption={error.message} />
                      </Field.Caption>
                    )}
                  </Field>
                );
              }}
            />
          </Form.Fields.Field>
        </Form.Fields>
      </div>
    </div>
  );
};
