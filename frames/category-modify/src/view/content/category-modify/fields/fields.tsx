import { Form } from '@library/design';
import { useLoaderData } from '@sellgar/app/react';
import { Caption, Field, Input, Label, NewSelect, Textarea } from '@sellgar/kit';

import React from 'react';
import * as ReactHookForm from 'react-hook-form';

import { CategoryModifyControllerInterface } from '../../../../classes/controller/category-modify/category-modify-controller.interface.ts';
import type { IFormData } from '../form.schema.ts';

import s from './default.module.scss';

export const Fields: React.FC = () => {
  const { parents } = useLoaderData(CategoryModifyControllerInterface);
  const methods = ReactHookForm.useFormContext<IFormData>();

  return (
    <div className={s.wrapper}>
      <Form.Fields>
        <Form.Fields.Field>
          <ReactHookForm.Controller
            name={'name'}
            control={methods.control}
            render={({ field, fieldState: { error } }) => (
              <Field>
                <Field.Label>
                  <Label label={'Название'} />
                </Field.Label>
                <Field.Content>
                  <Input
                    {...field}
                    autoFocus={true}
                    target={error ? 'destructive' : undefined}
                    size={'md'}
                    placeholder={'Название категории'}
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
        </Form.Fields.Field>
      </Form.Fields>
      <Form.Fields>
        <Form.Fields.Field>
          <ReactHookForm.Controller
            name={'parentUuid'}
            control={methods.control}
            render={({ field }) => (
              <Field>
                <Field.Label>
                  <Label label={'Родительская категория'} />
                </Field.Label>
                <Field.Content>
                  <NewSelect.Tree
                    options={parents}
                    resolveKey={(category) => category.uuid}
                    resolveValue={(category) => category.name}
                    resolveChildren={(category) => category.children}
                    selectBranches={true}
                    defaultExpanded={false}
                    value={field.value ?? undefined}
                    disabled={field.disabled}
                    clearable={true}
                    placeholder={'Корневая категория'}
                    onChange={(uuid) => field.onChange(uuid ?? null)}
                    onBlur={field.onBlur}
                  />
                </Field.Content>
                <Field.Caption>
                  <Caption caption={'Оставьте пустым, чтобы разместить категорию в корне дерева.'} />
                </Field.Caption>
              </Field>
            )}
          />
        </Form.Fields.Field>
      </Form.Fields>
      <Form.Fields>
        <Form.Fields.Field>
          <ReactHookForm.Controller
            name={'description'}
            control={methods.control}
            render={({ field }) => (
              <Field>
                <Field.Label>
                  <Label label={'Описание'} />
                </Field.Label>
                <Field.Content>
                  <Textarea {...field} size={'md'} placeholder={'Необязательное описание категории'} />
                </Field.Content>
              </Field>
            )}
          />
        </Form.Fields.Field>
      </Form.Fields>
    </div>
  );
};
