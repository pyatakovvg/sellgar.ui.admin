import { Button, Image, InputFiles } from '@library/kit';

import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

import s from './default.module.scss';

interface IForm {
  files: (File & { id: string })[];
}

interface IProps {
  onSubmit(data: IForm): void;
}

export const Form: React.FC<IProps> = (props) => {
  const { control, getValues, handleSubmit } = useForm<IForm>({
    defaultValues: {
      files: [],
    },
  });

  // @ts-ignore
  const { fields, append, remove } = useFieldArray({ control, name: 'files' });

  const onSubmit = handleSubmit(props.onSubmit);

  return (
    <form className={s.wrapper} onSubmit={onSubmit}>
      <div>
        {fields.map((file, index) => {
          const fileField = getValues(`files.${index}`) as File;

          return (
            <div key={file.id} onClick={() => remove(index)}>
              <Image src={URL.createObjectURL(fileField)} />
              <p>{fileField.name}</p>
            </div>
          );
        })}
      </div>
      <div className={s.fields}>
        <InputFiles multiple={true} accept={'image/*'} onChange={(files) => append(files)} />
      </div>
      <div className={s.control}>
        <Button type={'submit'}>Загрузить</Button>
      </div>
    </form>
  );
};
