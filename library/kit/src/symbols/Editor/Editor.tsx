import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import s from './default.module.scss';

interface IProps {
  value: string;
}

export const Editor: React.FC<IProps> = (props) => {
  const editor = useEditor(
    {
      extensions: [StarterKit],
      content: props.value,
    },
    [props.value],
  );

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <EditorContent className={s.editor} editor={editor} />
      </div>
    </div>
  );
};
