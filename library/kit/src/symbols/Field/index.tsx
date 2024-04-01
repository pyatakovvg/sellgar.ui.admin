import React from 'react';

import { Label } from '@/typography/Label';

import styles from './default.module.scss';

export interface IField {
  className?: string;
  required?: boolean;
  label?: string;
  message?: any;
  children: React.ReactNode;
}

export const Field: React.FC<IField> = (props) => {
  return (
    <div className={styles.wrapper}>
      {props.label && (
        <div className={styles.label}>
          <Label required={props.required}>{props.label}</Label>
        </div>
      )}
      <div className={styles.content}>{props.children}</div>
      <div className={styles.message}>
        <p className={styles.text}>{props.message}</p>
      </div>
    </div>
  );
};
