import { Logo, Text } from '@library/kit';
import { Trans, useTranslation } from '@library/lng';

import React from 'react';

import s from './default.module.scss';

import ru from './langs/ru.json';
import en from './langs/en.json';
import kz from './langs/kz.json';

export const Logotype: React.FC = () => {
  const { t } = useTranslation('design-logotype', {
    ru,
    en,
    kz,
  });

  return (
    <div className={s.wrapper}>
      <div className={s.logo}>
        <Logo />
      </div>
      <div className={s.text}>
        <Text>
          <Trans t={t}>title</Trans>
        </Text>
      </div>
    </div>
  );
};
