import React from 'react';

import { ButtonContext } from '../ButtonContext';

interface IProps {
  accept?: string;
  disabled?: boolean;
}

type MultipleFiles = IProps & {
  multiple: true;
  onChange(files: File[]): void;
};

type SingleFile = IProps & {
  multiple?: false;
  onChange(file: File): void;
};

export const InputFiles: React.FC<SingleFile | MultipleFiles> = (props) => {
  const handleChooseFiles = () => {
    const input = document.createElement('input');

    input.type = 'file';
    props.accept && (input.accept = props.accept);
    props.multiple && (input.multiple = props.multiple);

    input.onchange = () => {
      if (input.files) {
        const files = Array.from(input.files);

        if (props.multiple) {
          props.onChange(files as File[]);
        } else if (input.files.length > 0) {
          props.onChange(files[0]);
        }
      }

      input.remove();
    };

    input.click();
  };

  return (
    <ButtonContext onClick={handleChooseFiles} disabled={props.disabled}>
      Выбрать файл
    </ButtonContext>
  );
};
