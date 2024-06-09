import React from 'react';

import { Icon } from '@/symbols/Icon';
import { Heading } from '@/typography/Heading';

import cn from 'classnames';
import s from './default.module.scss';

interface IFileError {
  file: File;
  error: string;
}

interface IProps {
  mimeType?: string[];
  onChange(files: File[]): void;
  onFail(errors: IFileError[]): void;
}

const checkMimeType = (file: File, types: string[]) => {
  return types.some((type) => type === file.type);
};

export const FileLoader: React.FC<IProps> = (props) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const [files, setFiles] = React.useState<FileList>();
  const [isFocused, setFocused] = React.useState(false);

  React.useEffect(() => {
    const { current } = wrapperRef;

    function highlight() {
      setFocused(true);
    }

    function unHighlight() {
      setFocused(false);
    }

    function preventDefaults(e: Event) {
      e.preventDefault();
      e.stopPropagation();
    }

    function handleDrop(e: DragEvent) {
      const resultFileList: File[] = [];
      const resultErrors: IFileError[] = [];
      const fileList = e.dataTransfer?.files;

      if (fileList) {
        const files = [...fileList];
        for (let index in files) {
          const file = files[index];

          if (props.mimeType) {
            const isSuccess = checkMimeType(file, props.mimeType);
            if (isSuccess) {
              resultFileList.push(file);
            } else {
              resultErrors.push({
                file,
                error: `Вы пытаетесь загрузить неверный тип файла "${file.type}"`,
              });
            }
          } else {
            resultFileList.push(file);
          }
        }

        props.onChange(resultFileList);
        if (resultErrors.length) {
          props.onFail(resultErrors);
        }
      }
    }

    if (current) {
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName: string) => {
        current.addEventListener(eventName, preventDefaults, false);
      });
      ['dragenter', 'dragover'].forEach((eventName: string) => {
        current.addEventListener(eventName, highlight, false);
      });
      ['dragleave', 'drop'].forEach((eventName: string) => {
        current.addEventListener(eventName, unHighlight, false);
      });
      current.addEventListener('drop', handleDrop, false);
    }
    return () => {
      if (current) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName: string) => {
          current.removeEventListener(eventName, preventDefaults, false);
        });
        ['dragenter', 'dragover'].forEach((eventName: string) => {
          current.removeEventListener(eventName, highlight, false);
        });
        ['dragleave', 'drop'].forEach((eventName: string) => {
          current.removeEventListener(eventName, unHighlight, false);
        });
        current.removeEventListener('drop', handleDrop, false);
      }
    };
  }, [wrapperRef]);

  const wrapperClassName = React.useMemo(
    () =>
      cn(s.wrapper, {
        [s.highlight]: isFocused,
      }),
    [isFocused],
  );

  return (
    <div ref={wrapperRef} className={wrapperClassName}>
      <div className={s.content}>
        <div className={s.icon}>
          <Icon icon={'cloud-arrow-up'} />
        </div>
        <div className={s.description}>
          <Heading variant={'h4'}>
            Перетащите файлы
            <br />
            для загрузки
          </Heading>
        </div>
      </div>
    </div>
  );
};
