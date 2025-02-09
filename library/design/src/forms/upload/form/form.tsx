import { Button, IconBox, Text, InputFiles } from '@library/kit';

import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

import { UploadImage } from './upload-image';

import s from './default.module.scss';

interface IForm {
  files: (File & { id: string })[];
}

interface IProps {
  inProcess: boolean;
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
      <div className={s.content}>
        <div className={s.files}>
          {!fields.length && (
            <div className={s.item}>
              <Text>Нет файлов для загрузки</Text>
            </div>
          )}
          {fields.map((file, index) => {
            const fileField = getValues(`files.${index}`) as File;
            return (
              <div key={file.id} className={s.item}>
                <UploadImage src={URL.createObjectURL(fileField)} onRemove={() => remove(index)} />
              </div>
            );
          })}
        </div>
        <div className={s.fields}>
          <InputFiles multiple={true} accept={'image/*'} onChange={(files) => append(files)}>
            <IconBox icon={'add'} />
          </InputFiles>
        </div>
      </div>
      <div className={s.control}>
        <Button type={'submit'} inProcess={props.inProcess}>
          Загрузить
        </Button>
      </div>
    </form>
  );
};
