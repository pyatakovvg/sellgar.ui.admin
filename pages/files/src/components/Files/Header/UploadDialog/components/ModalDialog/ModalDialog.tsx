import { Modal } from '@sellgar/kit';
import { useQuery } from '@library/app';
import { Upload } from '@library/design';

import React from 'react';
import { observer } from 'mobx-react';

import { useInProcess } from '../../../../../../hooks/in-process.hook.ts';
import { useUploadRequest } from '../../../../../../hooks/upload-request.hook';

import s from './default.module.scss';

interface IProps {
  isOpen: boolean;
  onClose(): void;
}

export const ModalDialog: React.FC<IProps> = observer((props) => {
  const [query] = useQuery<any>();

  const inProcess = useInProcess();
  const uploadRequest = useUploadRequest();

  const handleSubmit = async (files: File[]) => {
    const result = await uploadRequest({
      files,
      folderUuid: query.folderUuid,
    });

    if (result && result.length) {
      props.onClose();
    }
  };

  return (
    <Modal open={props.isOpen} onClose={props.onClose}>
      <div className={s.wrapper}>
        <Upload inProcess={inProcess} onDone={handleSubmit} />
      </div>
    </Modal>
  );
});
