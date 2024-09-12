import { useProfile } from '@library/app';
import { Icon, Paragraph } from '@library/kit';

import React from 'react';
import { observer } from 'mobx-react';

import s from './default.module.scss';

export const Person: React.FC = observer(() => {
  const profile = useProfile();
  console.log(profile);
  return (
    <div className={s.wrapper}>
      <div className={s.icon}>
        <Icon icon={'circle-user'} />
      </div>
      <div className={s.name}>
        <Paragraph>
          {profile.user.surname} {profile.user.name.slice(0, 1).toUpperCase()}.{' '}
          {profile.user?.patronymic?.slice(0, 1).toUpperCase() ?? ''}.
        </Paragraph>
      </div>
    </div>
  );
});
