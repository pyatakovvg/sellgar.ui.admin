import { useProfile } from '@library/app';
import { DropDown, Icon, Link, Paragraph } from '@library/kit';

import React from 'react';

import s from './default.module.scss';

export const Person: React.FC = () => {
  const profile = useProfile();

  return (
    <div className={s.wrapper}>
      <div className={s.icon}>
        <Icon icon={'circle-user'} />
      </div>
      <div className={s.name}>
        <Paragraph>
          {profile.person.lastName} {profile.person.firstName.slice(0, 1).toUpperCase()}.{' '}
          {profile.person.middleName.slice(0, 1).toUpperCase()}.
        </Paragraph>
      </div>
    </div>
  );
};
